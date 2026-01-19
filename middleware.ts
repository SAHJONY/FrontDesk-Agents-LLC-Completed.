import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  if (pathname.startsWith("/api")) return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookies = req.cookies;
  
  // 1. Detect Impersonation
  const impersonatedId = cookies.get('impersonated_owner_id')?.value;
  const isPublicRoute = isPublic(pathname);

  // 2. Handle Impersonation Logic
  if (impersonatedId && !isPublicRoute) {
    // We clone the headers so we can inject the impersonated ID
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-impersonated-user-id', impersonatedId);

    // If they are on a protected route while impersonating, 
    // we let them through but with the injected headers.
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 3. Existing Auth Logging (Optional)
  const debug = process.env.AUTH_DEBUG === "1";
  if (debug) {
    const hasLikelyAuthCookie = cookies.getAll().length > 0;
    console.log(`[AUTH_DEBUG][MW] path=${pathname} public=${isPublicRoute} impersonating=${!!impersonatedId}`);
  }

  // ✅ Never block public routes
  if (isPublicRoute) return NextResponse.next();

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
