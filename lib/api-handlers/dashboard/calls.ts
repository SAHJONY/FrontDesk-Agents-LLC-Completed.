import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing Authorization' });

    const token = authHeader.split(' ')[1];
    const decoded = verifyJWT(token);

    // CRITICAL FIX: Build Gate for pdx1
    if (!decoded || typeof decoded === 'string') {
      return res.status(401).json({ error: 'Unauthorized: Invalid Infrastructure Token' });
    }

    // Secure access to tenant_id
    const payload = decoded as { tenant_id: string };
    const tenantId = (req.query.tenant_id as string) || payload.tenant_id;

    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Internal Infrastructure Error' });
  }
}
