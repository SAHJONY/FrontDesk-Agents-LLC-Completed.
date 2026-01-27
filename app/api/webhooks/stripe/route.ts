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

const TIER_CONFIGS: Record<PlanKey, { mins: number; overage: number; label: string }> = {
  starter: { mins: 300, overage: 0.45, label: "Starter Node" },
  professional: { mins: 1200, overage: 0.4, label: "Professional Fleet" },
  growth: { mins: 3000, overage: 0.35, label: "Growth Cluster" },
  enterprise: { mins: 7000, overage: 0.3, label: "Enterprise Protocol" },
};

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

  if (!stripe || !webhookSecret || !supabase) {
    return NextResponse.json({ error: "Configuration missing" }, { status: 500 });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");
    if (!signature) return NextResponse.json({ error: "No signature" }, { status: 400 });

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log(`🔔 Stripe Event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed":
        await handleInitialSubscription(event.data.object as Stripe.Checkout.Session, stripe, supabase);
        break;

      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange(event.data.object as Stripe.Subscription, supabase);
        break;

      case "invoice.payment_succeeded":
        // ✅ Critical: Reset usage counters when payment is confirmed
        await handlePaymentSuccess(event.data.object as Stripe.Invoice, supabase);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailure(event.data.object as Stripe.Invoice, supabase);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("❌ Webhook Error:", error?.message);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

async function handleInitialSubscription(session: Stripe.Checkout.Session, stripe: Stripe, supabase: any) {
  const tenantId = session.client_reference_id || session.metadata?.tenant_id;
  if (!tenantId) return;

  let plan: PlanKey = "starter";
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const pId = lineItems.data[0]?.price?.id;
    if (pId) plan = planFromPriceId(pId) || "starter";
  } catch {
    plan = normalizePlanKey(session.metadata?.plan_key);
  }

  const config = TIER_CONFIGS[plan];
  await supabase.from("tenants").update({
    tier: plan,
    tier_label: config.label,
    stripe_customer_id: session.customer,
    stripe_subscription_id: session.subscription,
    subscription_status: "active",
    max_minutes: config.mins,
    overage_rate: config.overage,
    updated_at: new Date().toISOString(),
  }).eq("id", tenantId);
}

async function handleSubscriptionChange(subscription: Stripe.Subscription, supabase: any) {
  const plan = normalizePlanKey(subscription.metadata?.plan_key || "starter");
  const config = TIER_CONFIGS[plan];

  await supabase.from("tenants").update({
    tier: plan,
    tier_label: config.label,
    subscription_status: subscription.status,
    max_minutes: config.mins,
    overage_rate: config.overage,
    updated_at: new Date().toISOString(),
  }).eq("stripe_subscription_id", subscription.id);
}

async function handlePaymentSuccess(invoice: Stripe.Invoice, supabase: any) {
  const customerId = invoice.customer as string;
  // If payment succeeded, reset usage and clear overage tracking for this cycle
  const { error } = await supabase
    .from("tenants")
    .update({
      used_minutes: 0,
      billed_overage_minutes: 0,
      subscription_status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId);

  if (!error) console.log(`✅ Usage Reset for Customer: ${customerId}`);
}

async function handlePaymentFailure(invoice: Stripe.Invoice, supabase: any) {
  await supabase.from("tenants").update({
    subscription_status: "past_due",
    updated_at: new Date().toISOString(),
  }).eq("stripe_customer_id", invoice.customer as string);
}
