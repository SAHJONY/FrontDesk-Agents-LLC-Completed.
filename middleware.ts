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

  // 1. Always inject the current URL into headers so RootLayout can see it
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', pathname);

  // 2. Allow static files and internal Next.js routes
  if (isStaticOrInternal(pathname)) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 3. Allow public pages
  if (isPublic(pathname)) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isProtected = isAdminRoute || isDashboardRoute;

  if (!isProtected) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 4. Auth Gate
  const hasAuth =
    Boolean(req.cookies.get("auth-token")?.value) ||
    Boolean(req.cookies.get("token")?.value) ||
    // Common Supabase/NextAuth patterns
    Boolean(req.cookies.get("sb-access-token")?.value) ||
    Boolean(req.cookies.get("access_token")?.value);

  if (!hasAuth) return redirectToLogin(req);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
