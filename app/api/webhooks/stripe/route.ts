import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe'; // Your Stripe init file
import { createClient } from '@/utils/supabase/server'; // Your Supabase init

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const supabase = await createClient();

  // 1. HANDLE SUCCESSFUL INITIAL PROVISIONING
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerId = session.customer as string;
    const planType = session.metadata?.plan_tier; // e.g., 'CORE_STATION'

    // Update Customer Profile to "Provisioning" Status
    const { error } = await supabase
      .from('customers')
      .update({
        stripe_customer_id: customerId,
        plan_tier: planType,
        status: 'provisioning', // Triggers the Onboarding UI
        silo_id: `SILO-${Math.random().toString(36).toUpperCase().substring(2, 9)}`,
        provisioned_at: new Date().toISOString(),
      })
      .eq('email', session.customer_details?.email);

    if (error) console.error('Sovereign Provisioning Error:', error);
  }

  // 2. HANDLE SUCCESS SYNTHESIS FEES (METETERED BILLING)
  if (event.type === 'invoice.created') {
    // Logic to add success fees based on "Outcomes" generated in the last 30 days
    console.log('Calculating Capital Yield for Invoice...');
  }

  // 3. HANDLE SUBSCRIPTION CANCELLATION (EXECUTIVE DEACTIVATION)
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    
    // Deactivate the Neural Node immediately
    await supabase
      .from('customers')
      .update({ status: 'deactivated', is_active: false })
      .eq('stripe_customer_id', subscription.customer);
      
    console.log('Sovereign Node Deactivated via Executive Kill-Switch (Billing).');
  }

  return new NextResponse(null, { status: 200 });
}
