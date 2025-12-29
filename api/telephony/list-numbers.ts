/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * API: Telephony Node Inventory & Real-time Stats
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth/jwt-verify';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Using service key for cross-table head counts
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
    if (!token) {
      return res.status(401).json({ error: 'AUTH_REQUIRED' });
    }

    const decoded = verifyJWT(token);
    const tenantId = req.query.tenant_id as string || decoded.tenant_id;

    // Strict Multi-tenant Isolation
    if (tenantId !== decoded.tenant_id) {
      return res.status(403).json({ error: 'TENANT_MISMATCH_SECURITY_BLOCK' });
    }

    // 1. Fetch Primary Number Fleet
    const { data: phoneNumbers, error: phoneError } = await supabase
      .from('phone_numbers')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (phoneError) throw phoneError;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const isoToday = startOfToday.toISOString();

    /**
     * WORKFORCE TELEPHONY FLOW
     * This orchestrates how incoming/outgoing calls are mapped 
     * to the specific AI Voice Nodes in the architecture.
     */
    

    // 2. Aggregate Stats per Fleet Node
    const fleetNodes = await Promise.all(
      phoneNumbers.map(async (phone) => {
        // Fetch Today's Throughput
        const { count: todayCalls } = await supabase
          .from('call_logs')
          .select('*', { count: 'exact', head: true })
          .eq('phone_number_id', phone.id)
          .gte('created_at', isoToday);

        // Fetch Today's Revenue Conversions
        const { count: qualifiedLeads } = await supabase
          .from('call_logs')
          .select('*', { count: 'exact', head: true })
          .eq('phone_number_id', phone.id)
          .eq('lead_qualified', true)
          .gte('created_at', isoToday);

        return {
          id: phone.id,
          phoneNumber: phone.phone_number,
          friendlyName: phone.friendly_name || `Fleet Node ${phone.id.slice(0,4)}`,
          countryCode: phone.country_code,
          nodeType: phone.assigned_node_type, // e.g., 'receptionist', 'sales'
          status: phone.status, // 'provisioned', 'maintenance', 'active'
          capabilities: phone.capabilities, // ['voice', 'sms']
          metrics: {
            todayCalls: todayCalls || 0,
            qualifiedLeads: qualifiedLeads || 0,
            conversionRate: todayCalls ? ((qualifiedLeads || 0) / todayCalls * 100).toFixed(1) : 0
          },
          provisionedAt: phone.provisioned_at,
          region: phone.node_region || 'pdx1'
        };
      })
    );

    return res.status(200).json({ 
      timestamp: new Date().toISOString(),
      fleetCount: fleetNodes.length,
      numbers: fleetNodes 
    });

  } catch (error: any) {
    console.error('[CRITICAL] Telephony API Error:', error);
    return res.status(500).json({ error: 'SYSTEM_FLEET_RETRIEVAL_FAILURE' });
  }
}
  
