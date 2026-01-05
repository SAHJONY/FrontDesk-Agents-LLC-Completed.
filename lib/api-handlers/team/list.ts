import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifyUser } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
	    // OPEN: Any valid tenant can pass this line to see THEIR own data
	    const session = verifyUser(req.headers.authorization);
	
	    // --- SOVEREIGN ROOT ACCESS ---
	    // Detect if the caller is the Root Sovereign.
	    const isSovereignRoot = session.email === 'frontdeskllc@outlook.com';
	    
	    // Root can query ANY tenant_id via params; standard users are locked to their own.
	    const tenantId = isSovereignRoot 
	      ? (req.query.tenant_id as string || session.tenant_id) 
	      : session.tenant_id;
	
	    if (!isSovereignRoot && req.query.tenant_id && req.query.tenant_id !== session.tenant_id) {
	      return res.status(403).json({ error: 'Forbidden: Insufficient Permissions' });
	    }
	    // -------------------------------------------------------
	
	    // Fetch team members with local parity metadata
	    const { data, error } = await supabase
	      .from('team_members') // Keeping the local table name for now
	      .select('*')
	      .eq('tenant_id', tenantId)
	      .order('created_at', { ascending: true });
	
	    if (error) throw error;
	    return res.status(200).json(data);

  } catch (error: any) {
    return res.status(401).json({ error: 'Please log in' });
  }
}
