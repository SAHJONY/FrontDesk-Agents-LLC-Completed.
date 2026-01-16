// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Safe Stripe initialization - won't crash during build if env var is missing
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey 
  ? new Stripe(stripeKey, { 
      apiVersion: '2024-11-20.acacia' as any,
    })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Safety check - ensure Stripe is initialized
    if (!stripe) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured on this deployment' },
        { status: 500 }
      );
    }

    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        // TODO: Fulfill the order, create user account, etc.
        break;
      
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        console.log('Subscription updated:', subscription.id);
        // TODO: Update user subscription status in database
        break;
      
      case 'customer.subscription.deleted':
        const deletedSub = event.data.object;
        console.log('Subscription deleted:', deletedSub.id);
        // TODO: Downgrade user account or send notification
        break;
      
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Invoice payment succeeded:', invoice.id);
        // TODO: Send receipt email, update billing records
        break;
      
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('Invoice payment failed:', failedInvoice.id);
        // TODO: Send payment failed notification
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 400 }
    );
  }
}
