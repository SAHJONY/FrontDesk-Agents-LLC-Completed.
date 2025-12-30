/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * API: High-Level Dashboard Intelligence
 * Logic: Real-time KPI Aggregation
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase-client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

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

    // Strict Multi-tenant Security Gate
    if (tenantId !== decoded.tenant_id) {
      return res.status(403).json({ error: 'TENANT_MISMATCH_SECURITY_BLOCK' });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const isoToday = todayStart.toISOString();

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const isoMonth = monthStart.toISOString();

    // 1. Concurrent Execution of Workforce Stats
    const [
      { count: totalCalls },
      { count: qualifiedLeads },
      { count: activeNodes },
      { data: revenueData }
    ] = await Promise.all([
      // Total Workforce Volume Today
      supabaseServer.from('call_logs')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .gte('created_at', isoToday),

      // Revenue-Ready Lead Conversions Today
      supabaseServer.from('call_logs')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .eq('lead_qualified', true)
        .gte('created_at', isoToday),

      // Operational Node Count (Telephony + Legal Nodes)
      supabaseServer.from('phone_numbers')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .eq('status', 'active'),

      // Monthly Financial Recovery (Including Legal Agents)
      supabaseServer.from('revenue_events')
        .select('recovered_amount, event_type')
        .eq('tenant_id', tenantId)
        .gte('recorded_at', isoMonth)
    ]);

    // 2. Financial Aggregation
    const totalRevenue = revenueData?.reduce((sum, e) => sum + e.recovered_amount, 0) || 0;
    const legalRevenue = revenueData?.filter(e => e.event_type === 'legal_recovery')
                                    .reduce((sum, e) => sum + e.recovered_amount, 0) || 0;

    return res.status(200).json({
      stats: {
        totalCalls: totalCalls || 0,
        qualifiedLeads: qualifiedLeads || 0,
        activeNodes: activeNodes || 0,
        revenue: Math.round(totalRevenue),
        legalRecovery: Math.round(legalRevenue),
        conversionRate: totalCalls ? ((qualifiedLeads || 0) / totalCalls * 100).toFixed(1) : 0
      },
      meta: {
        region: 'pdx1-edge',
        tier: decoded.tier, // 'elite', 'growth', etc.
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('[CRITICAL] Global Stats Failure:', error);
    return res.status(500).json({ error: 'KPI_AGGREGATION_FAILURE' });
  }
}
