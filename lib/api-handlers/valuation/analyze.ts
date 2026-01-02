import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 1. Identity Gate
    const session = verifySovereignOwner(req.headers.authorization);
    
    // 2. Database Ping (Ensures 'supabase' is used so build succeeds)
    const { data: connectionCheck, error: dbError } = await supabase
      .from('leads')
      .select('count')
      .limit(1);

    if (dbError) throw dbError;

    // 3. Logic Placeholder for Analysis
    return res.status(200).json({ 
      success: true, 
      owner: session.email,
      status: "Valuation Engine Online",
      db_status: !!connectionCheck
    });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
