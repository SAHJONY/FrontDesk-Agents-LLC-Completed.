import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe outside the handler but don't force it to be non-null yet
// This prevents the build from crashing if the env var is missing during CI/CD
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey 
  ? new Stripe(stripeKey, { apiVersion: "2025-01-27" as any }) 
  : null;

export async function POST(req: Request) {
  try {
    // 1. Safety Check: Ensure Stripe is initialized
    if (!stripe) {
      console.error("CRITICAL: STRIPE_SECRET_KEY is not defined in environment variables.");
      return NextResponse.json(
        { error: "Stripe is not configured on this deployment." },
        { status: 500 }
      );
    }

    const { planName } = await req.json();

    // 2. Map plan names to their dollar values (Location-Based Model)
    const priceMap: Record<string, number> = {
      Starter: 299,
      Professional: 699,
      Growth: 1299,
      Enterprise: 2499,
    };

    const amount = priceMap[planName] || 299; // Default to Starter if planName is invalid

    // 3. Create the Subscription Checkout Session
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
      // Ensure NEXT_PUBLIC_SITE_URL is set in Vercel, or fallback to a relative path check
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/pricing`,
      metadata: { 
        plan: planName,
        marketplace_fee: "15%" // Logic placeholder for workforce revenue share
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
