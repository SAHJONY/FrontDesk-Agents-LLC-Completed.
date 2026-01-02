/**
 * FRONTDESK AGENTS — ADMIN HEALTH CHECK
 * Node: pdx1 Deployment
 * Strategy: Strict Null-Safety & Identity Verification
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth/jwt-verify';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Missing Token' });

  const decoded = verifyJWT(token);

  // FIX: Added null check to satisfy pdx1 build requirements
  if (!decoded || (decoded as any).email !== 'frontdeskllc@outlook.com') {
    return res.status(403).json({ 
      error: 'Access Denied: Administrative Identity Required' 
    });
  }

  try {
    // Check Supabase Connectivity
    const { data, error } = await supabase.from('tenants').select('count');
    
    if (error) throw error;

    return res.status(200).json({
      status: 'healthy',
      node: 'pdx1-portland',
      database: 'connected',
      active_tenants: data,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return res.status(500).json({ status: 'unhealthy', error: err.message });
  }
}
