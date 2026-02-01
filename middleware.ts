import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Routes that do not require authentication
 */
const PUBLIC_PREFIXES = [
  "/", "/pricing", "/demo", "/support", "/features", "/industries",
  "/solutions", "/legal", "/privacy", "/terms", "/login", "/signup",
  "/forgot-password", "/marketing", "/ai-agents", "/setup"
];

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 1. Shareable Link Detection (The "Emerald" Bypass)
  const shareToken = searchParams.get("token");
  if (shareToken === "emerald_public_access") {
    return NextResponse.next();
  }

  // 2. Public Page Handling
  // We use a helper to check if the current path is in our public list
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  
  if (isPublic || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 3. Protected Division Logic
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
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Optimized Matcher:
     * - Excludes static assets, images, and favicons for better performance.
     * - Only runs middleware on actual page/api routes.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|json)$).*)',
  ],
};
