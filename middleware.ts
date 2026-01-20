import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js"; // Ensure you have this installed

const PUBLIC_PREFIXES = [
  "/", "/pricing", "/demo", "/support", "/features", "/industries",
  "/solutions", "/legal", "/privacy", "/terms", "/login", "/signup",
  "/forgot-password", "/_not-found",
];

// Initialize a lightweight Supabase client for usage checks
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function isStaticOrInternal(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/static") ||
    pathname === "/robots.txt" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg")
  );
}

function isPublic(pathname: string) {
  if (isStaticOrInternal(pathname)) return true;
  if (pathname.startsWith("/api")) return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookies = req.cookies;
  const isPublicRoute = isPublic(pathname);

  // 1. Handle Impersonation
  const impersonatedId = cookies.get('impersonated_owner_id')?.value;
  if (impersonatedId && !isPublicRoute) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-impersonated-user-id', impersonatedId);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 2. ✅ PROTECTED ROUTE USAGE GUARD
  // If the user is trying to access the dashboard, check if they are "Over-Limit"
  if (!isPublicRoute && pathname.startsWith("/dashboard")) {
    const session = cookies.get("sb-access-token"); // Example Supabase cookie
    
    if (session) {
      // Fetch tenant usage vs limits from Supabase
      // In production, you might want to cache this in a JWT or Redis to save DB hits
      const { data: tenant } = await supabase
        .from('tenants')
        .select('used_minutes, max_minutes, subscription_status')
        .eq('auth_user_id', session.value) 
        .single();

      // Logic: If they hit the hard cap and aren't in 'Enterprise', redirect to upgrade
      if (tenant && tenant.used_minutes >= tenant.max_minutes) {
         const upgradeUrl = req.nextUrl.clone();
         upgradeUrl.pathname = "/pricing";
         upgradeUrl.searchParams.set("reason", "usage_limit");
         return NextResponse.redirect(upgradeUrl);
      }
    }
  }

  if (isPublicRoute) return NextResponse.next();
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
