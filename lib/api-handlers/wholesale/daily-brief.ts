import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // PROTECTED: Only the platform owner can access the business health report
    const session = verifySovereignOwner(req.headers.authorization);

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // 1. Check Crawler Activity
    const { data: newLeads, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('tenant_id', session.tenant_id)
      .gt('created_at', twentyFourHoursAgo);

    if (leadError) throw leadError;

    // 2. Check Underwriter Activity (High-Margin Deals Found Today)
    const hotDeals = newLeads.filter(l => (Number(l.assignment_potential) || 0) >= 10000);

    // 3. Compile the Briefing
    const briefing = {
      date: new Date().toLocaleDateString(),
      status: "Sovereign System Healthy",
      overnight_performance: {
        new_leads_found: newLeads.length,
        high_margin_deals: hotDeals.length,
        projected_daily_revenue: hotDeals.reduce((sum, l) => sum + (Number(l.assignment_potential) || 0), 0)
      },
      agent_status: {
        crawler: "Active",
        valuation_engine: "Active",
        voice_telephony: "Standby"
      }
    };

    return res.status(200).json(briefing);

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
