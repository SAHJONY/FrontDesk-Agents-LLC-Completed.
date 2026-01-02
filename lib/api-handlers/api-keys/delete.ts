/**
 * FRONTDESK AGENTS — API KEY MANAGEMENT
 * Node: pdx1 Deployment
 * Strategy: Secure Deletion & Admin Override Safety
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing security token' });

    const decoded = verifyJWT(token);

    // FIX: Strict null-check to satisfy pdx1 build engine
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // --- ADMIN ROOT OVERRIDE ---
    // Using type casting to access email and tenant_id safely
    const payload = decoded as any;
    const isAdminRoot = payload.email === 'frontdeskllc@outlook.com';
    
    const tenantId = isAdminRoot 
      ? (req.query.tenant_id as string || payload.tenant_id) 
      : payload.tenant_id;

    const { key_id } = req.body;

    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', key_id)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    return res.status(200).json({ success: true, message: 'Key deleted successfully' });
  } catch (err: any) {
    console.error('API Key Deletion Error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
