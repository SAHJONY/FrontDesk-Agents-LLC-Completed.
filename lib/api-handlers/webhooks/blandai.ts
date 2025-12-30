/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Intelligence Layer: Webhook Processor & Merit-Based Revenue Trigger
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    // 1. CRYPTOGRAPHIC VERIFICATION
    const signature = req.headers['x-bland-signature'] as string;
    if (!verifyBlandSignature(JSON.stringify(req.body), signature)) {
      return res.status(403).json({ error: 'Signature mismatch' });
    }

    const { event_type, call_id, metadata, analysis, transcription } = req.body;

    // 2. ROUTING LOGIC
    switch (event_type) {
      case 'call.ended':
        await handleCallEnded(req.body);
        break;
      
      case 'call.analysis.completed':
        // The core revenue-triggering event
        await processEliteMeritAnalysis(req.body);
        break;

      default:
        console.log(`[WEBHOOK] Event ${event_type} logged.`);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('[WEBHOOK_ERROR]', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * PROCESS ELITE MERIT ANALYSIS
 * Logic: Analyzes legal merits and triggers the 15% Success Fee for Elite users.
 */
async function processEliteMeritAnalysis(payload: any) {
  const { call_id, analysis, metadata, sentiment, lead_score } = payload;
  const { tenant_id, tier } = metadata;

  // 1. Determine Qualification (Merit-First for Elite)
  const isHighValue = (lead_score >= 85) || 
                     (analysis?.toLowerCase().includes('legal claim')) || 
                     (sentiment === 'positive');

  // 2. Update Call Ledger
  await supabase.from('call_logs').update({
    lead_qualified: isHighValue,
    status: 'analyzed',
    metadata: { ...payload }
  }).eq('twilio_call_sid', call_id);

  // 3. ELITE REVENUE TRIGGER: Auto-calculate 15% Success Fee
  // If Elite and High Value, create a pending revenue event for audit
  if (tier === 'elite' && isHighValue) {
    const estimatedRecovery = 5000; // Mock: In production, AI extracts this value from transcript
    const successFee = estimatedRecovery * 0.15;

    await supabase.from('revenue_events').insert({
      tenant_id,
      event_type: 'recovered_revenue',
      recovered_amount: estimatedRecovery,
      success_fee_percentage: 15,
      success_fee_amount: successFee,
      payment_status: 'pending',
      source_call_id: call_id,
      notes: `AI Analysis: ${analysis?.slice(0, 100)}...`
    });
  }
}

async function handleCallEnded(payload: any) {
  await supabase.from('call_logs').update({
    status: 'completed',
    duration_seconds: payload.duration,
    recording_url: payload.recording_url,
    ended_at: new Date().toISOString()
  }).eq('twilio_call_sid', payload.call_id);
}

function verifyBlandSignature(payload: string, signature: string): boolean {
  const secret = process.env.BLAND_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
