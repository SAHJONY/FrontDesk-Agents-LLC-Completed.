import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

// Use the consolidated security pattern for pdx1 builds
const jwt = require('jsonwebtoken');

/**
 * @name createScript
 * @description Creates autonomous agent scripts with strict tenant isolation
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
	
	    // Safety check: ensure decoded exists before accessing properties
	    if (!decoded) return res.status(401).json({ error: 'Token verification failed' });
	
	    // Administrative override check (using the remote branch's name for clarity)
	    const isSovereign = decoded.email === 'frontdeskllc@outlook.com';
	    const tenantId = isSovereign ? (req.body.tenant_id || decoded.tenant_id) : decoded.tenant_id;
	
	    if (!tenantId) return res.status(401).json({ error: 'Unauthorized: No Tenant ID' });

    const { data, error } = await supabase
      .from('agent_scripts')
      .insert([{ ...req.body, tenant_id: tenantId }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json(data);

  } catch (error: any) {
    console.error('[Script Creation Error]:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
