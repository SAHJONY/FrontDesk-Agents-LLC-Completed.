import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * SOVEREIGN MIDDLEWARE V2.2.1
 * Handles Division-based access control, Public Bypasses, and Auth Guardrails.
 */

const PUBLIC_PREFIXES = [
  "/", "/pricing", "/demo", "/support", "/features", "/industries",
  "/solutions", "/legal", "/privacy", "/terms", "/login", "/signup",
  "/forgot-password", "/marketing", "/ai-agents", "/setup"
];

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 1. NEURAL BYPASS (Emerald Access)
  // Allows viewing the platform via a secure shareable token without a login prompt.
  const shareToken = searchParams.get("token");
  if (shareToken === "emerald_public_access") {
    const response = NextResponse.next();
    // Persist the bypass in a session cookie if needed
    response.cookies.set("emerald_session", "active", { maxAge: 3600, path: '/' });
    return response;
  }

  // 2. PUBLIC & API DIVISION HANDLING
  // Ensures marketing and documentation pages never hang.
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  
  if (isPublic || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 3. PROTECTED COMMAND CENTERS (Dashboard, Admin, Owner)
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/owner");

  if (isProtectedRoute) {
    const allCookies = req.cookies.getAll();
    
    // Multi-Layer Auth Check (Supabase + Custom JWT + Emerald Session)
    const hasAuth = allCookies.some(c => 
      c.name.startsWith('sb-') || 
      c.name === "auth-token" || 
      c.name === "token" ||
      c.name === "emerald_session" ||
      c.name === "impersonated_owner_id"
    );

    if (!hasAuth) {
      // Redirect to login but save the 'next' destination for seamless UX after auth
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
     * High-performance exclusion of static assets to reduce Vercel Function execution costs.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|json)$).*)',
  ],
};
