// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) return NextResponse.json({ error: 'No signature' }, { status: 400 });

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleSovereignOnboarding(session);
        break;

      case 'customer.subscription.deleted':
        const deletedSub = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSub);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(failedInvoice);
        break;

      case 'invoice.payment_succeeded':
        const successInvoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(successInvoice);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Sovereign Webhook Error:', error);
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }
}

/**
 * CORE ONBOARDING LOGIC
 * Triggers Shadow Node provisioning and Human-First Onboarding Email
 */
async function handleSovereignOnboarding(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const customerEmail = session.customer_details?.email;
  const subscriptionId = session.subscription as string;

  // 1. Update Billing Table
  await supabase.from('billing').upsert({
    customer_id: customerId,
    subscription_id: subscriptionId,
    status: 'active',
    email: customerEmail,
    updated_at: new Date().toISOString(),
  });

  // 2. Provision Shadow Node & Identity Keys
  // This creates the isolated environment for their Human Agent
  const { data: node, error: nodeError } = await supabase
    .from('business_nodes')
    .insert([{
      owner_email: customerEmail,
      stripe_customer_id: customerId,
      status: 'provisioning',
      agent_name: 'Sara', // Default starting persona
      vault_enabled: true
    }])
    .select()
    .single();

  if (nodeError) throw new Error(`Node Provisioning Failed: ${nodeError.message}`);

  // 3. Trigger the Sovereign Onboarding Email
  // We send the Dashboard link + Onboarding Manual
  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications/onboard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.INTERNAL_API_KEY! },
    body: JSON.stringify({
      email: customerEmail,
      nodeId: node.id,
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/setup/${node.id}`
    }),
  });

  console.log(`🛡️ Sovereign Node Provisioned for: ${customerEmail}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  // Mark node for decommissioning
  await supabase
    .from('business_nodes')
    .update({ status: 'decommissioning' })
    .eq('stripe_customer_id', customerId);

  await supabase
    .from('billing')
    .update({ status: 'canceled', updated_at: new Date().toISOString() })
    .eq('customer_id', customerId);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  await supabase
    .from('billing')
    .update({ status: 'past_due', updated_at: new Date().toISOString() })
    .eq('customer_id', customerId);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  await supabase
    .from('billing')
    .update({ status: 'active', updated_at: new Date().toISOString() })
    .eq('customer_id', customerId);
}
