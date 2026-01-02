import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized: Missing Token' });

    const decoded = verifyJWT(token);
    
    // pdx1 Build Fix: Strict Null Check
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Session' });
    }

    const payload = decoded as any;
    const tenantId = payload.tenant_id;

    // Fetching Revenue Recovery Data
    const { data: interactions, error } = await supabase
      .from('interactions')
      .select('type, status, created_at, metadata')
      .eq('tenant_id', tenantId)
      .eq('handled_by', 'autonomous_agent');

    if (error) throw error;

    // Logic for Revenue Recovery calculation
    const afterHours = interactions.filter(i => {
      const hour = new Date(i.created_at).getHours();
      return hour > 18 || hour < 8;
    }).length;

    const overflow = interactions.filter(i => i.metadata?.was_overflow === true).length;

    return res.status(200).json({
      totalHandled: interactions.length,
      afterHours,
      overflow,
      recoveryMetrics: {
        totalRecoveredLeads: afterHours + overflow
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
