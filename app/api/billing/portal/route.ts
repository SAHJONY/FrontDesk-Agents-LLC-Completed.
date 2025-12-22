import { stripe } from '@/utils/stripe'; // Your Stripe init file
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = createClient();
  
  // 1. Identify the Client
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  // 2. Retrieve their Stripe ID from your 'BusinessConfig' table
  const { data: config } = await supabase
    .from('BusinessConfig')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();

  if (!config?.stripe_customer_id) {
    return NextResponse.json({ error: 'No active billing profile found.' }, { status: 404 });
  }

  // 3. Create a Stripe Portal Session
  const session = await stripe.billingPortal.sessions.create({
    customer: config.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
