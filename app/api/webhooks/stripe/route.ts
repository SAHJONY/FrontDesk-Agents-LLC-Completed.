import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { billingService } from '@/services/billing';
import { Plans } from '@/services/plans';
import { medicAgent } from '@/services/medic.service';

// CEO Fix: Using the stable API version for your specific SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', 
});

// Use Service Role Key to bypass RLS for administrative updates
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
    console.error(`[GUARDIAN] Webhook Signature Verification Failed: ${err.message}`);
    await medicAgent.reportIncident(err, 'Stripe Signature Failure');
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 1. Hand off to the central billing service for standard processing
  await billingService.handlePayment(event);

  // 2. Specialized Database Updates (BusinessConfig Table)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const userId = session.client_reference_id; 
    // Ensuring we map the metadata to our Plans Enum
    const planType = (session.metadata?.planType as Plans) || Plans.STARTER;

    // Global Infrastructure Limits tied to your Sovereign Agent tiers
    const limits: Record<Plans, number> = {
      [Plans.STARTER]: 500,
      [Plans.PROFESSIONAL]: 2500,
      [Plans.ENTERPRISE]: 10000
    };

    if (userId) {
      console.log(`[AI CEO] Provisions activating for User: ${userId} on ${planType} plan.`);

      const { error } = await supabaseAdmin
        .from('BusinessConfig')
        .update({ 
          planType: planType,
          minuteLimit: limits[planType],
          minutesUsed: 0, // Reset usage upon successful payment
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        console.error('[MEDIC] Stripe Webhook DB Update Failed:', error.message);
        await medicAgent.reportIncident(error, 'BusinessConfig Update Failure');
      } else {
        console.log(`[SUCCESS] User ${userId} upgraded. Infrastructure scaled to ${limits[planType]} units.`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
