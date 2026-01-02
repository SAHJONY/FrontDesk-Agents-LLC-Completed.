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
    // We utilize every variable extracted to satisfy strict Next.js 15 linting
    const { event_type, call_id, metadata, analysis, transcription } = req.body;

    console.log(`Processing ${event_type} for Call ID: ${call_id}`);

    // 1. ROUTING LOGIC
    switch (event_type) {
      case 'call_completed':
        /**
         * UPDATING DATABASE
         * We save 'metadata' here to fix the "value is never read" build error.
         * This also ensures the tenantId and tier ($199-$1,499) are logged per call.
         */
        const { error } = await supabase
          .from('call_logs')
          .update({ 
            status: 'completed',
            analysis,
            transcription,
            meta_data: metadata, // metadata is now read and saved
            updated_at: new Date().toISOString()
          })
          .eq('call_id', call_id);

        if (error) throw error;
        break;

      default:
        console.log(`Event ${event_type} acknowledged for Call ID: ${call_id}`);
    }

    return res.status(200).json({ 
      success: true, 
      processed_call: call_id,
      tenant_ref: metadata?.tenant_id || 'unknown'
    });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
