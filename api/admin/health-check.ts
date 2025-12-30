import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth/jwt-verify';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = verifyJWT(token!);

    // ROOT IDENTITY GATEKEEPER
    if (decoded.email !== 'frontdeskllc@outlook.com') {
      return res.status(403).json({ error: 'Access Denied: Sovereign Identity Required' });
    }

    // 1. Audit Global Nodes (Tenants)
    const { data: nodes } = await supabase.from('tenants').select('id, company_name, country_code, status');

    // 2. Map Health Status for each market node
    const report = await Promise.all((nodes || []).map(async (node) => {
      const { count: keyCount } = await supabase.from('api_keys').select('*', { count: 'exact', head: true }).eq('tenant_id', node.id);
      const { count: callCount } = await supabase.from('call_logs').select('*', { count: 'exact', head: true }).eq('tenant_id', node.id);
      
      return {
        market: node.country_code,
        name: node.company_name,
        status: node.status,
        integrations: keyCount ? 'Connected' : 'Missing Keys',
        revenueStream: callCount ? 'Active (15% Engine Running)' : 'Idle',
        nodeId: node.id
      };
    }));

    return res.status(200).json({
      timestamp: new Date().toISOString(),
      sovereign_status: 'Online',
      billing_tier: 'Exempt',
      global_nodes: report
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Health check failed' });
  }
}
