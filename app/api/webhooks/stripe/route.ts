// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

// Use Service Role Key to bypass RLS for administrative updates
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;

      case 'invoice.payment_failed':
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;

      case 'invoice.payment_succeeded':
        const successInvoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(successInvoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  // Update user's billing info in database
  await supabase
    .from('billing')
    .upsert({
      customer_id: customerId,
      subscription_id: subscriptionId,
      status: 'active',
      updated_at: new Date().toISOString(),
    });

  console.log(`Checkout completed for customer: ${customerId}`);
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price.id;

  await supabase
    .from('billing')
    .update({
      subscription_id: subscription.id,
      status,
      price_id: priceId,
      updated_at: new Date().toISOString(),
    })
    .eq('customer_id', customerId);

  console.log(`Subscription ${subscription.id} status: ${status}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  await supabase
    .from('billing')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('customer_id', customerId);

  console.log(`Subscription canceled for customer: ${customerId}`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  await supabase
    .from('billing')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('customer_id', customerId);

  // TODO: Send email notification to customer
  console.log(`Payment failed for customer: ${customerId}`);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  await supabase
    .from('billing')
    .update({
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('customer_id', customerId);

  console.log(`Payment succeeded for customer: ${customerId}`);
}
