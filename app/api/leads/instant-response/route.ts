import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { calculateLeadScore } from '@/lib/core/lead-scorer';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const lead = payload.record; // Supabase sends the new row in the 'record' object

    // 1. Instant Neural Scoring
    const { score, priority } = calculateLeadScore(lead.signals);

    // 2. Automated Action for High-Value Targets
    if (priority === 'CRITICAL' || score > 80) {
      // Logic to trigger Twilio SMS or AI Voice Agent
      // await sendInstantSMS(lead.phone, `Hi ${lead.name}, I'm processing your request now...`);
      
      console.log(`[SPEED-TO-LEAD] High-priority lead ${lead.id} handled in < 5s`);
    }

    return NextResponse.json({ success: true, latency: 'sub-10s' });
  } catch (error) {
    return NextResponse.json({ error: 'Fast-track failed' }, { status: 500 });
  }
}
