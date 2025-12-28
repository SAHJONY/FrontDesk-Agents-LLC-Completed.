import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdjustedPricing } from '@/services/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any, 
});

export async function POST(req: Request) {
  try {
    const { planId, region, locale, customerEmail } = await req.json();

    const regionalPlans = getAdjustedPricing(region);
    const selectedPlan = regionalPlans.find(p => p.id === planId);

    if (!selectedPlan) return NextResponse.json({ error: 'Node Mismatch' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: `FrontDesk: ${selectedPlan.name} Node`,
            description: `${selectedPlan.minutes} Neural Minutes included.`
          },
          unit_amount: selectedPlan.price * 100,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/provisioning?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/pricing`,
      customer_email: customerEmail,
      metadata: { plan_id: planId, region: region, minutes: selectedPlan.minutes },
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
