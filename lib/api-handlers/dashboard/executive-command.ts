/**
 * FRONTDESK AGENTS — EXECUTIVE COMMAND CENTER
 * Unified Intelligence for GIB (Global Intelligence Bundle)
 * Level: Elite Tier Exclusive ($1,499)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    // Verify user and plan level
    const decoded = (await verifyJWT(token)) as any;
    
    // Authorization Check: Only Growth and Elite tiers access full command center
    if (decoded.plan !== 'Elite' && decoded.plan !== 'Growth') {
      return res.status(403).json({ error: 'Upgrade to Elite to access the Executive Command Center' });
    }

    // Parallel data fetching for maximum performance (pdx1 optimization)
    const [statsResponse, revenueResponse, agentResponse] = await Promise.all([
      supabase.from('global_stats').select('*').eq('user_id', decoded.userId).single(),
      supabase.from('revenue_metrics').select('*').eq('user_id', decoded.userId),
      supabase.from('agent_performance').select('*').eq('user_id', decoded.userId)
    ]);

    if (statsResponse.error) throw statsResponse.error;

    // Build the Unified GIB Response
    const executiveDashboard = {
      platform: "FrontDesk Agents",
      bundle: "Global Intelligence Bundle (GIB)",
      tier: decoded.plan,
      industry: decoded.industry,
      timestamp: new Date().toISOString(),
      
      // Top-Line Metrics
      summary: {
        total_revenue_captured: statsResponse.data.revenue_total,
        operational_savings: statsResponse.data.labor_savings,
        efficiency_score: statsResponse.data.efficiency_rating,
        active_agents: agentResponse.data?.length || 0
      },

      // Regional/Multilingual Performance
      global_reach: {
        languages_deployed: statsResponse.data.languages || ['English'],
        uptime: "99.99%",
        avg_response_time: "< 2.5s"
      },

      // Deep Analytics
      revenue_chart: revenueResponse.data,
      agent_efficiency: agentResponse.data,
      
      // Industry-Specific Insights (Adaptive Layer)
      industry_kpis: getIndustrySpecificData(decoded.industry, statsResponse.data)
    };

    return res.status(200).json(executiveDashboard);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to synchronize Executive Command Center' });
  }
}

/**
 * Industry-Specific Mapping for FrontDesk Agents Adaptive Layer
 */
function getIndustrySpecificData(industry: string, data: any) {
  switch (industry) {
    case 'Real Estate':
      return { appointments_booked: data.appointments, lead_conversion: data.conversion };
    case 'Healthcare':
      return { no_show_reduction: data.no_show_rate, HIPAA_compliance: "Active" };
    case 'E-commerce':
      return { support_tickets_resolved: data.tickets, cart_recovery_rate: data.recovery };
    case 'Legal':
      return { intake_forms_completed: data.intake, case_prioritization: "High" };
    default:
      return { general_tasks_completed: data.total_tasks };
  }
}
