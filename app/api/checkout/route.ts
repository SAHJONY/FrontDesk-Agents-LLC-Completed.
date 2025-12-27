import { NextResponse } from 'next/server';
import Stripe from 'stripe';

/**
 * STRIPE INFRASTRUCTURE CONFIGURATION
 * Updated to match the strict type requirements of the current Stripe SDK.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore - Ignoring version mismatch if SDK hasn't caught up to the string exactly
  apiVersion: '2025-02-24.acacia', 
});

export async function POST(req: Request) {
  try {
    const { priceId, locale, customerEmail } = await req.json();

    // 1. Create a Stripe Checkout Session
    // This initiates the Sovereign Node payment protocol
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, 
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/provisioning?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/pricing`,
      customer_email: customerEmail,
      metadata: {
        node_locale: locale,
        deployment_layer: 'sovereign_production'
      },
      // Enables automatic tax calculation based on local market
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error during checkout initiation' }, 
      { status: 500 }
    );
  }
}
