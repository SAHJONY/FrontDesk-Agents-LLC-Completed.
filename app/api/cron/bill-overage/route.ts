import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import Stripe from 'stripe';

export async function GET(req: Request) {
  // 1. Validate Cron Secret first to avoid unnecessary initialization
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Build-safe Initialization: Only initialize Stripe when the function is called
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ Missing STRIPE_SECRET_KEY');
    return NextResponse.json({ error: 'Billing configuration missing' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia' as any,
  });

  try {
    // 3. Search for tenants who exceeded their limit and have unbilled minutes
    const { data: overageNodes, error } = await supabaseAdmin
      .from('tenants')
      .select('id, stripe_customer_id, used_minutes, max_minutes, overage_rate, billed_overage_minutes')
      .gt('used_minutes', 'max_minutes')
      .not('stripe_customer_id', 'is', null);

    if (error) throw error;

    for (const node of overageNodes) {
      const totalOverage = Math.max(0, node.used_minutes - node.max_minutes);
      const newOverageToBill = Math.floor(totalOverage - (node.billed_overage_minutes || 0));

      if (newOverageToBill > 0) {
        // 4. Create a pending charge on the next Stripe invoice
        await stripe.invoiceItems.create({
          customer: node.stripe_customer_id,
          amount: Math.round(newOverageToBill * (node.overage_rate || 0.15) * 100), // Defaulting to $0.15/min if rate missing
          currency: 'usd',
          description: `FrontDesk AI Overage: ${newOverageToBill} additional minutes.`,
        });

        // 5. Update record so we don't bill the same minutes again
        await supabaseAdmin
          .from('tenants')
          .update({ 
            billed_overage_minutes: (node.billed_overage_minutes || 0) + newOverageToBill 
          })
          .eq('id', node.id);
      }
    }

    return NextResponse.json({ success: true, processed: overageNodes.length });
  } catch (err: any) {
    console.error('❌ Overage Billing Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
