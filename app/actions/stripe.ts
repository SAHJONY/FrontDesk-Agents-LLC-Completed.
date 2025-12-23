'use server';

import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';
import { getAdjustedPricing } from '@/config/pricing.config';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18-acacia' as any,
});

export async function createCheckoutSession(planId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?error=auth_required');
  }

  // Get the dynamic price from your config
  const plans = getAdjustedPricing('WESTERN'); // You can pass dynamic region here later
  const selectedPlan = plans.find(p => p.id === planId);

  if (!selectedPlan) throw new Error("Invalid Plan ID");

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: selectedPlan.currency.toLowerCase(),
          product_data: {
            name: selectedPlan.name,
            description: selectedPlan.description,
          },
          unit_amount: selectedPlan.price * 100, // Stripe uses cents
          recurring: { interval: 'month' },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#pricing`,
    metadata: {
      userId: user.id,
      planId: selectedPlan.id,
    },
  });

  return redirect(session.url!);
}
