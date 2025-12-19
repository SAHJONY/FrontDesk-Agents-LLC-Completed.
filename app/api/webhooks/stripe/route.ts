import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacias',
});

// Use Service Role Key to bypass RLS for administrative updates
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // When a payment is successful, upgrade the BusinessConfig
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id; // Pass this from your checkout button
    const planType = session.metadata?.planType || 'essential';

    // Map plan types to your new Disruptive Minute Limits
    const limits: Record<string, number> = {
      'essential': 500,
      'professional': 2500,
      'enterprise': 10000
    };

    const { error } = await supabaseAdmin
      .from('BusinessConfig')
      .update({ 
        planType: planType,
        minuteLimit: limits[planType] || 500,
        minutesUsed: 0 // Reset for new subscription
      })
      .eq('userId', userId);

    if (error) console.error('Database update failed:', error);
  }

  return NextResponse.json({ received: true });
}
