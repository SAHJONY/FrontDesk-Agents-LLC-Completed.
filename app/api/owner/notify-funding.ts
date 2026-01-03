export const runtime = 'nodejs';

import { NextApiRequest, NextApiResponse } from 'next';
import { verifyInternalAdmin } from '@/lib/auth-util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    verifyInternalAdmin(req.headers.authorization);
    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(401).json({ error: e.message });
  }
}
