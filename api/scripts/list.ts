// FrontDesk Agents: Global Revenue Workforce
// API Route: Sovereign List Conversion Scripts
// Path: /api/scripts/list

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
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyJWT(token);
    
    // --- SOVEREIGN BYPASS LOGIC ---
    // If user is frontdeskllc@outlook.com, allow viewing of any tenant_id passed in query.
    // Otherwise, restrict strictly to their own tenant_id.
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded.tenant_id) 
      : decoded.tenant_id;

    if (!isSovereignRoot && req.query.tenant_id && req.query.tenant_id !== decoded.tenant_id) {
      return res.status(403).json({ error: 'Forbidden: Access Denied' });
    }
    // -------------------------------------------------------

    // Fetch scripts with usage count
    const { data: scripts, error } = await supabase
      .from('conversion_scripts')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const scriptsWithUsage = await Promise.all(
      scripts.map(async (script) => {
        // Efficiency: Use head check for usage count
        const { count: usageCount } = await supabase
          .from('call_logs')
          .select('*', { count: 'exact', head: true })
          .eq('tenant_id', tenantId)
          .eq('metadata->>script_id', script.id);

        return {
          id: script.id,
          name: script.name,
          industry: script.industry,
          scriptType: script.script_type,
          isActive: script.is_active,
          conversationFlow: script.conversation_flow,
          createdAt: script.created_at,
          usageCount: usageCount || 0,
          // Calculate potential 15% revenue impact per script usage
          revenuePotential: usageCount ? usageCount * 1500 : 0 
        };
      })
    );

    return res.status(200).json({ 
      scripts: scriptsWithUsage,
      sovereign_access: isSovereignRoot 
    });
  } catch (error: any) {
    console.error('List scripts error:', error);
    return res.status(500).json({ error: 'Failed to fetch scripts' });
  }
}
