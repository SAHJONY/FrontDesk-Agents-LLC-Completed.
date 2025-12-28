import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/admin';
import { getAdjustedPricing } from '@/services/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any, // Updated to a stable version
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

    // 2. Get the new price details based on our 4-tier model
    const plans = getAdjustedPricing(region);
    const selectedPlan = plans.find(p => p.id === newPlanId);

    if (!selectedPlan) throw new Error("Invalid Tier Target.");

    // 3. Retrieve current subscription to get the item ID
    const subscription = await stripe.subscriptions.retrieve(profile.stripe_subscription_id);
    
    // 4. Update Subscription
    // We move product_data inside the correct price_data structure for Subscriptions
    const updatedSubscription = await stripe.subscriptions.update(profile.stripe_subscription_id, {
      items: [{
        id: subscription.items.data[0].id,
        price_data: {
          currency: 'usd',
          product: process.env.STRIPE_PRODUCT_ID!, // Ensure this is in your .env
          unit_amount: selectedPlan.price * 100, // E.g., 149900 for Elite
          recurring: { interval: 'month' },
        },
      }],
      proration_behavior: 'always_invoice',
      metadata: { 
        plan_id: newPlanId, 
        minutes: selectedPlan.minutes.toString() // Stripe metadata must be strings
      }
    });

    return NextResponse.json({ success: true, subId: updatedSubscription.id });
  } catch (error: any) {
    console.error("Upgrade Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
