import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
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
    } catch (e) { return res.status(401).json({ error: 'Invalid security token' }); }

    // COMPILER FIX: Explicit Null Guard
    if (!decoded || typeof decoded !== 'object') return res.status(401).json({ error: 'Unauthorized' });

    // OWNER-ONLY CHECK
    if (decoded.email !== 'frontdeskllc@outlook.com') return res.status(403).json({ error: 'Owner access only' });

    const { data, error } = await supabase
      .from('telephony_numbers')
      .select('*')
      .eq('tenant_id', decoded.tenant_id);

    if (error) throw error;
    return res.status(200).json({ numbers: data });
  } catch (error: any) { return res.status(500).json({ error: 'Internal Server Error' }); }
}
