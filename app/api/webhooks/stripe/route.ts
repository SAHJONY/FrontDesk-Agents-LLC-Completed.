import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const getStripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return null;
  return new Stripe(stripeKey, { apiVersion: '2024-12-18.acacia' });
};

const getWebhookSecret = () => process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();

  if (!stripe || !webhookSecret) {
    console.error('❌ Stripe configuration incomplete');
    return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
  }

  let supabase;
  try {
    supabase = requireSupabaseServer();
  } catch (error: any) {
    console.error('❌ Supabase Error:', error.message);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) return NextResponse.json({ error: 'No signature' }, { status: 400 });

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('❌ Signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`🔔 Stripe Event Received: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleInitialSubscription(session, supabase);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription, supabase);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailure(invoice, supabase);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook Handler Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Handle successful checkout - Sets up the initial plan and limits
 */
async function handleInitialSubscription(session: Stripe.Checkout.Session, supabase: any) {
  const tenantId = session.metadata?.tenant_id;
  const planTier = session.metadata?.plan || 'Starter';

  if (!tenantId) {
    console.error('❌ CRITICAL: No tenant_id in session metadata. Manual fix required.');
    return;
  }

  // Calculate usage limit based on tier
  const maxSeconds = planTier === 'Pro' ? 30000 : planTier === 'Elite' ? 90000 : 5000;

  const { error } = await supabase
    .from('tenants')
    .update({
      tier: planTier,
      stripe_customer_id: session.customer as string,
      subscription_status: 'active',
      max_seconds: maxSeconds, // Sync usage limits
      updated_at: new Date().toISOString()
    })
    .eq('id', tenantId);

  if (error) console.error('❌ Error updating tenant:', error.message);
  else console.log(`✅ Success: Tenant ${tenantId} activated on ${planTier} plan.`);
}

/**
 * Syncs upgrades, downgrades, and cancellations
 */
async function handleSubscriptionChange(subscription: Stripe.Subscription, supabase: any) {
  const tenantId = subscription.metadata?.tenant_id;
  if (!tenantId) return;

  const tier = subscription.metadata?.plan || 'Starter';
  const maxSeconds = tier === 'Pro' ? 30000 : tier === 'Elite' ? 90000 : 5000;

  const { error } = await supabase
    .from('tenants')
    .update({
      tier: tier,
      subscription_status: subscription.status,
      stripe_subscription_id: subscription.id,
      max_seconds: maxSeconds, // Update limits on plan change
      updated_at: new Date().toISOString()
    })
    .eq('id', tenantId);

  if (error) console.error('❌ Error syncing subscription change:', error.message);
}

/**
 * Suspend service on payment failure
 */
async function handlePaymentFailure(invoice: Stripe.Invoice, supabase: any) {
  const customerId = invoice.customer as string;
  
  const { error } = await supabase
    .from('tenants')
    .update({ 
        subscription_status: 'past_due',
        updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);

  if (error) console.error('❌ Error marking payment as past_due:', error.message);
}
