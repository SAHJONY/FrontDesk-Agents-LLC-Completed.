// FrontDesk Agents: Global Revenue Workforce
// API Route: Sovereign Team Removal Logic
// Path: /api/team/remove

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
    const memberId = req.query.id as string;

    // --- SOVEREIGN ROOT OVERRIDE ---
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded.tenant_id) 
      : decoded.tenant_id;

    // Standard owners only manage their own; Root manages all.
    if (!isSovereignRoot && decoded.role !== 'owner') {
      return res.status(403).json({ error: 'Forbidden: Owner level required' });
    }
    // -------------------------------------------------------

    if (!memberId) return res.status(400).json({ error: 'Member ID required' });

    // Protect Sovereign Identity: You cannot decommission yourself.
    if (memberId === decoded.sub) {
      return res.status(400).json({ error: 'Self-decommissioning blocked' });
    }

    // Verify member belongs to the target tenant node
    const { data: member } = await supabase
      .from('users')
      .select('role, tenant_id, email')
      .eq('id', memberId)
      .single();

    if (!member || (!isSovereignRoot && member.tenant_id !== tenantId)) {
      return res.status(404).json({ error: 'Member not found in this node' });
    }

    // Protection: Standard nodes cannot remove the Root account if it's in their team.
    if (member.email === 'frontdeskllc@outlook.com') {
      return res.status(403).json({ error: 'Sovereign Root is immune to removal' });
    }

    // Execute Soft Delete (Deactivation) with Sovereign traceability
    const { error } = await supabase
      .from('users')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString(),
        deactivated_by: decoded.email
      })
      .eq('id', memberId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: 'Agent decommissioned successfully',
      sovereign_action: isSovereignRoot
    });
  } catch (error: any) {
    console.error('Removal error:', error);
    return res.status(500).json({ error: 'Internal system failure' });
  }
}
