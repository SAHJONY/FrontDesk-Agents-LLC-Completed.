// FrontDesk Agents: Global Revenue Workforce
// API Route: Sovereign Key Revocation
// Path: /api/api-keys/delete

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
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verifyJWT(token);
    const keyId = req.query.id as string;

    // --- SOVEREIGN ROOT OVERRIDE ---
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded.tenant_id) 
      : decoded.tenant_id;

    if (!isSovereignRoot && !['owner', 'admin'].includes(decoded.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient Authority' });
    }
    // -------------------------------------------------------

    if (!keyId) return res.status(400).json({ error: 'API key ID required' });

    // Execute deletion within the targeted tenant node
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', keyId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: 'Secret decommissioned successfully',
      sovereign_override: isSovereignRoot,
      target_node: tenantId
    });
  } catch (error: any) {
    console.error('Revocation error:', error);
    return res.status(500).json({ error: 'Failed to decommission secret' });
  }
}
