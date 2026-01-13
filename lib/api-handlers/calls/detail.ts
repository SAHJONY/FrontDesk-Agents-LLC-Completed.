/**
 * FRONTDESK AGENTS — CALL DETAIL RETRIEVAL
 * Node: pdx1 Deployment
 * Strategy: Strict Null-Safety & Admin Override
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing security token' });

    const decoded = verifyJWT(token) as any; if (!decoded) return res.status(401).json({ error: "INVALID_TOKEN" });

    // FIX: Mandatory null-check for pdx1 deployment stability
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // --- ADMIN OVERRIDE LOGIC ---
    // Cast to any to access custom payload properties safely
    const payload = decoded as any;
    const isAdmin = payload.email === 'frontdeskllc@outlook.com';
    
    const tenantId = isAdmin 
      ? (req.query.tenant_id as string || payload.tenant_id) 
      : payload.tenant_id;

    const { call_id } = req.query;

    const { data, error } = await supabase
      .from('call_logs')
      .select('*')
      .eq('id', call_id)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err: any) {
    console.error('Call Detail Error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
