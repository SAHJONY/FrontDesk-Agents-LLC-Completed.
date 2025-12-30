import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth/jwt-verify';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = verifyJWT(token!);
    const isSovereign = decoded.email === 'frontdeskllc@outlook.com';
    const tenantId = isSovereign ? (req.body.tenant_id || decoded.tenant_id) : decoded.tenant_id;

    const { data, error } = await supabase
      .from('conversion_scripts')
      .insert([{ ...req.body, tenant_id: tenantId }])
      .select();

    if (error) throw error;
    return res.status(201).json({ script: data[0], is_exempt_action: isSovereign });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
