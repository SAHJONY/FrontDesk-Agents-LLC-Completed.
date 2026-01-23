// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Stripe API version (your value is valid for named versions like ".acacia")
const STRIPE_API_VERSION = "2024-12-18.acacia";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: STRIPE_API_VERSION as any }) : null;

type PlanKey = "starter" | "professional" | "growth" | "enterprise";
type BillingCycle = "monthly" | "annual";

/**
 * Normalizes incoming plan strings to your canonical PlanKey.
 */
function normalizePlan(input: unknown): { key: PlanKey; label: string } {
  const raw = String(input ?? "").trim().toLowerCase();

  const map: Record<string, { key: PlanKey; label: string }> = {
    starter: { key: "starter", label: "Starter Node" },
    professional: { key: "professional", label: "Professional Fleet" },
    growth: { key: "growth", label: "Growth Cluster" },
    enterprise: { key: "enterprise", label: "Enterprise Protocol" },
  };

  return map[raw] ?? map.starter;
}

function normalizeBilling(input: unknown): BillingCycle {
  const raw = String(input ?? "").trim().toLowerCase();
  return raw === "annual" || raw === "yearly" ? "annual" : "monthly";
}

function baseUrl(req?: Request) {
  // 1) Explicit canonical URL (best)
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;

  // 2) Vercel automatic URL (works in prod + preview)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // 3) Fallback: derive from request headers (works behind proxies)
  if (req) {
    const proto = req.headers.get("x-forwarded-proto") ?? "https";
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    if (host) return `${proto}://${host}`;
  }

  // 4) Last resort
  return "https://front-desk-agents-llc.vercel.app";
}

function assertTenantId(value: unknown): asserts value is string {
  if (!value || typeof value !== "string" || value.trim().length < 6) {
    throw new Error("tenantId is required to link the subscription to the tenant.");
  }
}

function assertPlanKey(value: unknown): asserts value is PlanKey {
  if (value !== "starter" && value !== "professional" && value !== "growth" && value !== "enterprise") {
    throw new Error(`Invalid plan key: ${String(value)}`);
  }
}

/**
 * Stripe price IDs
 * Monthly (existing):
 *  - STRIPE_PRICE_STARTER
 *  - STRIPE_PRICE_PROFESSIONAL
 *  - STRIPE_PRICE_GROWTH
 *  - STRIPE_PRICE_ENTERPRISE
 *
 * Annual (new):
 *  - STRIPE_PRICE_STARTER_ANNUAL
 *  - STRIPE_PRICE_PROFESSIONAL_ANNUAL
 *  - STRIPE_PRICE_GROWTH_ANNUAL
 *  - STRIPE_PRICE_ENTERPRISE_ANNUAL
 *
 * Backward-compatible behavior:
 *  - If billing=annual but annual price ID is missing, we fall back to monthly.
 */
const PRICE_ID_BY_PLAN_MONTHLY: Record<PlanKey, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL,
  growth: process.env.STRIPE_PRICE_GROWTH,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
};

const PRICE_ID_BY_PLAN_ANNUAL: Record<PlanKey, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER_ANNUAL,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL,
  growth: process.env.STRIPE_PRICE_GROWTH_ANNUAL,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL,
};

function getPriceId(plan: PlanKey, billing: BillingCycle) {
  const annual = PRICE_ID_BY_PLAN_ANNUAL[plan];
  const monthly = PRICE_ID_BY_PLAN_MONTHLY[plan];

  // If annual requested but not configured, fall back to monthly (safe)
  if (billing === "annual") return annual ?? monthly;

  return monthly;
}

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not configured" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));

    // Accept multiple legacy keys for compatibility
    const planInput = body?.planName ?? body?.plan ?? body?.tier ?? "starter";
    const tenantId = body?.tenantId ?? body?.tenant_id ?? body?.customerId ?? body?.customer_id;

    // NEW: billing cycle (body first, then query)
    const billingFromQuery = new URL(req.url).searchParams.get("billing");
    const billing = normalizeBilling(body?.billing ?? body?.billingCycle ?? billingFromQuery ?? "monthly");

    assertTenantId(tenantId);

    const { key, label } = normalizePlan(planInput);
    assertPlanKey(key);

    const priceId = getPriceId(key, billing);
    if (!priceId) {
      const envHint =
        billing === "annual"
          ? `STRIPE_PRICE_${key.toUpperCase()}_ANNUAL (or STRIPE_PRICE_${key.toUpperCase()} as fallback)`
          : `STRIPE_PRICE_${key.toUpperCase()}`;

      throw new Error(`Missing Stripe price id for plan=${key} billing=${billing}. Set ${envHint}.`);
    }

    const origin = baseUrl(req);

    // Optional: idempotency helps avoid duplicates if client retries quickly
    const idempotencyKey =
      (typeof body?.idempotencyKey === "string" && body.idempotencyKey.trim()) ||
      `checkout:${tenantId}:${key}:${billing}`;

    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        allow_promotion_codes: true,

        // Link Stripe checkout to your internal tenant
        client_reference_id: tenantId,

        metadata: {
          tenant_id: tenantId,
          plan_key: key,
          plan_label: label,
          billing_cycle: billing,
          protocol: "frontdesk_2026",
        },

        // Canonical billing via Stripe Price IDs only (no hardcoded amounts)
        line_items: [{ price: priceId, quantity: 1 }],

        success_url: `${origin}/dashboard?status=active&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/setup?status=retry`,
      },
      { idempotencyKey }
    );

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error?.message || "Checkout failed" }, { status: 500 });
  }
}
