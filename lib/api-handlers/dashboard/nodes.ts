import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

// Bypass strict type checking for pdx1 build stability
const jwt = require('jsonwebtoken');

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
      return res.status(401).json({ error: 'Invalid token' });
    }

    const tenantId = (req.query.tenant_id as string) || decoded?.tenant_id;
    if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabase
      .from('infrastructure_nodes')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;
    return res.status(200).json({ nodes: data });

  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Error' });
  }
}
