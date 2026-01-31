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
  // Useful for sending temporary access links to prospective clients
  const shareToken = searchParams.get("token");
  if (shareToken === "emerald_public_access") {
    return NextResponse.next();
  }

  // 2. Public Page Handling
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  
  // Also allow API routes to handle their own internal auth logic
  if (isPublic || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 3. Multi-Provider Auth Detection
  // Checks for Supabase SSR cookies, custom JWTs, or admin impersonation tokens
  const allCookies = req.cookies.getAll();
  const hasAuth = allCookies.some(c => 
    c.name.startsWith('sb-') || 
    c.name === "auth-token" || 
    c.name === "token" ||
    c.name === "impersonated_owner_id"
  );

  // 4. Protected Division Logic
  // These are the restricted zones for the 8-Division AI Workforce
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/owner");

  if (isProtectedRoute && !hasAuth) {
    const loginUrl = new URL("/login", req.url);
    // Deep-link the user back to where they were trying to go
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Performance-optimized Matcher
 * Skips the middleware entirely for static files and common media extensions
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|json)$).*)',
  ],
};
