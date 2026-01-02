import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util'; // Changed from verifyOwner

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Corrected function call
    const session = verifySovereignOwner(req.headers.authorization);
    
    // Valuation analysis logic...
    return res.status(200).json({ success: true, user: session.email });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
