import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
const jwt = require('jsonwebtoken');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    let decoded: any = null;
	    try {
	      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
	    } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }
	
	    if (!decoded) return res.status(401).json({ error: 'Unauthorized' });
	
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
	
	    const { error } = await supabase
	      .from('team_members')
	      .delete()
	      .eq('id', memberId)
	      .eq('tenant_id', tenantId);

    if (error) throw error;
    return res.status(200).json({ success: true });
  } catch (error: any) { return res.status(500).json({ error: 'Removal failed' }); }
}
