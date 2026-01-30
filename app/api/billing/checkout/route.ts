// app/api/billing/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { assertPlanKey } from "@/lib/pricing";
import { getStripePriceId } from "@/lib/stripe-pricing";

// Force Node.js runtime (Stripe Node SDK)
export const runtime = "nodejs";

// Stripe init
const stripeKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeKey
  ? new Stripe(stripeKey, {
      // Keep flexible to avoid TS build breaks
      apiVersion: "2025-01-27" as any,
    })
  : null;

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured on this deployment" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const tenantId =
      typeof body?.tenantId === "string" ? body.tenantId.trim() : "";
    const planType =
      typeof body?.planType === "string" ? body.planType.trim() : "";

    if (!tenantId || !planType) {
      return NextResponse.json(
        { error: "Missing required fields: tenantId, planType" },
        { status: 400 }
      );
    }

    // ✅ Enforce canonical plan keys
    assertPlanKey(planType);

    // ✅ Resolve Stripe priceId from source of truth
    const priceId = getStripePriceId(planType);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_APP_URL is not configured" },
        { status: 500 }
      );
    }

    // ✅ Subscription checkout (monthly)
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: tenantId,
      metadata: {
        tenantId,
        planType,
      },
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Billing checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
