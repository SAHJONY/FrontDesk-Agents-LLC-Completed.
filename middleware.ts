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
    pathname.startsWith("/api/webhooks") || // Added to prevent blocking Stripe/Bland webhooks
    /\.(png|jpg|jpeg|webp|svg|ico|gif|mp4|webm|pdf|json)$/i.test(pathname)
  );
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 1. Skip middleware for static assets, internal Next.js files, and auth APIs
  if (isStaticOrInternal(pathname)) {
    return NextResponse.next();
  }

  // 2. Shareable Link Detection
  const shareToken = searchParams.get("token");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute && shareToken === "emerald_public_access") {
    return NextResponse.next();
  }

  // 3. Public Page Handling
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isPublic) {
    return NextResponse.next();
  }

  // 4. Auth Detection (Supabase & Custom)
  const allCookies = req.cookies.getAll();
  const hasAuth = allCookies.some(c => 
    c.name.includes('sb-') || // Supabase cookies usually look like sb-[project-id]-auth-token
    c.name === "auth-token" || 
    c.name === "impersonate_id" ||
    c.name.includes('supabase-auth')
  );

  // 5. Protected Route Logic
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/owner");

  if (!hasAuth && isProtectedRoute) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Refined matcher to ensure static files are ignored immediately
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets|images|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
