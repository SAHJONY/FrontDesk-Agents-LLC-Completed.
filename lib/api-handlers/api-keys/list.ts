// FrontDesk Agents: Global Revenue Workforce
// API Route: Sovereign API Key Audit
// Path: /api/api-keys/list

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth/jwt-verify';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verifyJWT(token);
    
    // --- SOVEREIGN ROOT ACCESS ---
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded.tenant_id) 
      : decoded.tenant_id;

    if (!isSovereignRoot && req.query.tenant_id && req.query.tenant_id !== decoded.tenant_id) {
      return res.status(403).json({ error: 'Forbidden: Sovereignty Required' });
    }
    // -------------------------------------------------------

    // Fetch API keys with usage tracking for the 15% fee engine
    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('id, name, key_prefix, last_used, created_at, expires_at, provider')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) {
      // If table doesn't exist yet, return empty list rather than 500
      if (error.code === 'PGRST116' || error.message.includes('not found')) {
        return res.status(200).json({ keys: [], sovereign_view: isSovereignRoot });
      }
      throw error;
    }

    return res.status(200).json({ 
      keys, 
      sovereign_view: isSovereignRoot,
      billing_status: isSovereignRoot ? 'EXEMPT' : 'ACTIVE'
    });
  } catch (error: any) {
    console.error('List API keys error:', error);
    return res.status(500).json({ error: 'Failed to fetch API keys' });
  }
}
