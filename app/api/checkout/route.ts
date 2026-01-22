// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Keep this aligned with your Stripe account / SDK compatibility
const STRIPE_API_VERSION = "2024-12-18.acacia";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: STRIPE_API_VERSION as any }) : null;

type PlanKey = "starter" | "professional" | "growth" | "enterprise";

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

function baseUrl() {
  // Prefer your canonical public app URL in production
  return process.env.NEXT_PUBLIC_APP_URL || "https://front-desk-agents-llc.vercel.app";
}

function assertTenantId(value: unknown): asserts value is string {
  if (!value || typeof value !== "string" || value.trim().length < 6) {
    throw new Error("tenantId is required to link the subscription to the tenant.");
  }
}

function assertPlanKey(value: unknown): asserts value is PlanKey {
  if (
    value !== "starter" &&
    value !== "professional" &&
    value !== "growth" &&
    value !== "enterprise"
  ) {
    throw new Error(`Invalid plan key: ${String(value)}`);
  }
}

const PRICE_ID_BY_PLAN: Record<PlanKey, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL,
  growth: process.env.STRIPE_PRICE_GROWTH,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
};

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not configured" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));

    // Accept multiple legacy keys for compatibility
    const planInput = body?.planName ?? body?.plan ?? body?.tier ?? "starter";
    const tenantId = body?.tenantId ?? body?.tenant_id ?? body?.customerId ?? body?.customer_id;

    assertTenantId(tenantId);

    const { key, label } = normalizePlan(planInput);
    assertPlanKey(key);

    const priceId = PRICE_ID_BY_PLAN[key];
    if (!priceId) {
      throw new Error(`Missing Stripe price id for plan=${key}. Set STRIPE_PRICE_${key.toUpperCase()}.`);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      allow_promotion_codes: true,

      // Link Stripe checkout to your internal tenant
      client_reference_id: tenantId,

      metadata: {
        tenant_id: tenantId,
        plan_key: key,
        plan_label: label,
        protocol: "frontdesk_2026",
      },

      // Canonical billing via Stripe Price IDs only (no hardcoded amounts)
      line_items: [{ price: priceId, quantity: 1 }],

      success_url: `${baseUrl()}/dashboard?status=active&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl()}/setup?status=retry`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
