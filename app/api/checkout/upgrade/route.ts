import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/admin';
import { getAdjustedPricing } from '@/services/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const { email, newPlanId, region } = await req.json();
    const supabase = createClient();

    // 1. Retrieve the user's current Stripe Customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, stripe_subscription_id')
      .eq('email', email)
      .single();

    if (!profile?.stripe_subscription_id) throw new Error("No active subscription found.");

    // 2. Get the new price details based on the Regional Multiplier
    const plans = getAdjustedPricing(region);
    const selectedPlan = plans.find(p => p.id === newPlanId);

    if (!selectedPlan) throw new Error("Invalid Tier Target.");

    // 3. Update Stripe Subscription with Proration
    const subscription = await stripe.subscriptions.retrieve(profile.stripe_subscription_id);
    
    const updatedSubscription = await stripe.subscriptions.update(profile.stripe_subscription_id, {
      items: [{
        id: subscription.items.data[0].id,
        price_data: {
          currency: 'usd',
          product_data: { name: `FrontDesk: ${selectedPlan.name} Node` },
          unit_amount: selectedPlan.price * 100,
          recurring: { interval: 'month' },
        },
      }],
      proration_behavior: 'always_invoice',
      metadata: { 
        plan_id: newPlanId, 
        minutes: selectedPlan.minutes 
      }
    });

    return NextResponse.json({ success: true, subId: updatedSubscription.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
