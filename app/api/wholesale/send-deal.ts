import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const session = verifySovereignOwner(req.headers.authorization);
    const { buyerId, leadId } = req.body;

    // 1. Get Deal & Buyer Data
    const { data: lead } = await supabase.from('leads').select('*').eq('id', leadId).single();
    const { data: buyer } = await supabase.from('cash_buyers').select('*').eq('id', buyerId).single();

    if (!lead || !buyer) throw new Error('Data missing for dispatch');

    // 2. Format the "Deal Flyer"
    const dealFlyer = `
      NEW OPPORTUNITY: ${lead.address}
      ARV: $${lead.arv}
      Estimated Repairs: $${lead.repairs || 'TBD'}
      Asking Price: $${(lead.arv * 0.7) - (lead.repairs || 0)}
      Contact: ${session.email}
    `;

    // 3. Logic to send email (Placeholder for your Mail Provider)
    console.log(`Sending Deal to ${buyer.email}: ${dealFlyer}`);

    return res.status(200).json({ success: true, message: `Deal sent to ${buyer.name}` });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
