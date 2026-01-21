import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
    pathname.startsWith("/api") || // API routes handled by their own logic
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

// ---- Optional Redis (Upstash) ----
type UpstashRedisClient = {
  get: (key: string) => Promise<unknown>;
  set: (
    key: string,
    value: string,
    opts?: { ex?: number }
  ) => Promise<unknown>;
};

async function getRedisClient(): Promise<UpstashRedisClient | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // If Upstash env is not configured, skip Redis locking.
  if (!url || !token) return null;

  try {
    // Dynamic import prevents build-time "module not found"
    const mod = await import("@upstash/redis");
    const Redis = mod.Redis;

    return new Redis({ url, token }) as unknown as UpstashRedisClient;
  } catch {
    // If package isn't installed, skip Redis locking.
    return null;
  }
}

// ---- Supabase (DB fallback) ----
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnon
    ? createClient(supabaseUrl, supabaseAnon)
    : null;

function redirectToPricing(req: NextRequest) {
  const upgradeUrl = req.nextUrl.clone();
  upgradeUrl.pathname = "/pricing";
  upgradeUrl.searchParams.set("reason", "usage_limit");
  return NextResponse.redirect(upgradeUrl);
}

function getUserIdFromCookies(req: NextRequest): string | null {
  // Your original cookie name
  const direct = req.cookies.get("sb-user-id")?.value;
  if (direct) return direct;

  // If you store user id elsewhere, keep it here.
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicRoute = isPublic(pathname);

  // 1) Impersonation header pass-through (admin only)
  const impersonatedId = req.cookies.get("impersonated_owner_id")?.value;
  if (impersonatedId && !isPublicRoute) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-impersonated-user-id", impersonatedId);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 2) Protected usage guard only for dashboard routes
  if (!isPublicRoute && pathname.startsWith("/dashboard")) {
    const userId = getUserIdFromCookies(req);

    if (!userId) {
      // If you want dashboard to require login, redirect to /login
      // Otherwise leave as-is.
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }

    // Redis-first, DB fallback
    const redis = await getRedisClient();

    if (redis) {
      const blockStatus = await redis.get(`block:${userId}`);

      if (blockStatus === "EXHAUSTED" || blockStatus === "PAST_DUE") {
        return redirectToPricing(req);
      }
    }

    // DB fallback (and optionally prime Redis)
    if (supabase) {
      const { data: tenant, error } = await supabase
        .from("tenants")
        .select("used_minutes, max_minutes")
        .eq("owner_id", userId)
        .single();

      if (!error && tenant && tenant.used_minutes >= tenant.max_minutes) {
        if (redis) {
          await redis.set(`block:${userId}`, "EXHAUSTED", { ex: 3600 });
        }
        return redirectToPricing(req);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
