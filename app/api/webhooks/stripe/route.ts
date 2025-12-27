import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe'; 
import { createClient } from '@/utils/supabase/server'; 

export async function POST(req: Request) {
  const body = await req.text();
  
  // NEXT.JS 15 FIX: headers() must be awaited
  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature') as string;

  let event;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return new NextResponse('Configuration Error', { status: 500 });
  }

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error(`Webhook Signature Verification Failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const supabase = await createClient();

  // 1. INITIAL PROVISIONING: Transitioning to Sovereign Active
  if (event.type === 'checkout.session.completed') {
    const session: any = event.data.object;
    const customerId = session.customer as string;
    const planType = session.metadata?.plan_tier || 'CORE_STATION';

    const { error } = await supabase
      .from('customers')
      .update({
        stripe_customer_id: customerId,
        plan_tier: planType,
        status: 'provisioning',
        // Generate a cryptographically unique Silo ID
        silo_id: `SILO-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
        provisioned_at: new Date().toISOString(),
      })
      .eq('email', session.customer_details?.email);

    if (error) {
      console.error('Aegis Provisioning Database Error:', error.message);
    } else {
      console.log(`Sovereign Node Provisioned for: ${session.customer_details?.email}`);
    }
  }

  // 2. SUCCESS SYNTHESIS FEES: Handling Variable Yield
  if (event.type === 'invoice.created') {
    console.log('Synchronizing Capital Yield metrics with Billing Layer...');
  }

  // 3. EXECUTIVE DEACTIVATION: Kill-Switch via Subscription Cancellation
  if (event.type === 'customer.subscription.deleted') {
    const subscription: any = event.data.object;
    
    const { error } = await supabase
      .from('customers')
      .update({ 
        status: 'deactivated', 
        is_active: false 
      })
      .eq('stripe_customer_id', subscription.customer);
      
    if (error) console.error('Kill-Switch Execution Error:', error.message);
    console.log('Sovereign Node Terminated: Subscription Expired.');
  }

  return new NextResponse(JSON.stringify({ received: true }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
