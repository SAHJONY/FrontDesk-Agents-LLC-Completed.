import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. IDENTITY GUARD: Only frontdeskllc@outlook.com passes
    const session = verifySovereignOwner(req.headers.authorization);

    // 2. DATA AGGREGATION: Pulling from the leads table we just fixed
    const { data: leads, error } = await supabase
      .from('leads')
      .select('assignment_potential, status, distress_signal')
      .eq('tenant_id', session.tenant_id);

    if (error) throw error;

    // 3. SOVEREIGN METRICS: Calculate your private wealth pipeline
    const pipelineValue = leads.reduce((acc, curr) => acc + (Number(curr.assignment_potential) || 0), 0);
    const leadCount = leads.length;
    const hotLeads = leads.filter(l => l.status === 'ANALYZED').length;

    return res.status(200).json({
      success: true,
      metrics: {
        total_leads: leadCount,
        pipeline_value: pipelineValue,
        hot_leads: hotLeads,
        owner: session.email
      }
    });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
