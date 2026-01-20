import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";

const PUBLIC_PREFIXES = [
  "/", "/pricing", "/demo", "/support", "/features", "/industries",
  "/solutions", "/legal", "/privacy", "/terms", "/login", "/signup",
  "/forgot-password", "/_not-found",
];

// Initialize Services
const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function isStaticOrInternal(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/api") || // API routes handled by their own logic
    pathname === "/robots.txt" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg")
  );
}

function isPublic(pathname: string) {
  if (isStaticOrInternal(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookies = req.cookies;
  const isPublicRoute = isPublic(pathname);

  // 1. Handle Impersonation (Super Admin Powers)
  const impersonatedId = cookies.get('impersonated_owner_id')?.value;
  if (impersonatedId && !isPublicRoute) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-impersonated-user-id', impersonatedId);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 2. ✅ PROTECTED ROUTE USAGE GUARD
  if (!isPublicRoute && pathname.startsWith("/dashboard")) {
    // Note: 'sb-access-token' is a placeholder for your specific Auth provider's cookie
    const userId = cookies.get("sb-user-id")?.value; 

    if (userId) {
      /**
       * ⚡ REDIS-FIRST STRATEGY
       * We check Redis for the "block_status". This is updated by your 
       * Bland AI Webhook when minutes run out.
       */
      const blockStatus = await redis.get(`block:${userId}`);

      if (blockStatus === 'EXHAUSTED' || blockStatus === 'PAST_DUE') {
        const upgradeUrl = req.nextUrl.clone();
        upgradeUrl.pathname = "/pricing";
        upgradeUrl.searchParams.set("reason", "usage_limit");
        return NextResponse.redirect(upgradeUrl);
      }

      /**
       * 🛡️ DB FALLBACK
       * If Redis is empty, check Supabase and prime the Redis cache.
       */
      if (!blockStatus) {
        const { data: tenant } = await supabase
          .from('tenants')
          .select('used_minutes, max_minutes')
          .eq('owner_id', userId) 
          .single();

        if (tenant && tenant.used_minutes >= tenant.max_minutes) {
          // Sync to Redis for the next request
          await redis.set(`block:${userId}`, 'EXHAUSTED', { ex: 3600 }); 
          
          const upgradeUrl = req.nextUrl.clone();
          upgradeUrl.pathname = "/pricing";
          upgradeUrl.searchParams.set("reason", "usage_limit");
          return NextResponse.redirect(upgradeUrl);
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
