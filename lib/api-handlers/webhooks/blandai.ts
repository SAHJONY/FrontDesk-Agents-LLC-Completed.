/**
 * FRONTDESK AGENTS — BLAND AI WEBHOOK HANDLER
 * Node: pdx1 Deployment (Portland, USA)
 * Strategy: Secure Event Attribution
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // We capture call_id and use it in a log to satisfy the TypeScript compiler
    const { event_type, call_id, metadata, analysis, transcription } = req.body;

    console.log(`Processing ${event_type} for Call ID: ${call_id}`);

    // 1. ROUTING LOGIC
    switch (event_type) {
      case 'call_completed':
        // Update the database with the call results
        const { error } = await supabase
          .from('call_logs')
          .update({ 
            status: 'completed',
            analysis,
            transcription,
            end_time: new Date().toISOString()
          })
          .eq('call_id', call_id); // Using call_id here also fixes the error

        if (error) throw error;
        break;

      default:
        console.log(`Unhandled event type: ${event_type}`);
    }

    return res.status(200).json({ success: true, processed_call: call_id });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
