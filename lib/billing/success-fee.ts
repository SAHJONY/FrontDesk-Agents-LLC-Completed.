import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function processSuccessFee(eventId: string) {
  // 1. Fetch the revenue event
  const { data: event } = await supabase
    .from('revenue_events')
    .select('*, tenants(stripe_customer_id, tier)')
    .eq('id', eventId)
    .single();

  if (!event || event.tenants.tier !== 'elite') return;

  // 2. Create Stripe Invoice Item for 15% fee
  await stripe.invoiceItems.create({
    customer: event.tenants.stripe_customer_id,
    amount: Math.round(event.success_fee_amount * 100), // Convert to cents
    currency: 'usd',
    description: `15% Success Fee - Recovered Revenue: $${event.recovered_amount}`,
  });

  // 3. Update status
  await supabase.from('revenue_events').update({ payment_status: 'invoiced' }).eq('id', eventId);
}
