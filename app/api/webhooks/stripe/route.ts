import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/admin'; // Use service_role for DB bypass

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle Successful Subscription
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = createClient();

    // Pull metadata defined in our API route
    const userEmail = session.customer_email;
    const minutesToGrant = parseInt(session.metadata?.minutes || '0');
    const planId = session.metadata?.plan_id;
    const region = session.metadata?.region;

    if (userEmail && minutesToGrant > 0) {
      // 1. Update the user's subscription record
      const { error: subError } = await supabase
        .from('subscriptions')
        .upsert({
          email: userEmail,
          plan_id: planId,
          region: region,
          status: 'active',
          updated_at: new Date().toISOString(),
        });

      // 2. Grant the Neural Minutes to the agent workforce
      const { error: balanceError } = await supabase.rpc('increment_minutes', {
        user_email: userEmail,
        minutes_count: minutesToGrant
      });

      if (subError || balanceError) {
        console.error('Provisioning Error:', subError || balanceError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
