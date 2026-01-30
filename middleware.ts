import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PREFIXES = [
  "/", "/pricing", "/demo", "/support", "/features", "/industries",
  "/solutions", "/legal", "/privacy", "/terms", "/login", "/signup",
  "/forgot-password", "/marketing", "/ai-agents", "/setup"
];

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 1. Shareable Link Detection (Bypass check for specific tokens)
  const shareToken = searchParams.get("token");
  if (shareToken === "emerald_public_access") {
    return NextResponse.next();
  }

  // 2. Public Page Handling
  // We check if the current path is in our list of public routes
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isPublic) {
    return NextResponse.next();
  }

  // 3. Auth Detection
  // We look for Supabase SSR cookies or your custom auth-token
  const allCookies = req.cookies.getAll();
  const hasAuth = allCookies.some(c => 
    c.name.includes('sb-') || 
    c.name === "auth-token" || 
    c.name.includes('supabase-auth') ||
    c.name === "impersonate_id"
  );

  // 4. Protected Route Logic
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/owner");

  // If trying to access a protected route without a session, redirect to login
  if (isProtectedRoute && !hasAuth) {
    const loginUrl = new URL("/login", req.url);
    // Append the original destination so user can return after login
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Matcher ignores:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - All files with extensions (svg, png, jpg, etc.)
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|json)$).*)',
  ],
};
