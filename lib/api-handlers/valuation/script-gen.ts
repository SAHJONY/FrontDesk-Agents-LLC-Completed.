import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // PROTECTED: Sovereign Gate
    const session = verifySovereignOwner(req.headers.authorization);
    
    const { leadId } = req.body;

    // 1. Fetch Lead & Valuation Data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*, valuation_data(*)')
      .eq('id', leadId)
      .eq('tenant_id', session.tenant_id)
      .single();

    if (leadError || !lead) throw new Error('Lead data not found for scripting');

    // 2. Dynamic Script Generation Logic
    const script = {
      opening: `Hello ${lead.owner_name}, I'm an AI assistant for ${session.email}. I'm calling about the property at ${lead.address}.`,
      hook: `We noticed this property might be in ${lead.distress_signal} status, and we are looking to make a cash offer in your area.`,
      offer_basis: `Based on our analysis, we see an After Repair Value of $${lead.arv}.`,
      closing: `Would you be open to a formal offer around $${lead.mao}?`
    };

    // 3. Save Script to Deal Memory
    await supabase
      .from('call_scripts')
      .insert([{
        lead_id: leadId,
        tenant_id: session.tenant_id,
        content: script,
        version: '1.0-sovereign'
      }]);

    return res.status(200).json({ success: true, script });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
