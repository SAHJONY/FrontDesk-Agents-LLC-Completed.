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

  // 2. Performance: Immediate skip for static/internal
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
  const isOwnerRoute = pathname.startsWith("/owner");
  const isProtected = isAdminRoute || isDashboardRoute || isOwnerRoute;

  if (!isProtected) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 5. Robust Auth & Impersonation Detection
  try {
    const allCookies = req.cookies.getAll();
    
    // Detect Supabase SSR dynamic cookies
    const hasSupabaseAuth = allCookies.some(c => 
      c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    );

    // Detect our custom Impersonation state
    const isImpersonating = req.cookies.has("impersonate_id") || req.cookies.has("impersonated_owner_id");

    const hasAuth = 
      hasSupabaseAuth || 
      isImpersonating ||
      req.cookies.has("sb-access-token") || 
      req.cookies.has("auth-token") || 
      req.cookies.has("token");

    if (!hasAuth) {
      console.log(`Middleware: Unauthenticated access attempt to ${pathname}. Redirecting.`);
      return redirectToLogin(req);
    }

    // 6. Security: Prevent non-admins from hitting /admin even if "authenticated" as a user
    // (Optional: Basic client-side role check can be added here if you store roles in cookies)
    
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    // Fallback: If cookie parsing fails, default to login for safety
    console.error("Middleware Auth Error:", error);
    return redirectToLogin(req);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)"],
};
