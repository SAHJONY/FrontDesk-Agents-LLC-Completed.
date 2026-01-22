// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STRIPE_API_VERSION = "2024-12-18.acacia";

const getStripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return null;
  return new Stripe(stripeKey, { apiVersion: STRIPE_API_VERSION as any });
};

const getWebhookSecret = () => process.env.STRIPE_WEBHOOK_SECRET;

type PlanKey = "starter" | "professional" | "growth" | "enterprise";

// ✅ Canonical tier configs ($149 / $499 / $999 / $1999)
const TIER_CONFIGS: Record<PlanKey, { mins: number; overage: number; label: string }> = {
  starter: { mins: 300, overage: 0.45, label: "Starter Node" },
  professional: { mins: 1200, overage: 0.4, label: "Professional Fleet" },
  growth: { mins: 3000, overage: 0.35, label: "Growth Cluster" },
  enterprise: { mins: 7000, overage: 0.3, label: "Enterprise Protocol" },
};

// ✅ Price ID mapping (most reliable)
const PRICE_ID_BY_PLAN: Record<PlanKey, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL,
  growth: process.env.STRIPE_PRICE_GROWTH,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
};

function planFromPriceId(priceId: string): PlanKey | null {
  const entries = Object.entries(PRICE_ID_BY_PLAN) as Array<[PlanKey, string | undefined]>;
  for (const [plan, id] of entries) {
    if (id && id === priceId) return plan;
  }
  return null;
}

function normalizePlanKey(value: unknown): PlanKey {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "starter") return "starter";
  if (raw === "professional") return "professional";
  if (raw === "growth") return "growth";
  if (raw === "enterprise") return "enterprise";
  return "starter";
}

// ✅ Webhooks must use service role (no cookies/session)
function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();
  const supabase = getServiceSupabase();

  if (!stripe || !webhookSecret) {
    console.error("❌ Stripe configuration incomplete (missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET)");
    return NextResponse.json({ error: "Missing Stripe configuration" }, { status: 500 });
  }

  if (!supabase) {
    console.error("❌ Supabase service configuration missing (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)");
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) return NextResponse.json({ error: "No signature" }, { status: 400 });

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("❌ Invalid Stripe signature:", err?.message || err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log(`🔔 Stripe Event Received: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleInitialSubscription(session, stripe, supabase);
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription, supabase);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailure(invoice, supabase);
        break;
      }

      default:
        // ignore
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("❌ Webhook Internal Error:", error?.message || error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function handleInitialSubscription(
  session: Stripe.Checkout.Session,
  stripe: Stripe,
  supabase: ReturnType<typeof getServiceSupabase>
) {
  if (!supabase) return;

  const tenantId = (session.client_reference_id as string | null) || session.metadata?.tenant_id || null;

  if (!tenantId) {
    console.error("❌ CRITICAL: No tenant_id detected on Checkout Session. Activation aborted.", {
      sessionId: session.id,
    });
    return;
  }

  // Primary: map plan from purchased Price ID
  let plan: PlanKey | null = null;
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
    const first = lineItems.data?.[0];
    const priceId = first?.price?.id;
    if (priceId) plan = planFromPriceId(priceId);
  } catch (e: any) {
    console.warn("⚠️ Could not read line items for session, falling back to metadata plan_key.", e?.message || e);
  }

  // Secondary fallback: metadata plan_key
  if (!plan) {
    plan = normalizePlanKey(session.metadata?.plan_key || "starter");
  }

  const config = TIER_CONFIGS[plan];

  const { error } = await supabase
    .from("tenants")
    .update({
      tier: plan,
      tier_label: config.label,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
      subscription_status: "active",
      max_minutes: config.mins,
      overage_rate: config.overage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", tenantId);

  if (error) {
    console.error("❌ Provisioning Error:", error.message, { tenantId, plan });
  } else {
    console.log(`✅ Tenant Activated: ${tenantId} -> ${config.label}`);
  }
}

async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof getServiceSupabase>
) {
  if (!supabase) return;

  // Best-effort tenant resolution:
  // 1) subscription.metadata.tenant_id (if you set it)
  // 2) else match by stripe_subscription_id
  const tenantId = subscription.metadata?.tenant_id as string | undefined;

  const plan = normalizePlanKey(subscription.metadata?.plan_key || "starter");
  const config = TIER_CONFIGS[plan];

  if (tenantId) {
    const { error } = await supabase
      .from("tenants")
      .update({
        tier: plan,
        tier_label: config.label,
        subscription_status: subscription.status,
        max_minutes: config.mins,
        overage_rate: config.overage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", tenantId);

    if (error) console.error("❌ Subscription Sync Error:", error.message, { tenantId });
    return;
  }

  // Fallback: update by stripe_subscription_id
  const { error } = await supabase
    .from("tenants")
    .update({
      tier: plan,
      tier_label: config.label,
      subscription_status: subscription.status,
      max_minutes: config.mins,
      overage_rate: config.overage,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) console.error("❌ Subscription Sync Error (by subscription id):", error.message, { subscriptionId: subscription.id });
}

async function handlePaymentFailure(
  invoice: Stripe.Invoice,
  supabase: ReturnType<typeof getServiceSupabase>
) {
  if (!supabase) return;

  const customerId = invoice.customer as string;

  const { error } = await supabase
    .from("tenants")
    .update({
      subscription_status: "past_due",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId);

  if (error) console.error("❌ Payment Failure Sync Error:", error.message, { customerId });
}
