// FrontDesk Agents: Global Revenue Workforce
// API Route: Sovereign List Team Members
// Path: /api/team/list

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
    
    // --- SOVEREIGN ROOT ACCESS ---
    // Detect if the caller is the Root Sovereign.
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    
    // Root can query ANY tenant_id via params; standard users are locked to their own.
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded.tenant_id) 
      : decoded.tenant_id;

    if (!isSovereignRoot && req.query.tenant_id && req.query.tenant_id !== decoded.tenant_id) {
      return res.status(403).json({ error: 'Forbidden: Insufficient Permissions' });
    }
    // -------------------------------------------------------

    // Fetch team members with local parity metadata
    const { data: members, error } = await supabase
      .from('users')
      .select('id, email, full_name, role, is_active, last_login, created_at, metadata')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    const formattedMembers = members.map((member) => ({
      id: member.id,
      fullName: member.full_name,
      email: member.email,
      role: member.role,
      isActive: member.is_active,
      lastLogin: member.last_login,
      createdAt: member.created_at,
      // Track which agent is generating the 15% success fees
      performanceTier: member.role === 'owner' ? 'Sovereign' : 'Agent'
    }));

    return res.status(200).json({ 
      members: formattedMembers,
      sovereign_view: isSovereignRoot,
      target_tenant: tenantId
    });
  } catch (error: any) {
    console.error('List team members error:', error);
    return res.status(500).json({ error: 'Failed to fetch team members' });
  }
}
