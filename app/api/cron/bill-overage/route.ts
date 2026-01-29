import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  // 1. Security Guard (Vercel Cron Secret)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Build-safe Stripe Initialization
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ Missing STRIPE_SECRET_KEY');
    return NextResponse.json({ error: 'Billing configuration missing' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia' as any,
  });

  try {
    // 3. Fetch tenants requiring overage processing
    const { data: overageNodes, error } = await supabaseAdmin
      .from('tenants')
      .select('id, stripe_customer_id, used_minutes, max_minutes, overage_rate, billed_overage_minutes')
      .not('stripe_customer_id', 'is', null);

    if (error) throw error;

    const results = [];

    for (const node of overageNodes) {
      const totalOverage = Math.max(0, (node.used_minutes || 0) - (node.max_minutes || 0));
      const newOverageToBill = Math.floor(totalOverage - (node.billed_overage_minutes || 0));

      if (newOverageToBill > 0) {
        const rate = node.overage_rate || 0.15;
        
        // 4. Create Stripe Invoice Item
        await stripe.invoiceItems.create({
          customer: node.stripe_customer_id as string,
          amount: Math.round(newOverageToBill * rate * 100), 
          currency: 'usd',
          description: `Neural Workforce Overage: ${newOverageToBill} mins @ $${rate}/min`,
        });

        // 5. Create and Send Invoice immediately (Optional but recommended for overages)
        await stripe.invoices.create({
          customer: node.stripe_customer_id as string,
          auto_advance: true, // Automatically attempt payment
          description: 'FrontDesk AI Usage-Based Billing'
        });

        // 6. Update Database to lock in the billed amount
        const { error: updateError } = await supabaseAdmin
          .from('tenants')
          .update({ 
            billed_overage_minutes: (node.billed_overage_minutes || 0) + newOverageToBill 
          })
          .eq('id', node.id);

        if (updateError) console.error(`Failed to lock billing for tenant: ${node.id}`);
        
        results.push({ tenant: node.id, billed: newOverageToBill });
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed: overageNodes.length,
      billedTenants: results 
    });

  } catch (err: any) {
    console.error('❌ Overage Billing Engine Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
