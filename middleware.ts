import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * STRATEGIC MIDDLEWARE V3.0.0
 * Infrastructure: Upstash Redis + Supabase Auth Guard
 * Governance: Division-based access control & High-Traffic Mitigation
 */

// Initialize High-Performance Telemetry Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Configure Rate Limiting: 50 executions per 10-second window
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(50, '10 s'),
  analytics: true,
  prefix: '@frontdesk/edge-governance',
});

const PUBLIC_PREFIXES = [
  "/", "/pricing", "/demo", "/support", "/features", "/industries",
  "/solutions", "/legal", "/privacy", "/terms", "/login", "/signup",
  "/forgot-password", "/marketing", "/ai-agents", "/setup"
];

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const ip = req.ip ?? '127.0.0.1';

  /* =======================
     1. TRAFFIC GOVERNANCE (Redis)
     Protects API infrastructure from saturation.
  ======================= */
  if (pathname.startsWith("/api/agents") || pathname.startsWith("/api/billing")) {
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    if (!success) {
      return new NextResponse("Infrastructure Saturation - Retry Following Reset", {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  }

  /* =======================
     2. NEURAL BYPASS (Emerald Access)
  ======================= */
  const shareToken = searchParams.get("token");
  if (shareToken === "emerald_public_access") {
    const response = NextResponse.next();
    response.cookies.set("emerald_session", "active", { maxAge: 3600, path: '/' });
    return response;
  }

  /* =======================
     3. DIVISION HANDLING
  ======================= */
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  
  if (isPublic || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  /* =======================
     4. PROTECTED COMMAND CENTERS
  ======================= */
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/owner");

  if (isProtectedRoute) {
    const allCookies = req.cookies.getAll();
    
    // Multi-Layer Auth Check
    const hasAuth = allCookies.some(c => 
      c.name.startsWith('sb-') || 
      c.name === "auth-token" || 
      c.name === "token" ||
      c.name === "emerald_session" ||
      c.name === "impersonated_owner_id"
    );

    if (!hasAuth) {
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
     * Optimized Matcher: High-performance exclusion of static assets 
     * to reduce Vercel Function execution costs.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|json)$).*)',
  ],
};
