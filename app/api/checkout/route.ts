// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey
  ? new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" as any })
  : null;

type PlanKey = "starter" | "professional" | "growth" | "enterprise";

function normalizePlan(input: string): { key: PlanKey; label: string } {
  const raw = (input || "").trim().toLowerCase();

  if (raw === "starter") return { key: "starter", label: "Starter" };
  if (raw === "professional") return { key: "professional", label: "Professional" };
  if (raw === "growth") return { key: "growth", label: "Growth" };
  if (raw === "enterprise") return { key: "enterprise", label: "Enterprise" };

  // also support Title Case inputs
  if (raw === "starter".toLowerCase()) return { key: "starter", label: "Starter" };
  if (raw === "professional".toLowerCase()) return { key: "professional", label: "Professional" };
  if (raw === "growth".toLowerCase()) return { key: "growth", label: "Growth" };
  if (raw === "enterprise".toLowerCase()) return { key: "enterprise", label: "Enterprise" };

  // default
  return { key: "starter", label: "Starter" };
}

// Permanent pricing
const PRICE_USD: Record<PlanKey, number> = {
  starter: 299,
  professional: 699,
  growth: 1299,
  enterprise: 2499,
};

const LOCATION_RANGE: Record<PlanKey, string> = {
  starter: "1 Location",
  professional: "2–5 Locations",
  growth: "6–15 Locations",
  enterprise: "16+ Locations",
};

const PLAN_DESCRIPTION: Record<PlanKey, string> = {
  starter: "24/7 AI Receptionist • Call Summaries • Natural Language Intake • CRM Basics",
  professional: "Multi-staff Scheduling • Voicemail Transcription • Advanced Analytics • TCPA/DNC",
  growth: "Multi-language Support • CRM Connectors • Audit Logs • 99.9% SLA",
  enterprise: "White-labeling • SSO Integration • Dedicated Tenant • 99.99% SLA",
};

// Prefer Stripe Price IDs (recommended). Fallback to price_data if missing.
const STRIPE_PRICE_ID: Partial<Record<PlanKey, string>> = {
  starter: process.env.STRIPE_PRICE_ID_STARTER,
  professional: process.env.STRIPE_PRICE_ID_PROFESSIONAL,
  growth: process.env.STRIPE_PRICE_ID_GROWTH,
  enterprise: process.env.STRIPE_PRICE_ID_ENTERPRISE,
};

function baseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://front-desk-agents-llc.vercel.app"
  );
}

export async function POST(req: Request) {
  try {
    if (!stripe) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Stripe is not configured on this deployment" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const planName: string = body?.planName ?? body?.plan ?? body?.tier ?? "starter";
    const tenantId: string | undefined = body?.tenantId; // optional but recommended

    const { key, label } = normalizePlan(planName);

    const amount = PRICE_USD[key];
    const locationRange = LOCATION_RANGE[key];
    const description = PLAN_DESCRIPTION[key];

    const successUrl = `${baseUrl()}/dashboard?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl()}/pricing`;

    const priceId = STRIPE_PRICE_ID[key];

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      allow_promotion_codes: true,

      // If you provide tenantId, Stripe links it for provisioning in webhook
      client_reference_id: tenantId || undefined,

      metadata: {
        plan: label,
        plan_key: key,
        amount_usd: String(amount),
        locations: locationRange,
        tenant_id: tenantId || "",
      },

      line_items: [
        priceId
          ? { price: priceId, quantity: 1 }
          : {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `FrontDesk Agents - ${label} Plan`,
                  description: `${locationRange} • ${description}`,
                },
                unit_amount: amount * 100,
                recurring: { interval: "month" },
              },
              quantity: 1,
            },
      ],

      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
```0
