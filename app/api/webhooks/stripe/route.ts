import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27-ac',
});

// Use the Webhook Secret from your Stripe Dashboard
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      throw new Error('Missing stripe-signature or endpoint secret');
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the specific event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // 1. Extract metadata passed during checkout
      const customerEmail = session.customer_details?.email;
      const nodeLocale = session.metadata?.node_locale || 'en';
      
      console.log(`✅ Payment Success: Initializing Node for ${customerEmail} in market: ${nodeLocale}`);

      // 2. LOGIC: ACTIVATE THE NODE
      // This is where you would update your database (Supabase/Prisma)
      // e.g., await db.user.update({ where: { email: customerEmail }, data: { status: 'ACTIVE' } })
      
      break;

    case 'customer.subscription.deleted':
      // Handle cancellation: Disable the SARA.AI node
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`❌ Subscription deleted for customer: ${subscription.customer}`);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
