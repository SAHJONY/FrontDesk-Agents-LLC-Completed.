import { NextApiRequest, NextApiResponse } from 'next';
import { verifyOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    verifyOwner(req.headers.authorization);
    // SMS handling logic for owner only
    return res.status(200).json({ status: 'ok' });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}
