import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Routes that do not require authentication.
 * Static-path check is faster than regex in the Edge runtime.
 */
const PUBLIC_PREFIXES = [
  "/", "/pricing", "/demo", "/support", "/features", "/industries",
  "/solutions", "/legal", "/privacy", "/terms", "/login", "/signup",
  "/forgot-password", "/marketing", "/ai-agents", "/setup"
];

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 1. Shareable Link Detection (The "Emerald" Bypass)
  // Check this first to allow immediate access.
  const shareToken = searchParams.get("token");
  if (shareToken === "emerald_public_access") {
    return NextResponse.next();
  }

  // 2. Public Page & API Handling
  // We allow /api routes to pass through so they can return proper JSON 
  // errors instead of a middleware redirect crash.
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  
  if (isPublic || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 3. Multi-Provider Auth Detection
  // Optimization: Only check cookies if we are actually heading to a protected route.
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/owner");

  if (isProtectedRoute) {
    const allCookies = req.cookies.getAll();
    const hasAuth = allCookies.some(c => 
      c.name.startsWith('sb-') || 
      c.name === "auth-token" || 
      c.name === "token" ||
      c.name === "impersonated_owner_id"
    );

    if (!hasAuth) {
      const loginUrl = new URL("/login", req.url);
      // Redirect with return-path to improve UX
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/**
 * Performance-optimized Matcher
 * Using a negative lookahead to skip static assets entirely.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (svg, png, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|json)$).*)',
  ],
};
