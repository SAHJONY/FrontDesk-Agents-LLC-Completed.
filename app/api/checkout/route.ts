import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27" as any, // Updated for 2026 stability
});

export async function POST(req: Request) {
  try {
    const { planName } = await req.json();

    // Map plan names to their dollar values (Location-Based Model)
    const priceMap: Record<string, number> = {
      Starter: 299,
      Professional: 699,
      Growth: 1299,
      Enterprise: 2499,
    };

    const amount = priceMap[planName] || 299; // Default to Starter if error

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `FrontDesk Agents - ${planName} Plan`,
              description: `AI Workforce Subscription for ${planName} tier.`,
            },
            unit_amount: amount * 100, // Stripe uses cents
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      // 15% Marketplace Fee logic can be injected here for sub-accounts
      metadata: { plan: planName },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
