import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Expanded Public Prefixes based on your actual build routes
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
  "/marketing", // Found in logs
  "/ai-agents",  // Found in logs
  "/setup",      // Found in logs
  "/_not-found",
];

function isStaticOrInternal(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") || 
    pathname.startsWith("/images") || 
    pathname.startsWith("/api/auth") || // Skip auth APIs
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpg|jpeg|webp|svg|ico|gif|mp4|webm|pdf)$/i.test(pathname)
  );
}

function isPublic(pathname: string) {
  if (isStaticOrInternal(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = req.nextUrl.clone();
  if (loginUrl.pathname === "/login") return NextResponse.next();
  
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Performance: Early exit for static assets
  if (isStaticOrInternal(pathname)) return NextResponse.next();

  // Inject URL for Layout use
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', pathname);

  // Allow Public Pages
  if (isPublic(pathname)) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Identify Protected Routes
  const isProtected = 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/owner") ||
    pathname.startsWith("/settings"); // Added based on build logs

  if (!isProtected) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Auth Detection
  try {
    const allCookies = req.cookies.getAll();
    const hasSupabaseAuth = allCookies.some(c => 
      c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    );

    const hasAuth = 
      hasSupabaseAuth || 
      req.cookies.has("impersonate_id") ||
      req.cookies.has("sb-access-token") || 
      req.cookies.has("auth-token");

    if (!hasAuth) {
      return redirectToLogin(req);
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    return redirectToLogin(req);
  }
}

// 6. Tightened Matcher to exclude all common static patterns
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     * - images (public images)
     */
    "/((?!_next/static|_next/image|favicon.ico|assets|images|robots.txt|sitemap.xml).*)",
  ],
};
