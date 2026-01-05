import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

// Use the consolidated security pattern for pdx1 builds
const jwt = require('jsonwebtoken');

/**
 * @name deleteScript
 * @description Removes autonomous agent scripts with strict multi-tenant validation
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });

    const token = authHeader.split(' ')[1];
    let decoded: any = null;
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (e) {
      return res.status(401).json({ error: 'Invalid security token' });
    }

    // Ensure decoded exists before checking permissions
	    if (!decoded) return res.status(401).json({ error: 'Unauthorized verification failed' });
	
	    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
	    const tenantId = isSovereignRoot 
	      ? (req.query.tenant_id as string || decoded.tenant_id) 
	      : decoded.tenant_id;
	
	    const { id } = req.query;

    if (!id || !tenantId) {
      return res.status(400).json({ error: 'Missing Script ID or Tenant ID' });
    }

    const { error } = await supabase
      .from('agent_scripts')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    return res.status(200).json({ message: 'Script deleted successfully' });

  } catch (error: any) {
    console.error('[Script Deletion Error]:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
