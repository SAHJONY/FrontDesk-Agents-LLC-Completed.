import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import Stripe from 'stripe';

export async function GET(req: Request) {
  // 1. Security Guard
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
    // 3. Fetch only tenants with active overage that hasn't been billed yet
    const { data: overageNodes, error } = await supabaseAdmin
      .from('tenants')
      .select('id, stripe_customer_id, used_minutes, max_minutes, overage_rate, billed_overage_minutes')
      .not('stripe_customer_id', 'is', null);

    if (error) throw error;

    const results = [];

    for (const node of overageNodes) {
      // Calculate total overage since start of cycle
      const totalOverageCalculated = Math.max(0, (node.used_minutes || 0) - (node.max_minutes || 0));
      
      // Calculate what is newly owed since the last cron run
      const newOverageToBill = Math.floor(totalOverageCalculated - (node.billed_overage_minutes || 0));

      if (newOverageToBill > 0) {
        const rate = node.overage_rate || 0.15;
        
        // 4. Create Stripe Invoice Item (Pending Charge)
        await stripe.invoiceItems.create({
          customer: node.stripe_customer_id as string,
          amount: Math.round(newOverageToBill * rate * 100), // Convert to cents
          currency: 'usd',
          description: `FrontDesk AI Overage: ${newOverageToBill} mins @ $${rate}/min`,
        });

        // 5. Atomic-style update to prevent re-billing
        const { error: updateError } = await supabaseAdmin
          .from('tenants')
          .update({ 
            billed_overage_minutes: (node.billed_overage_minutes || 0) + newOverageToBill 
          })
          .eq('id', node.id);

        if (updateError) console.error(`Failed to update billing record for ${node.id}`);
        
        results.push({ tenant: node.id, billed: newOverageToBill });
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed: overageNodes.length,
      billedUnits: results 
    });

  } catch (err: any) {
    console.error('❌ Overage Billing Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
