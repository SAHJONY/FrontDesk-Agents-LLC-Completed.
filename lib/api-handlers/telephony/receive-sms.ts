import { NextApiRequest, NextApiResponse } from 'next';
import { verifySovereignOwner } from '@/lib/auth-util'; // Updated name

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Corrected function call
    const session = verifySovereignOwner(req.headers.authorization);
    
    // Logic for receiving SMS...
    return res.status(200).json({ success: true, owner: session.email });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
