/**
 * FRONTDESK AGENTS — API KEY RETRIEVAL
 * Node: pdx1 Deployment
 * Strategy: Strict Null-Safety & Admin Scoping
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing security token' });

    const decoded = verifyJWT(token);

    // FIX: Guard clause for pdx1 null-safety
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // --- ADMIN ACCESS LOGIC ---
    const payload = decoded as any;
    const isAdmin = payload.email === 'frontdeskllc@outlook.com';
    
    // If admin, can view specific tenant via query, otherwise restricted to own tenant_id
    const tenantId = isAdmin 
      ? (req.query.tenant_id as string || payload.tenant_id) 
      : payload.tenant_id;

    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, last_four, created_at, status')
      .eq('tenant_id', tenantId);

    if (error) throw error;

    return res.status(200).json({ keys: data });
  } catch (err: any) {
    console.error('API Key List Error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
