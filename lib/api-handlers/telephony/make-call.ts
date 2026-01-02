import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifyOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // One line replaces the entire security block
    const { tenant_id } = verifyOwner(req.headers.authorization);

    const { phoneNumber, scriptId } = req.body;
    if (!phoneNumber) return res.status(400).json({ error: 'Phone number required' });

    // Execute call logic
    return res.status(200).json({ success: true, message: 'Call initiated' });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}
