/**
 * FRONTDESK AGENTS — BLAND AI WEBHOOK HANDLER
 * Node: pdx1 Deployment (Portland, USA)
 * Strategy: Secure Event Attribution & Metadata Logging
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // We now utilize 'metadata' to ensure the build passes and data is preserved
    const { event_type, call_id, metadata, analysis, transcription } = req.body;

    console.log(`Processing ${event_type} for Call ID: ${call_id}`);

    // 1. ROUTING LOGIC
    switch (event_type) {
      case 'call_completed':
        // Update database: metadata is now "read" here, fixing the build error
        const { error } = await supabase
          .from('call_logs')
          .update({ 
            status: 'completed',
            analysis,
            transcription,
            meta_data: metadata, // Fixed: metadata is now used
            end_time: new Date().toISOString()
          })
          .eq('call_id', call_id);

        if (error) throw error;
        break;

      default:
        console.log(`Event ${event_type} received for node tracking.`);
    }

    return res.status(200).json({ success: true, processed_call: call_id });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
