import type { NextApiRequest, NextApiResponse } from 'next';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    verifySovereignOwner(req.headers.authorization);
    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
}
