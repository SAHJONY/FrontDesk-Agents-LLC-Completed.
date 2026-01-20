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

// ✅ PROTOCOL TIER CONFIGURATION (Revenue Lock: $149 - $1,999)
const TIER_CONFIGS: Record<string, { mins: number; overage: number; label: string }> = {
  starter: { mins: 300, overage: 0.45, label: 'Starter Node' },
  professional: { mins: 1200, overage: 0.40, label: 'Professional Fleet' },
  growth: { mins: 3000, overage: 0.35, label: 'Growth Cluster' },
  enterprise: { mins: 7000, overage: 0.30, label: 'Enterprise Protocol' },
};

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();

  if (!stripe || !webhookSecret) {
    console.error('❌ Protocol Error: Stripe configuration incomplete');
    return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
  }

  let supabase;
  try {
    supabase = requireSupabaseServer();
  } catch (error: any) {
    console.error('❌ Database Connection Error:', error.message);
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
      console.error('❌ Protocol Breach: Invalid signature', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`🔔 FrontDesk Event Received: ${event.type}`);

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
    console.error('❌ Internal Protocol Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function handleInitialSubscription(session: Stripe.Checkout.Session, supabase: any) {
  const tenantId = session.client_reference_id || session.metadata?.tenant_id;
  const plan = (session.metadata?.plan_key || 'starter').toLowerCase();
  const config = TIER_CONFIGS[plan] || TIER_CONFIGS.starter;

  if (!tenantId) {
    console.error('❌ CRITICAL: No tenant_id detected. Activation aborted.');
    return;
  }

  // Activación de Infraestructura en Supabase
  const { error } = await supabase
    .from('tenants')
    .update({
      tier: plan,
      tier_label: config.label,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
      subscription_status: 'active',
      max_minutes: config.mins,
      overage_rate: config.overage,
      updated_at: new Date().toISOString()
    })
    .eq('id', tenantId);

  if (error) {
    console.error('❌ Provisioning Error:', error.message);
  } else {
    console.log(`✅ Node Activated: Tenant ${tenantId} on ${config.label}`);
    // Opcional: Disparar aquí la compra de número en Bland AI
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription, supabase: any) {
  const tenantId = subscription.metadata?.tenant_id;
  if (!tenantId) return;

  const plan = (subscription.metadata?.plan_key || 'starter').toLowerCase();
  const config = TIER_CONFIGS[plan] || TIER_CONFIGS.starter;

  const { error } = await supabase
    .from('tenants')
    .update({
      tier: plan,
      tier_label: config.label,
      subscription_status: subscription.status,
      max_minutes: config.mins,
      overage_rate: config.overage,
      updated_at: new Date().toISOString()
    })
    .eq('id', tenantId);

  if (error) console.error('❌ Sync Error:', error.message);
}

async function handlePaymentFailure(invoice: Stripe.Invoice, supabase: any) {
  const customerId = invoice.customer as string;
  await supabase
    .from('tenants')
    .update({ 
        subscription_status: 'past_due',
        updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);
}
