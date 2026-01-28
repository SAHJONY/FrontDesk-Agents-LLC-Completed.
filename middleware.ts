import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Define routes that don't require authentication
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
    pathname.startsWith("/assets") || 
    pathname.startsWith("/images") || 
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpg|jpeg|webp|svg|ico|gif|mp4|webm|pdf|txt)$/i.test(pathname)
  );
}

function isPublic(pathname: string) {
  if (isStaticOrInternal(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = req.nextUrl.clone();
  // Don't redirect if already on login to prevent infinite loops
  if (loginUrl.pathname === "/login") return NextResponse.next();
  
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Inject URL into headers for Layout accessibility
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', pathname);

  // 2. Performance: Immediate skip for static/internal/assets
  // This acts as a double-layer with the config matcher
  if (isStaticOrInternal(pathname)) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 3. Allow Public Pages
  if (isPublic(pathname)) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 4. Identify Protected Routes
  const isProtected = 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/owner");

  // If it's not a known public route and not explicitly protected, 
  // we default to allowing it (or change this to redirectToLogin for a "lockdown" approach)
  if (!isProtected) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 5. Auth Detection Logic
  try {
    const allCookies = req.cookies.getAll();
    
    // Supabase usually uses 'sb-<project-id>-auth-token'
    const hasSupabaseAuth = allCookies.some(c => 
      c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    );

    const isImpersonating = req.cookies.has("impersonate_id") || req.cookies.has("impersonated_owner_id");

    const hasAuth = 
      hasSupabaseAuth || 
      isImpersonating ||
      req.cookies.has("sb-access-token") || 
      req.cookies.has("auth-token") || 
      req.cookies.has("token");

    if (!hasAuth) {
      return redirectToLogin(req);
    }

    // Auth looks good, proceed
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    return redirectToLogin(req);
  }
}

// 6. Optimized Matcher
// Ensures middleware doesn't even wake up for these paths
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets|images|api/auth|robots.txt|sitemap.xml|.*\\..*$).*)",
  ],
};
