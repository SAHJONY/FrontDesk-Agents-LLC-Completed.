'use client';

/**
 * FRONTDESK AGENTS: FISCAL GATEWAY NODE
 * Infrastructure: Stripe Webhook Controller v2.2.1
 * Security: Idempotency Logging & Signature Verification
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* =======================
   Corporate Infrastructure Config
======================= */
const STRIPE_API_VERSION = "2024-12-18.acacia";

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? new Stripe(key, { apiVersion: STRIPE_API_VERSION as any }) : null;
};

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/* =======================
   Enterprise Tier Definitions
======================= */
export type PlanKey = "starter" | "professional" | "growth" | "enterprise";

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

function planFromPriceId(priceId?: string): PlanKey {
  if (!priceId) return "starter";
  for (const [plan, id] of Object.entries(PRICE_ID_BY_PLAN) as Array<[PlanKey, string | undefined]>) {
    if (id === priceId) return plan;
  }
  return "starter";
}

/* =======================
   Webhook Processing Pipeline
======================= */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const supabase = getSupabase();

  if (!stripe || !WEBHOOK_SECRET || !supabase) {
    return NextResponse.json({ error: "Infrastructure configuration mismatch" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Security signature missing" }, { status: 400 });

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("❌ [SECURITY] Invalid Stripe signature:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  /* =========
     Idempotency Check
  ========= */
  const { data: seen } = await supabase
    .from("stripe_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (seen) return NextResponse.json({ received: true, deduped: true });

  await supabase.from("stripe_events").insert({
    id: event.id,
    type: event.type,
    created_at: new Date().toISOString(),
  });

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await onCheckoutCompleted(event.data.object as Stripe.Checkout.Session, stripe, supabase);
        break;

      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await onSubscriptionChange(event.data.object as Stripe.Subscription, supabase);
        break;

      case "invoice.payment_succeeded":
        await onPaymentSucceeded(event.data.object as Stripe.Invoice, supabase);
        break;

      case "invoice.payment_failed":
        await onPaymentFailed(event.data.object as Stripe.Invoice, supabase);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ [OPERATIONS] Webhook processing failed:", err);
    return NextResponse.json({ error: "State synchronization error" }, { status: 500 });
  }
}

/* =======================
   State Orchestration Handlers
======================= */
async function onCheckoutCompleted(session: Stripe.Checkout.Session, stripe: Stripe, supabase: any) {
  const tenantId = session.client_reference_id || session.metadata?.tenant_id;
  if (!tenantId) return;

  const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
  const priceId = items.data[0]?.price?.id;
  const plan = planFromPriceId(priceId);
  const cfg = TIER_CONFIGS[plan];

  await supabase
    .from("tenants")
    .update({
      tier: plan,
      tier_label: cfg.label,
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      subscription_status: "active",
      max_minutes: cfg.mins,
      overage_rate: cfg.overage,
      usage_locked: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", tenantId);
}

async function onSubscriptionChange(subscription: Stripe.Subscription, supabase: any) {
  const priceId = subscription.items.data[0]?.price?.id;
  const plan = planFromPriceId(priceId);
  const cfg = TIER_CONFIGS[plan];

  await supabase
    .from("tenants")
    .update({
      tier: plan,
      tier_label: cfg.label,
      subscription_status: subscription.status,
      max_minutes: cfg.mins,
      overage_rate: cfg.overage,
      usage_locked: subscription.status !== "active",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);
}

async function onPaymentSucceeded(invoice: Stripe.Invoice, supabase: any) {
  await supabase
    .from("tenants")
    .update({
      used_minutes: 0,
      billed_overage_minutes: 0,
      subscription_status: "active",
      usage_locked: false,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", invoice.customer as string);
}

async function onPaymentFailed(invoice: Stripe.Invoice, supabase: any) {
  await supabase
    .from("tenants")
    .update({
      subscription_status: "past_due",
      usage_locked: true,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", invoice.customer as string);
}
