/**
 * FRONTDESK AGENTS — STRIPE WEBHOOK HANDLER
 * Node: pdx1 Deployment
 * Logic: Subscription lifecycle management for global tiers
 */

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabaseServer as supabase } from '@/lib/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia', // Latest stable version
});

// Required for Stripe webhook raw body handling in Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(readable: NextApiRequest): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature']!;
  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the subscription logic
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const tenantId = session.client_reference_id;
    const tier = session.metadata?.tier || 'Basic';

    // Update tenant subscription status in Supabase
    await supabase
      .from('tenants')
      .update({ 
        subscription_tier: tier,
        status: 'active',
        stripe_customer_id: session.customer as string
      })
      .eq('id', tenantId);
      
    console.log(`Tier ${tier} activated for Tenant: ${tenantId}`);
  }

  res.json({ received: true });
}
