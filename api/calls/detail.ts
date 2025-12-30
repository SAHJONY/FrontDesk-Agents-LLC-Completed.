// FrontDesk Agents: Global Revenue Workforce
// API Route: Sovereign Call Intelligence & Audit
// Path: /api/calls/detail

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth/jwt-verify';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verifyJWT(token);
    const callId = req.query.id as string;

    // --- SOVEREIGN ROOT BYPASS ---
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded.tenant_id) 
      : decoded.tenant_id;
    // -------------------------------------------------------

    if (!callId) return res.status(400).json({ error: 'Call ID required' });

    // Fetch call detail with specialized Sovereign fields
    const { data: call, error } = await supabase
      .from('call_logs')
      .select('*')
      .eq('id', callId)
      .eq('tenant_id', tenantId)
      .single();

    if (error || !call) return res.status(404).json({ error: 'Call log not found' });

    // Format response with Revenue Intelligence
    const callDetail = {
      id: call.id,
      direction: call.direction,
      fromNumber: call.from_number,
      toNumber: call.to_number,
      status: call.status,
      duration: call.duration_seconds,
      recordingUrl: call.recording_url,
      transcription: call.transcription,
      nodeType: call.ai_node_type,
      startedAt: call.started_at,
      
      // REVENUE CALCULATOR
      revenueMetrics: {
        isSuccess: call.lead_qualified || false,
        estimatedRecovery: call.metadata?.recovery_amount || 0,
        sovereignFee: (call.metadata?.recovery_amount || 0) * 0.15, // Your 15% cut
        currency: call.metadata?.currency || 'USD'
      },
      
      metadata: {
        ...call.metadata,
        market: call.metadata?.market || 'US', // Track if Mexico or US node [cite: 2025-12-24]
        sovereign_audited: isSovereignRoot
      }
    };

    return res.status(200).json({ 
      call: callDetail,
      is_exempt_session: isSovereignRoot // Confirm no billing for this API call
    });
  } catch (error: any) {
    console.error('Audit error:', error);
    return res.status(500).json({ error: 'Failed to retrieve call intelligence' });
  }
}
