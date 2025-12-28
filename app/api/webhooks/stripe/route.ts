import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  
  // FIX: headers() returns a Promise in Next.js 15
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('✅ Payment successful:', session.id);
      
      // TODO: Update your database with the successful payment
      // Example:
      // await supabase.from('customers').update({ 
      //   status: 'active',
      //   subscription_id: session.subscription 
      // }).eq('email', session.customer_email);
      
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      console.log('🔄 Subscription updated:', subscription.id);
      
      // TODO: Update subscription status in your database
      
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      console.log('❌ Subscription cancelled:', deletedSubscription.id);
      
      // TODO: Handle subscription cancellation
      
      break;

    case 'invoice.payment_failed':
      const invoice = event.data.object as Stripe.Invoice;
      console.log('⚠️ Payment failed:', invoice.id);
      
      // TODO: Handle failed payment (send email, update status, etc.)
      
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
