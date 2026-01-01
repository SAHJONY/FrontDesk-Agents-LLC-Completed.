/**
 * FRONTDESK AGENTS: SESSION HANDLER
 * Node: pdx1 Deployment
 * Logic: Validates active user sessions for dashboard access
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase/client'; 
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });

    const decoded = await verifyJWT(token);
    
    const { data: user, error } = await supabaseServer
      .from('users')
      .select('id, email, plan, name')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid session' });
  }
}
