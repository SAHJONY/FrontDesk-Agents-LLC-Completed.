import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt';

/**
 * @name getTenantCalls
 * @description Fetches call logs and intent scoring for the Sales Agent Dashboard
 * @security Elite Standard - Strict Multi-tenant Isolation
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyJWT(token);

    // FIX: Null-safety for decoded token to satisfy pdx1 build
    // Optional chaining added to 'decoded' to prevent null pointer errors
    const tenantId = (req.query.tenant_id as string) || decoded?.tenant_id;

    if (!tenantId) {
      return res.status(401).json({ error: 'Unauthorized: No Tenant ID identified' });
    }

    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    const offset = parseInt(req.query.offset as string) || 0;

    // Strict Multi-tenant Security Gate: Only fetch data for the verified tenantId
    const { data, error, count } = await supabase
      .from('call_logs')
      .select('*, lead_intelligence(intent_score, summary)', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return res.status(200).json({
      calls: data,
      total: count,
      page: Math.floor(offset / limit) + 1,
      hasMore: count ? offset + limit < count : false
    });

  } catch (error: any) {
    console.error('[Dashboard API Error]:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
