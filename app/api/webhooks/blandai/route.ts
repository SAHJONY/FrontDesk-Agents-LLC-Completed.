import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { blandAIConfig } from '@/Telephony/blandai-config';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { call_id, analysis, metadata, status } = body;

    // 1. Verify Request (Simple verification logic)
    if (!call_id || !metadata?.tenantId) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    // 2. Log the Call Activity
    const { error: logError } = await supabaseAdmin
      .from('call_logs')
      .insert({
        tenant_id: metadata.tenantId,
        bland_call_id: call_id,
        status: status,
        transcript: body.transcript,
        summary: analysis?.summary,
        sentiment: analysis?.sentiment
      });

    if (logError) throw logError;

    // 3. Trigger Elite Tier Success Fee Logic [cite: 2025-12-28]
    // If AI analysis detects recovered revenue or a closed sale
    if (metadata.tier === 'elite' && analysis?.revenue_recovered > 0) {
      await supabaseAdmin.from('revenue_events').insert({
        tenant_id: metadata.tenantId,
        recovered_amount: analysis.revenue_recovered,
        payment_status: 'pending' // Ready for Stripe Success Fee Collector
      });
    }

    // 4. Update Node Status to "Available"
    await supabaseAdmin
      .from('phone_numbers')
      .update({ last_activity: new Date().toISOString() })
      .eq('bland_id', body.to || body.from);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
