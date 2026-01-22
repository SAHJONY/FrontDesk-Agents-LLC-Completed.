import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

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

// ---- Optional Redis (Upstash) ----
type UpstashRedisClient = {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: string, opts?: { ex?: number }) => Promise<unknown>;
};

async function getRedisClient(): Promise<UpstashRedisClient | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const mod = await import("@upstash/redis");
    return new mod.Redis({ url, token }) as unknown as UpstashRedisClient;
  } catch {
    return null;
  }
}

function redirectToPricing(req: NextRequest) {
  const upgradeUrl = req.nextUrl.clone();
  upgradeUrl.pathname = "/pricing";
  upgradeUrl.searchParams.set("reason", "usage_limit");
  return NextResponse.redirect(upgradeUrl);
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

type CookieToSet = { name: string; value: string; options?: any };

function getSupabase(req: NextRequest, res: NextResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnon) return null;

  return createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      },
    },
  });
}

function isOwner(user: any): boolean {
  const ownerEmail = process.env.OWNER_EMAIL?.toLowerCase();
  const email = String(user?.email || "").toLowerCase();

  const role =
    user?.app_metadata?.role ||
    user?.user_metadata?.role ||
    user?.app_metadata?.claims?.role ||
    null;

  if (ownerEmail && email === ownerEmail) return true;
  if (role && String(role).toLowerCase() === "owner") return true;

  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Hard short-circuit for static/internal
  if (isStaticOrInternal(pathname)) return NextResponse.next();

  const isPublicRoute = isPublic(pathname);

  // Prepare a response object early (needed for Supabase cookie refresh)
  const res = NextResponse.next();

  // 1) Impersonation header pass-through (admin only) — keep your behavior
  const impersonatedId = req.cookies.get("impersonated_owner_id")?.value;
  if (impersonatedId && !isPublicRoute) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-impersonated-user-id", impersonatedId);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 2) Protect admin + dashboard (must be signed in)
  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isProtected = !isPublicRoute && (isAdminRoute || isDashboardRoute);

  if (isProtected) {
    const supabase = getSupabase(req, res);
    if (!supabase) return redirectToLogin(req);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) return redirectToLogin(req);

    // 2a) Owner gate for /admin
    if (isAdminRoute && !isOwner(user)) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // 2b) Usage guard ONLY for /dashboard (keep your logic)
    if (isDashboardRoute) {
      const userId = user.id;

      const redis = await getRedisClient();
      if (redis) {
        const blockStatus = await redis.get(`block:${userId}`);
        if (blockStatus === "EXHAUSTED" || blockStatus === "PAST_DUE") {
          return redirectToPricing(req);
        }
      }

      const { data: tenant, error } = await supabase
        .from("tenants")
        .select("used_minutes, max_minutes")
        .eq("owner_id", userId)
        .single();

      if (!error && tenant && tenant.used_minutes >= tenant.max_minutes) {
        if (redis) await redis.set(`block:${userId}`, "EXHAUSTED", { ex: 3600 });
        return redirectToPricing(req);
      }
    }

    // Return the response so any Supabase cookie refresh is applied
    return res;
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
