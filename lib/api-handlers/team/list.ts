import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

// Hardened security pattern for pdx1 build environment
const jwt = require('jsonwebtoken');

/**
 * @name listTeamMembers
 * @description Retrieves the local workforce for a specific tenant
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

    // CRITICAL FIX: Explicit null check for the compiler
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized: Verification failed' });
    }

    // Admin override for global oversight
    const isSovereignRoot = decoded.email === 'frontdeskllc@outlook.com';
    
    // Using optional chaining ?. for extra safety
    const tenantId = isSovereignRoot 
      ? (req.query.tenant_id as string || decoded?.tenant_id) 
      : decoded?.tenant_id;

    if (!tenantId) return res.status(401).json({ error: 'Tenant ID required' });

    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('name', { ascending: true });

    if (error) throw error;

    return res.status(200).json(data);

  } catch (error: any) {
    console.error('[Team List Error]:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
