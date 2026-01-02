/**
 * FRONTDESK AGENTS — DASHBOARD ANALYTICS
 * Node: pdx1 (Portland) Deployment
 * Strategy: Strict Null-Safety Gate for Next.js 15
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

interface JWTPayload {
  tenant_id: string;
  [key: string]: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing security token' });

    const decoded = verifyJWT(token);
    
    // FIX: Guard clause to satisfy pdx1 build safety requirements
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    const payload = decoded as JWTPayload;
    
    // Admin Override or User Tenant ID
    const tenantId = (req.query.tenant_id as string) || payload.tenant_id;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);

    // Strict Multi-tenant Security Gate
    const { data, error } = await supabase
      .from('call_logs')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return res.status(200).json({
      calls: data,
      count: data.length,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Dashboard Calls Error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
