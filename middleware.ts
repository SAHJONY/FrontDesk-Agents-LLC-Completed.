import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PREFIXES = [
  "/", "/pricing", "/demo", "/support", "/features", "/industries",
  "/solutions", "/legal", "/privacy", "/terms", "/login", "/signup",
  "/forgot-password", "/marketing", "/ai-agents", "/setup", "/_not-found",
];

function isStaticOrInternal(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/auth") || 
    /\.(png|jpg|jpeg|webp|svg|ico|gif|mp4|webm|pdf)$/i.test(pathname)
  );
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (isStaticOrInternal(pathname)) return NextResponse.next();

  // 1. STRATEGY: Shareable Link Detection
  // If the URL has ?token=..., we allow access to specific dashboard sub-routes
  const shareToken = searchParams.get("token");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // In a real scenario, you'd verify the token via a lightweight KV check or Edge Function
  if (isDashboardRoute && shareToken === "emerald_public_access") {
    return NextResponse.next();
  }

  // 2. Public Page Handling
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isPublic) return NextResponse.next();

  // 3. Auth Detection
  const allCookies = req.cookies.getAll();
  const hasAuth = allCookies.some(c => 
    c.name.startsWith('sb-') || 
    c.name === "auth-token" || 
    c.name === "impersonate_id"
  );

  if (!hasAuth && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/owner"))) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|images|robots.txt|sitemap.xml).*)"],
};
