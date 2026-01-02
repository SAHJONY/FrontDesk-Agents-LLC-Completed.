import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifyOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST to trigger a new crawl
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 1. Identity Check: Ensure only you (frontdeskllc@outlook.com) can trigger this
    const { tenant_id } = verifyOwner(req.headers.authorization);

    const { targetZipCodes, distressType } = req.body;

    if (!targetZipCodes || targetZipCodes.length === 0) {
      return res.status(400).json({ error: 'Target zip codes required' });
    }

    // 2. Agentic Search Logic (Placeholder for your specific scraping API/Service)
    // This logic replicates a human researcher looking for off-market deals
    const foundLeads = [
      { 
        address: "123 Sovereign Way", 
        owner: "John Doe", 
        equity_est: 0.45, 
        distress_signal: distressType || "Tax Delinquent" 
      }
    ];

    // 3. Batch insert into your Deal Memory
    const leadsWithTenant = foundLeads.map(lead => ({
      ...lead,
      tenant_id: tenant_id,
      status: 'NEW_LEAD',
      source: 'AGENTIC_CRAWLER'
    }));

    const { data, error } = await supabase
      .from('leads')
      .insert(leadsWithTenant)
      .select();

    if (error) throw error;

    return res.status(200).json({
      message: `Agent found ${data.length} potential wholesale deals.`,
      leads: data
    });

  } catch (error: any) {
    console.error('[Sourcing Error]:', error.message);
    return res.status(500).json({ error: 'Sourcing agent failed to initialize' });
  }
}
