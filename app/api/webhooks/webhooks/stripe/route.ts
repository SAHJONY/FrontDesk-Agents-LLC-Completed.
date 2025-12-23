import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18-acacia' as any,
});

// Use Service Role Key to bypass RLS for administrative updates
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // HANDLE SUCCESSFUL SUBSCRIPTION
  if (event.type === 'checkout.session.completed') {
    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;

    if (!userId || !planId) {
      return new NextResponse('Missing metadata', { status: 400 });
    }

    // Define Minute Limits based on your Config
    const limits: Record<string, number> = {
      starter: 500,
      professional: 1000,
      enterprise: 1500,
    };

    const minuteLimit = limits[planId.toLowerCase()] || 500;

    // UPDATE BUSINESS CONFIG IN SUPABASE
    const { error } = await supabaseAdmin
      .from('BusinessConfig')
      .update({
        planType: planId,
        minuteLimit: minuteLimit,
        minutesUsed: 0, // Reset counter on new plan or upgrade
        isActive: true,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Supabase Provisioning Error:', error);
      return new NextResponse('Database Update Failed', { status: 500 });
    }

    console.log(`Neural Workforce Provisioned: User ${userId} | Plan: ${planId}`);
  }

  return new NextResponse('Webhook Received', { status: 200 });
}
