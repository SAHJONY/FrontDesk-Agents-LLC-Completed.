/**
 * FRONTDESK AGENTS: DASHBOARD ANALYTICS
 * Node: pdx1 Deployment
 * Logic: Fetches revenue stats based on tiered access
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase/client'; 
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = await verifyJWT(token) as any;
    
    // Fetch stats linked to the user's specific tier ($199 - $1,499)
    const { data: stats, error } = await supabaseServer
      .from('dashboard_stats')
      .select('*')
      .eq('user_id', decoded.userId)
      .single();

    if (error) throw error;

    return res.status(200).json(stats);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load dashboard statistics' });
  }
}
