// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey 
  ? new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" as any }) 
  : null;

export async function POST(req: Request) {
  try {
    if (!stripe) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Stripe is not configured on this deployment" },
        { status: 500 }
      );
    }

    const { planName } = await req.json();

    // CORRECT Location-Based Pricing
    const priceMap: Record<string, number> = {
      Starter: 299,        // 1 Location
      Professional: 699,   // 2-5 Locations (MOST POPULAR)
      Growth: 1299,        // 6-15 Locations
      Enterprise: 2499,    // 16+ Locations
      
      // Support lowercase
      starter: 299,
      professional: 699,
      growth: 1299,
      enterprise: 2499,
    };

    const amount = priceMap[planName] || 299; // Default to Starter

    // Location ranges for descriptions
    const locationRanges: Record<string, string> = {
      Starter: "1 Location",
      Professional: "2–5 Locations",
      Growth: "6–15 Locations",
      Enterprise: "16+ Locations",
    };

    // Plan descriptions for Stripe
    const planDescriptions: Record<string, string> = {
      Starter: "24/7 AI Receptionist • Call Summaries • Natural Language Intake • CRM Basics",
      Professional: "Multi-staff Scheduling • Voicemail Transcription • Advanced Analytics • TCPA/DNC",
      Growth: "Multi-language Support • CRM Connectors • Audit Logs • 99.9% SLA",
      Enterprise: "White-labeling • SSO Integration • Dedicated Tenant • 99.99% SLA",
    };

    const normalizedPlanName = planName.charAt(0).toUpperCase() + planName.slice(1).toLowerCase();
    const locationRange = locationRanges[normalizedPlanName] || locationRanges.Starter;
    const description = planDescriptions[normalizedPlanName] || planDescriptions.Starter;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `FrontDesk Agents - ${normalizedPlanName} Plan`,
              description: `${locationRange} • ${description}`,
            },
            unit_amount: amount * 100, // Stripe uses cents
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://front-desk-agents-llc.vercel.app'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://front-desk-agents-llc.vercel.app'}/pricing`,
      metadata: { 
        plan: normalizedPlanName,
        amount: amount,
        locations: locationRange,
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" }, 
      { status: 500 }
    );
  }
}
