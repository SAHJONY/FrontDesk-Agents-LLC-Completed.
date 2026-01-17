// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes must NEVER redirect to login
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

function isPublic(pathname: string) {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname.startsWith("/images")) return true;
  if (pathname.startsWith("/api")) return true; // do not gate APIs in v1
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

  // ✅ TEMP: allow all non-public to avoid loop while we debug
  // Later: protect only /dashboard and /settings with real session validation.
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
