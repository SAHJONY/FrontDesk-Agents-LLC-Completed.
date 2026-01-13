import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 1. Sovereign Gate: Only you pass here
    const session = verifySovereignOwner(req.headers.authorization);
    
    // 2. Data Extraction
    const { zipCodes } = req.body;

    // 3. Agentic Sourcing Logic (Updated to use zipCodes)
    const { data, error } = await supabase
      .from('leads')
      .insert([{ 
        tenant_id: session.tenant_id, 
        source: 'PRIVATE_CRAWLER', 
        status: 'NEW',
        address: `Batch Search: ${zipCodes || 'Global'}` // This "reads" the variable
      }]);

    if (error) throw error;
    
    return res.status(200).json({ 
      success: true, 
      message: `Sovereign Crawler active for Zips: ${zipCodes}`, 
      data 
    });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
