import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // CRITICAL FIX: Await the client creation
    const supabase = await createServerSupabase(); 

    const body = await req.json();
    const { transcript, summary, revenueImpact, callId } = body;

    // Now 'supabase' is fully resolved and '.from()' becomes available
    const { error } = await supabase
      .from('call_logs')
      .update({
        transcript,
        summary,
        revenue_protected: revenueImpact,
        status: 'COMPLETED',
        updated_at: new Date().toISOString()
      })
      .eq('id', callId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[WEBHOOK_ERROR]:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
