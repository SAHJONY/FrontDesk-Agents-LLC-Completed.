import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { call_id, transcript, summary, metadata } = body;
    const supabase = createClient();

    // 1. ANALYZE REVENUE IMPACT (The "Proof of Work" Logic)
    let revenueImpact = 0;
    const isEmergency = transcript.toLowerCase().includes('emergency') || 
                        transcript.toLowerCase().includes('burst') ||
                        transcript.toLowerCase().includes('no heat');

    // Assign a dollar value to the "saved" lead (e.g., $1,500 for emergency HVAC/Plumbing)
    if (isEmergency && summary.toLowerCase().includes('booked')) {
      revenueImpact = 1500; 
    }

    // 2. LOG THE OUTCOME IN SOVEREIGN VAULT
    await supabase.from('call_logs').update({
      transcript,
      summary,
      revenue_protected: revenueImpact,
      status: 'completed',
      completed_at: new Date().toISOString()
    }).eq('call_id', call_id);

    // 3. TRIGGER OWNER NOTIFICATION
    // This feeds your Monday Briefing and real-time SMS alerts
    if (revenueImpact > 0) {
      await notifyOwnerOfSuccess(call_id, revenueImpact);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
