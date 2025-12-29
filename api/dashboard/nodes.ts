/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * API: Real-time Node Status & Workforce Capacity
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

    // Strict Tenant Isolation
    if (tenantId !== decoded.tenant_id) {
      return res.status(403).json({ error: 'TENANT_SECURITY_ACCESS_DENIED' });
    }

    // 1. Fetch Authorized Fleet Nodes
    const { data: phoneNumbers, error: phoneError } = await supabase
      .from('phone_numbers')
      .select('id, phone_number, assigned_node_type, status, node_region')
      .eq('tenant_id', tenantId)
      .eq('status', 'active');

    if (phoneError) throw phoneError;
    if (!phoneNumbers || phoneNumbers.length === 0) {
      return res.status(200).json({ nodes: [], fleet_status: 'standby' });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const isoToday = todayStart.toISOString();

    // 2. Compute Multi-Node Telemetry
    const nodes = await Promise.all(
      phoneNumbers.map(async (phone) => {
        // Active Concurrency Monitoring
        const { count: currentCalls } = await supabase
          .from('call_logs')
          .select('*', { count: 'exact', head: true })
          .eq('phone_number_id', phone.id)
          .eq('status', 'in-progress');

        // Throughput Monitoring
        const { count: todayCalls } = await supabase
          .from('call_logs')
          .select('*', { count: 'exact', head: true })
          .eq('phone_number_id', phone.id)
          .gte('created_at', isoToday);

        // Revenue Conversion Monitoring
        const { count: qualifiedLeads } = await supabase
          .from('call_logs')
          .select('*', { count: 'exact', head: true })
          .eq('phone_number_id', phone.id)
          .eq('lead_qualified', true)
          .gte('created_at', isoToday);

        return {
          id: phone.id,
          type: phone.assigned_node_type || 'receptionist',
          status: (currentCalls || 0) > 0 ? 'engaged' : 'idle',
          phoneNumber: phone.phone_number,
          region: phone.node_region || 'pdx1',
          metrics: {
            concurrency: currentCalls || 0,
            volume: todayCalls || 0,
            conversions: qualifiedLeads || 0,
            efficiency: todayCalls ? ((qualifiedLeads || 0) / todayCalls * 100).toFixed(1) : 0
          }
        };
      })
    );

    return res.status(200).json({ 
      timestamp: new Date().toISOString(),
      fleet_status: 'operational',
      nodes 
    });

  } catch (error: any) {
    console.error('[CRITICAL] Node Telemetry Error:', error);
    return res.status(500).json({ error: 'NODE_STATUS_RETRIEVAL_FAILURE' });
  }
}
