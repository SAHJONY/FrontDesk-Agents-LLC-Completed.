/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * API: Real-time Call Activity & Node Telemetry
 * Region: pdx1-edge-optimized
 */

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
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'AUTH_REQUIRED' });

    const decoded = verifyJWT(token);
    const tenantId = req.query.tenant_id as string || decoded.tenant_id;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);

    // Strict Multi-tenant Security Gate
    if (tenantId !== decoded.tenant_id) {
      return res.status(403).json({ error: 'TENANT_SECURITY_VIOLATION' });
    }

    // 1. Fetching Workforce Activity with Logic Node joins
    const { data: calls, error } = await supabase
      .from('call_logs')
      .select(`
        id,
        direction,
        from_number,
        to_number,
        status,
        duration_seconds,
        lead_qualified,
        created_at,
        ai_node_type,
        sentiment_score,
        recording_url
      `)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // 2. Formatting for Elite Command UI
    const formattedCalls = calls.map((call) => ({
      id: call.id,
      direction: call.direction, // 'inbound' | 'outbound'
      contact: call.direction === 'inbound' ? call.from_number : call.to_number,
      node: {
        type: call.ai_node_type || 'receptionist',
        label: (call.ai_node_type || 'receptionist').toUpperCase()
      },
      metrics: {
        duration: `${Math.floor(call.duration_seconds / 60)}m ${call.duration_seconds % 60}s`,
        rawSeconds: call.duration_seconds,
        sentiment: call.sentiment_score || 0.5, // 0 to 1 scale
        isQualified: !!call.lead_qualified
      },
      status: call.status, // 'completed', 'busy', 'no-answer', 'failed'
      timestamp: call.created_at,
      hasRecording: !!call.recording_url
    }));

    // 3. System Response with Telemetry Meta
    return res.status(200).json({
      calls: formattedCalls,
      telemetry: {
        activeNodes: [...new Set(formattedCalls.map(c => c.node.type))].length,
        lastUpdate: new Date().toISOString(),
        region: 'pdx1-edge'
      }
    });

  } catch (error: any) {
    console.error('[CRITICAL] Activity Stream Error:', error);
    return res.status(500).json({ error: 'ACTIVITY_STREAM_SYNC_FAILURE' });
  }
}
