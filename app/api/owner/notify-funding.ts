import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifyInternalAdmin } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  // Cambiamos el nombre de la variable y la función
  const adminAccess = verifyInternalAdmin(req);
  if (!adminAccess) return res.status(401).json({ error: 'Unauthorized' });

  return res.status(200).json({ status: 'Funding logic operational' });
}
