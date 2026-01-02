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

    if (!decoded || decoded.email !== 'frontdeskllc@outlook.com') {
      return res.status(403).json({ error: 'Sovereign Owner Access Required' });
    }

    const { id } = req.query;
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
      .eq('tenant_id', decoded.tenant_id);

    if (error) throw error;
    return res.status(200).json({ success: true });
  } catch (error: any) { return res.status(500).json({ error: 'Removal failed' }); }
}
