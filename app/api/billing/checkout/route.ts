// app/api/billing/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Force Node.js runtime (Stripe Node SDK)
export const runtime = "nodejs";

const stripeKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeKey
  ? new Stripe(stripeKey, {
      // Your installed Stripe typings expect a newer literal; keep this flexible to avoid TS build breaks.
      apiVersion: "2025-12-15.clover" as any,
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
    const amount = typeof body?.amount === "number" ? body.amount : null;

    if (!tenantId || !planType || amount === null) {
      return NextResponse.json(
        { error: "Missing required fields: tenantId, planType, amount" },
        { status: 400 }
      );
    }

    const unitAmount = Math.round(amount * 100);
    if (!Number.isFinite(unitAmount) || unitAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_APP_URL is not configured" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Recarga de Créditos - Plan ${planType}`,
              description: "Créditos para llamadas de IA y automatización de agenda.",
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      client_reference_id: tenantId,
      success_url: `${appUrl}/dashboard?payment=success`,
      cancel_url: `${appUrl}/dashboard?payment=cancelled`,
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
