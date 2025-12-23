// app/api/billing/portal/route.ts
import { createClient } from '@/utils/supabase/server';
import { createCustomerPortalSession } from '@/utils/stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Identify the Client
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response('Unauthorized', { status: 401 });

    // 2. Retrieve their Stripe ID from your 'billing' table
    const { data: billing } = await supabase
      .from('billing')
      .select('customer_id')
      .eq('user_id', user.id)
      .single();

    if (!billing?.customer_id) {
      return NextResponse.json(
        { error: 'No Stripe customer found' },
        { status: 404 }
      );
    }

    // 3. Generate Stripe Customer Portal Session
    const session = await createCustomerPortalSession(
      billing.customer_id,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    );

    // 4. Return the portal URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Billing portal error:', error);
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 }
    );
  }
}
