import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdjustedPricing } from '@/services/pricing';
import { Plans } from '@/services/plans';

/**
 * STRIPE INFRASTRUCTURE CONFIGURATION
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: '2025-02-24.acacia', 
});

export async function POST(req: Request) {
  try {
    const { planId, region, locale, customerEmail } = await req.json();

    // 1. Recalculate Sovereign Pricing based on permanent platform tiers
    const regionalPlans = getAdjustedPricing(region);
    const selectedPlan = regionalPlans.find(p => p.id === planId);

    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid Plan ID for the current node' }, { status: 400 });
    }

    // 2. Initiate the Sovereign Node payment protocol
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `FrontDesk AI: ${selectedPlan.name}`,
              description: `${selectedPlan.minutes} Neural Minutes included for ${selectedPlan.target}`,
            },
            unit_amount: selectedPlan.price * 100, // Stripe expects cents
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/provisioning?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/pricing`,
      customer_email: customerEmail,
      metadata: {
        node_locale: locale,
        region: region,
        plan_id: planId,
        minutes_bundle: selectedPlan.minutes,
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
