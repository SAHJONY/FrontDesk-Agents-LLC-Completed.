// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Public routes must NEVER redirect to login.
 * Keep this list conservative and explicit.
 */
const PUBLIC_PREFIXES = [
  "/",
  "/pricing",
  "/demo",
  "/support",
  "/features",
  "/industries",
  "/solutions",
  "/legal",
  "/privacy",
  "/terms",
  "/login",
  "/signup",
  "/forgot-password",
  "/_not-found",
];

/**
 * Treat Next internals and common static files as public.
 */
function isStaticOrInternal(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/static") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".map") ||
    pathname.endsWith(".txt")
  );
}

function isPublic(pathname: string) {
  if (isStaticOrInternal(pathname)) return true;

  // Do not gate APIs during debugging (prevents auth loops and broken requests)
  if (pathname.startsWith("/api")) return true;

  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const debug = process.env.AUTH_DEBUG === "1";
  const { pathname } = req.nextUrl;

  const cookieHeader = req.headers.get("cookie") || "";
  const hasLikelyAuthCookie =
    cookieHeader.includes("sb-") ||
    cookieHeader.includes("supabase") ||
    cookieHeader.includes("access_token") ||
    cookieHeader.includes("refresh_token") ||
    cookieHeader.includes("fd_session") ||
    cookieHeader.includes("token=");

  const pub = isPublic(pathname);

  if (debug) {
    console.log(
      `[AUTH_DEBUG][MW] path=${pathname} public=${pub} hasAuthCookie=${hasLikelyAuthCookie} cookieLen=${cookieHeader.length}`
    );
  }

  // ✅ Never block public routes (prevents login loops)
  if (pub) return NextResponse.next();

  // ✅ TEMP: allow all non-public while we debug auth/session stability.
  // Next step (after we confirm cookies/session): protect only /dashboard and /settings.
  return NextResponse.next();
}

/**
 * Match all routes but avoid obvious static files to reduce overhead.
 * (Still safe even if it matches broadly because we early-return for public/static.)
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
