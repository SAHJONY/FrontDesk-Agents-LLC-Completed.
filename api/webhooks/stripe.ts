/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Financial Sentinel: Stripe Webhook Orchestrator
 */

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabaseServer as supabase } from '@/lib/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'] as string;
  const buf = await buffer(req);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 1. ELITE SUCCESS FEE RECONCILIATION
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    
    // Check if this invoice corresponds to a 15% recovery event
    if (invoice.metadata?.type === 'success_fee') {
      await supabase
        .from('revenue_events')
        .update({
          payment_status: 'paid',
          paid_at: new Date().toISOString(),
          stripe_invoice_id: invoice.id
        })
        .eq('id', invoice.metadata.revenue_event_id);
      
      console.log(`[REVENUE] 15% Success Fee Secured: ${invoice.metadata.revenue_event_id}`);
    }
  }

  // 2. SUBSCRIPTION & TIER LIFECYCLE [cite: 2025-12-28]
  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription;
    const tier = determineTier(sub);
    const customerId = sub.customer as string;

    // Sync Tenant Tier in Sovereign Ledger
    const { data: tenant } = await supabase
      .from('subscriptions')
      .select('tenant_id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (tenant) {
      await supabase.from('tenants').update({ 
        tier, 
        status: sub.status === 'active' ? 'active' : 'past_due' 
      }).eq('id', tenant.tenant_id);
    }
  }

  return res.status(200).json({ received: true });
}

function determineTier(subscription: Stripe.Subscription): string {
  const p = subscription.items.data[0].price.id;
  if (p === process.env.STRIPE_PRICE_ID_ELITE) return 'elite';
  if (p === process.env.STRIPE_PRICE_ID_GROWTH) return 'growth';
  if (p === process.env.STRIPE_PRICE_ID_PROFESSIONAL) return 'professional';
  return 'basic';
}
