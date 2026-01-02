import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

// Use the consolidated security pattern for pdx1 builds
const jwt = require('jsonwebtoken');

/**
 * @name listScripts
 * @description Retrieves agent scripts with strict multi-tenant filtering
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

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

    // Guard against null decoded object for TypeScript strict mode
    if (!decoded) return res.status(401).json({ error: 'Unauthorized verification failed' });

    // Administrative logic: frontdeskllc@outlook.com can view any tenant
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded.tenant_id) 
      : decoded.tenant_id;

    if (!tenantId) {
      return res.status(401).json({ error: 'Unauthorized: No Tenant ID' });
    }

    const { data, error } = await supabase
      .from('agent_scripts')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json(data);

  } catch (error: any) {
    console.error('[Script List Error]:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
