// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Usamos la misma versión de API que en el Webhook para evitar conflictos
const STRIPE_API_VERSION = '2024-12-18.acacia';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey
  ? new Stripe(stripeKey, { apiVersion: STRIPE_API_VERSION as any })
  : null;

type PlanKey = "starter" | "professional" | "growth" | "enterprise";

/**
 * Normaliza el nombre del plan y devuelve el label para Stripe y DB
 */
function normalizePlan(input: string): { key: PlanKey; label: string } {
  const raw = (input || "").trim().toLowerCase();
  
  const map: Record<string, { key: PlanKey; label: string }> = {
    starter: { key: "starter", label: "Starter" },
    professional: { key: "professional", label: "Professional" },
    growth: { key: "growth", label: "Growth" },
    enterprise: { key: "enterprise", label: "Enterprise" },
  };

  return map[raw] || map.starter;
}

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
  starter: "24/7 AI Receptionist • Call Summaries • CRM Basics",
  professional: "Multi-staff Scheduling • Advanced Analytics • TCPA Compliance",
  growth: "Multi-language Support • CRM Connectors • 99.9% SLA",
  enterprise: "White-labeling • Dedicated Instance • 99.99% SLA",
};

const STRIPE_PRICE_ID: Partial<Record<PlanKey, string>> = {
  starter: process.env.STRIPE_PRICE_ID_STARTER,
  professional: process.env.STRIPE_PRICE_ID_PROFESSIONAL,
  growth: process.env.STRIPE_PRICE_ID_GROWTH,
  enterprise: process.env.STRIPE_PRICE_ID_ENTERPRISE,
};

function baseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "https://front-desk-agents-llc.vercel.app";
}

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe no configurado" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const planName = body?.planName ?? body?.plan ?? body?.tier ?? "starter";
    const tenantId = body?.tenantId; 

    if (!tenantId) {
      return NextResponse.json({ error: "tenantId es requerido para el checkout" }, { status: 400 });
    }

    const { key, label } = normalizePlan(planName);
    const priceId = STRIPE_PRICE_ID[key];

    // Configuración de la sesión de Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      
      // client_reference_id es el estándar de Stripe para IDs externos
      client_reference_id: tenantId,

      // Metadata que recibirá el Webhook para actualizar Supabase
      metadata: {
        tenant_id: tenantId,
        plan: label,
        plan_key: key,
      },

      line_items: [
        priceId
          ? { price: priceId, quantity: 1 }
          : {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `FrontDesk Agents - ${label} Plan`,
                  description: `${LOCATION_RANGE[key]} • ${PLAN_DESCRIPTION[key]}`,
                },
                unit_amount: PRICE_USD[key] * 100, // Stripe usa centavos
                recurring: { interval: "month" },
              },
              quantity: 1,
            },
      ],

      success_url: `${baseUrl()}/dashboard?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${baseUrl()}/pricing?status=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Error en Checkout Session:", error);
    return NextResponse.json(
      { error: error?.message || "Error al crear sesión de pago" },
      { status: 500 }
    );
  }
}
