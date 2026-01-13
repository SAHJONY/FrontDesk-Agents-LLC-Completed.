import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
const jwt = require('jsonwebtoken');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }

    let decoded: any = null;
    try {
      // Use the JWT_SECRET from environment variables
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (e) {
      return res.status(401).json({ error: 'Invalid security token' });
    }

    // COMPILER FIX: Explicit Null Guard
    if (!decoded || typeof decoded !== 'object') return res.status(401).json({ error: 'Unauthorized' });

    // OWNER-ONLY CHECK (Keeping this for now as it was in the original code)
    if (decoded.email !== 'frontdeskllc@outlook.com') return res.status(403).json({ error: 'Owner access only' });

    const tenantId = decoded.tenant_id;

    const { data, error } = await supabase
      .from('telephony_numbers')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;
    return res.status(200).json({ numbers: data });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
