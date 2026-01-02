import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifyUser } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // OPEN: Any valid tenant can pass this line to see THEIR own data
    const session = verifyUser(req.headers.authorization);

    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('tenant_id', session.tenant_id);

    if (error) throw error;
    return res.status(200).json(data);

  } catch (error: any) {
    return res.status(401).json({ error: 'Please log in' });
  }
}
