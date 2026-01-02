import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
const jwt = require('jsonwebtoken');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    let decoded: any = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }

    if (!decoded || decoded.email !== 'frontdeskllc@outlook.com') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('tenant_id', decoded.tenant_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return res.status(200).json(data);
  } catch (error: any) { return res.status(500).json({ error: 'Internal Error' }); }
}
