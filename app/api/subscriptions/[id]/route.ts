import { NextRequest, NextResponse } from "next/server";
import { requireSupabaseServer } from "@/lib/supabase-server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY || "";
  if (!key) return null;

  // IMPORTANT: do NOT create Stripe at module scope (build-time crash risk)
  return new Stripe(key, {
    apiVersion: "2024-12-18.acacia",
  });
}

// GET /api/subscriptions/[id] - Get subscription details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing subscription id" }, { status: 400 });
    }

    // Supabase (server-only). If this function throws when env is missing,
    // it will be caught and returned as degraded instead of breaking build.
    const supabase = requireSupabaseServer();

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*, customers(company_name, contact_email)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    // Stripe enrichment (optional)
    if (data.stripe_subscription_id) {
      const stripe = getStripeClient();
      if (!stripe) {
        // Do not fail request; return DB data + degraded stripe status
        return NextResponse.json({
          subscription: data,
          stripe_subscription: null,
          status: "degraded",
          degraded_reason: "Missing STRIPE_SECRET_KEY",
        });
      }

      const stripeSubscription = await stripe.subscriptions.retrieve(
        data.stripe_subscription_id
      );

      return NextResponse.json({
        subscription: data,
        stripe_subscription: stripeSubscription,
      });
    }

    return NextResponse.json({ subscription: data });
  } catch (error: any) {
    const msg = typeof error?.message === "string" ? error.message : "Internal server error";
    console.error("❌ Unexpected error:", msg);

    // If env is missing for Supabase/Stripe, return degraded instead of hard-failing builds
    const isEnvIssue =
      msg.toLowerCase().includes("supabase") ||
      msg.toLowerCase().includes("key") ||
      msg.toLowerCase().includes("missing") ||
      msg.toLowerCase().includes("not set");

    return NextResponse.json(
      {
        error: isEnvIssue ? "Service not configured" : "Internal server error",
        status: isEnvIssue ? "degraded" : "error",
        details: msg,
      },
      { status: isEnvIssue ? 503 : 500 }
    );
  }
}

// DELETE /api/subscriptions/[id] - Cancel subscription
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing subscription id" }, { status: 400 });
    }

    const supabase = requireSupabaseServer();
    const { searchParams } = new URL(request.url);
    const immediate = searchParams.get("immediate") === "true";

    // Get subscription
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    // Cancel in Stripe (only if configured + has stripe_subscription_id)
    if (subscription.stripe_subscription_id) {
      const stripe = getStripeClient();
      if (!stripe) {
        return NextResponse.json(
          {
            error: "Stripe not configured (missing STRIPE_SECRET_KEY)",
            status: "degraded",
          },
          { status: 503 }
        );
      }

      if (immediate) {
        await stripe.subscriptions.cancel(subscription.stripe_subscription_id);
      } else {
        await stripe.subscriptions.update(subscription.stripe_subscription_id, {
          cancel_at_period_end: true,
        });
      }
    }

    // Update database
    const { data: updated, error: updateError } = await supabase
      .from("subscriptions")
      .update({
        status: immediate ? "canceled" : "active",
        cancel_at_period_end: !immediate,
        canceled_at: immediate ? new Date().toISOString() : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("❌ Error updating subscription:", updateError);
      return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 });
    }

    console.log("✅ Subscription canceled:", id);
    return NextResponse.json({
      message: immediate
        ? "Subscription canceled immediately"
        : "Subscription will cancel at period end",
      subscription: updated,
    });
  } catch (error: any) {
    const msg = typeof error?.message === "string" ? error.message : "Failed to cancel subscription";
    console.error("❌ Error canceling subscription:", msg);

    const isEnvIssue =
      msg.toLowerCase().includes("supabase") ||
      msg.toLowerCase().includes("key") ||
      msg.toLowerCase().includes("missing") ||
      msg.toLowerCase().includes("not set");

    return NextResponse.json(
      {
        error: isEnvIssue ? "Service not configured" : "Failed to cancel subscription",
        status: isEnvIssue ? "degraded" : "error",
        details: msg,
      },
      { status: isEnvIssue ? 503 : 500 }
    );
  }
}
