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
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico")
  );
}

function isPublic(pathname: string) {
  if (isStaticOrInternal(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Inject URL into headers for Layout accessibility
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', pathname);

  // 2. Performance: Immediate skip for static/internal/API
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
  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isOwnerRoute = pathname.startsWith("/owner"); // Added for your owner outreach logic
  const isProtected = isAdminRoute || isDashboardRoute || isOwnerRoute;

  if (!isProtected) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 5. Supabase Auth Gate
  // We prioritize 'sb-access-token' which we set in our signup API
  const hasAuth = 
    req.cookies.has("sb-access-token") || 
    req.cookies.has("auth-token") || 
    req.cookies.has("token");

  if (!hasAuth) {
    console.log(`Middleware: Unauthenticated access attempt to ${pathname}. Redirecting to /login.`);
    return redirectToLogin(req);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Optimized matcher to exclude static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)"],
};
