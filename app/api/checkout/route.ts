import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Versión de API alineada con los últimos estándares de seguridad de Stripe
const STRIPE_API_VERSION = '2024-12-18.acacia';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey
  ? new Stripe(stripeKey, { apiVersion: STRIPE_API_VERSION as any })
  : null;

type PlanKey = "starter" | "professional" | "growth" | "enterprise";

/**
 * Normaliza el nombre del plan para el FrontDesk Protocol
 */
function normalizePlan(input: string): { key: PlanKey; label: string } {
  const raw = (input || "").trim().toLowerCase();
  
  const map: Record<string, { key: PlanKey; label: string }> = {
    starter: { key: "starter", label: "Starter Node" },
    professional: { key: "professional", label: "Professional Fleet" },
    growth: { key: "growth", label: "Growth Cluster" },
    enterprise: { key: "enterprise", label: "Enterprise Protocol" },
  };

  return map[raw] || map.starter;
}

// PRECIOS ACTUALIZADOS AL PROTOCOLO 2026 ($149 - $1,999)
const PRICE_USD: Record<PlanKey, number> = {
  starter: 149,
  professional: 499,
  growth: 999,
  enterprise: 1999,
};

const LOCATION_RANGE: Record<PlanKey, string> = {
  starter: "1 Node / 300 Mins",
  professional: "3 Nodes / 1,200 Mins",
  growth: "10 Nodes / 3,000 Mins",
  enterprise: "Unlimited Nodes / 7,000 Mins",
};

const PLAN_DESCRIPTION: Record<PlanKey, string> = {
  starter: "24/7 Autonomous Receptionist • Core Intelligence • SMS Summaries",
  professional: "Advanced Fleet Management • CRM Integration • Priority Routing",
  growth: "Cluster Deployment • Multi-language • Enterprise Security SLA",
  enterprise: "Dedicated Protocol Instance • White-label • Unlimited Capacity",
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
      return NextResponse.json({ error: "Infraestructura Stripe no detectada" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const planName = body?.planName ?? body?.plan ?? body?.tier ?? "starter";
    const tenantId = body?.tenantId; 

    if (!tenantId) {
      return NextResponse.json({ error: "Se requiere tenantId para vincular el nodo" }, { status: 400 });
    }

    const { key, label } = normalizePlan(planName);
    const priceId = STRIPE_PRICE_ID[key];

    // Creación de la Sesión de Pago Segura
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      
      // Vincula la sesión directamente con tu tenant en Supabase
      client_reference_id: tenantId,

      metadata: {
        tenant_id: tenantId,
        plan_label: label,
        plan_key: key,
        protocol: "frontdesk_2026"
      },

      line_items: [
        priceId
          ? { price: priceId, quantity: 1 }
          : {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `FrontDesk Protocol: ${label}`,
                  description: `${LOCATION_RANGE[key]} • ${PLAN_DESCRIPTION[key]}`,
                },
                unit_amount: PRICE_USD[key] * 100, // Stripe maneja centavos
                recurring: { interval: "month" },
              },
              quantity: 1,
            },
      ],

      success_url: `${baseUrl()}/dashboard?status=active&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl()}/setup?status=retry`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ PROTOCOL ERROR (Checkout):", error);
    return NextResponse.json(
      { error: error?.message || "Fallo en la pasarela de pago" },
      { status: 500 }
    );
  }
}
