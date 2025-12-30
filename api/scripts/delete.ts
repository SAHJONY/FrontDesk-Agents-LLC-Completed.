// FrontDesk Agents: Global Revenue Workforce
// API Route: Sovereign Delete Conversion Script
// Path: /api/scripts/delete

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
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyJWT(token);
    const scriptId = req.query.id as string;

    // --- SOVEREIGN ROOT BYPASS ---
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded.tenant_id) 
      : decoded.tenant_id;

    if (!isSovereignRoot && !['owner', 'admin'].includes(decoded.role)) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'Only owners and admins can delete scripts'
      });
    }
    // -------------------------------------------------------

    if (!scriptId) {
      return res.status(400).json({ error: 'Script ID is required' });
    }

    // Safety Check: Check if script is in use in active calls
    const { count: activeUsage } = await supabase
      .from('call_logs')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('metadata->>script_id', scriptId)
      .eq('status', 'in-progress');

    if (activeUsage && activeUsage > 0) {
      return res.status(400).json({ 
        error: 'Script in use',
        message: 'Cannot delete script while it is being used in active calls'
      });
    }

    // Safety Check: Check if script is assigned to active campaigns
    const { count: campaignUsage } = await supabase
      .from('outbound_campaigns')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('script_id', scriptId)
      .in('status', ['active', 'paused']);

    if (campaignUsage && campaignUsage > 0) {
      return res.status(400).json({ 
        error: 'Script in use',
        message: 'Cannot delete script while assigned to active or paused campaigns'
      });
    }

    // Delete script with Sovereign override
    const { error } = await supabase
      .from('conversion_scripts')
      .delete()
      .eq('id', scriptId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: 'Script deleted successfully',
      sovereign_override: isSovereignRoot
    });
  } catch (error: any) {
    console.error('Delete script error:', error);
    return res.status(500).json({ 
      error: 'Failed to delete script',
      message: error.message 
    });
  }
}
