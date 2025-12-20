import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// CEO Fix: Using the specific API version for your SDK and current date
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

// Use Service Role Key to bypass RLS for administrative updates
// This is required because your RLS policies restrict standard user access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body, 
      signature, 
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // We use client_reference_id to pass the Supabase User ID from the frontend
    const userId = session.client_reference_id; 
    const planType = session.metadata?.planType || 'essential';

    // Global Infrastructure Limits defined in your SQL schema
    const limits: Record<string, number> = {
      'essential': 500,
      'professional': 2500,
      'enterprise': 10000
    };

    if (userId) {
      // CEO Fix: Ensuring column names match your 'user_id' schema
      const { error } = await supabaseAdmin
        .from('BusinessConfig')
        .update({ 
          planType: planType,
          minuteLimit: limits[planType] || 500,
          minutesUsed: 0, // Reset usage upon successful payment/upgrade
          status: 'active' 
        })
        .eq('user_id', userId); // Matches the user_id column in your database

      if (error) {
        console.error('Stripe Webhook Database Update Failed:', error.message);
      } else {
        console.log(`Successfully upgraded user ${userId} to ${planType} plan.`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
