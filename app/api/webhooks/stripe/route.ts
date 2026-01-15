import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  // Initialize supabase at the top of the handler
  const supabase = requireSupabaseServer();
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('✅ Stripe webhook received:', event.type);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        // Pass supabase instance to helper
        await handleSubscriptionUpdate(subscription, supabase);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancellation(subscription, supabase);
        break;
      }

      case 'invoice.paid':
        console.log('✅ Invoice paid:', (event.data.object as Stripe.Invoice).id);
        break;

      case 'invoice.payment_failed':
        console.error('❌ Payment failed:', (event.data.object as Stripe.Invoice).id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook error:', error.message);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription, supabase: any) {
  // Pull metadata we set in the Checkout API
  const customerId = subscription.metadata.customer_id;
  const planTier = subscription.metadata.plan; 
  
  if (!customerId) {
    console.error('❌ No customer_id in subscription metadata');
    return;
  }

  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: customerId, // Matching your schema's likely column name
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      status: subscription.status,
      tier: planTier || 'Starter', // Saves 'Starter', 'Professional', etc.
      plan_id: subscription.items.data[0]?.price.id,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    }, { onConflict: 'stripe_subscription_id' });

  if (error) console.error('❌ Error updating subscription:', error.message);
  else console.log('✅ DB Updated: Subscription', subscription.id);
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription, supabase: any) {
  const { error } = await supabase
    .from('subscriptions')
    .update({ 
      status: 'canceled',
      canceled_at: new Date().toISOString() 
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) console.error('❌ Error canceling subscription:', error.message);
  else console.log('✅ DB Updated: Subscription canceled', subscription.id);
}
