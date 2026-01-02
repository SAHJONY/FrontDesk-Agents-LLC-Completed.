import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // PROTECTED: Only frontdeskllc@outlook.com can pass this line
    const session = verifySovereignOwner(req.headers.authorization);
    
    const { zipCodes } = req.body;

    // Agentic sourcing logic...
    const { data, error } = await supabase
      .from('leads')
      .insert([{ tenant_id: session.tenant_id, source: 'PRIVATE_CRAWLER', status: 'NEW' }]);

    if (error) throw error;
    return res.status(200).json({ success: true, message: "Sovereign Crawler active", data });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
