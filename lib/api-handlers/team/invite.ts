import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, role, tenant_id } = req.body;

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { role, tenant_id },
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/setup-password`
  });

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ message: 'Sovereign invite sent successfully' });
}
