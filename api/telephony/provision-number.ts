/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * API: Workforce Provisioning (Bland.AI + Sovereign Ledger)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { verifyJWT } from '@/lib/auth/jwt-verify';
import { supabaseServer as supabase } from '@/lib/supabase/client';

const provisionSchema = z.object({
  countryCode: z.string().length(2).toUpperCase(),
  areaCode: z.string().optional(),
  nodeType: z.enum(['receptionist', 'qualification', 'scaling', 'priority', 'legal_agent']),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    // 1. IDENTITY & AUTHORITY CHECK
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Authentication Required' });

    const { tenant_id, role, tier } = verifyJWT(token);

    if (!['owner', 'admin'].includes(role)) {
      return res.status(403).json({ error: 'Administrative Authority Required' });
    }

    // 2. TIER-BASED FLEET SCALING
    const { data: existing } = await supabase
      .from('phone_numbers')
      .select('id')
      .eq('tenant_id', tenant_id)
      .eq('status', 'active');

    const maxNodes = { basic: 1, professional: 3, growth: 10, elite: 1000 }[tier] || 1;
    
    if (existing && existing.length >= maxNodes) {
      return res.status(403).json({ 
        error: 'Fleet Limit Reached', 
        message: `Your ${tier} plan is capped at ${maxNodes} nodes. Upgrade for additional capacity.` 
      });
    }

    // 3. VALIDATION
    const { countryCode, areaCode, nodeType } = provisionSchema.parse(req.body);

    // 4. BLAND.AI PROVISIONING (The Capital Expense)
    const blandResponse = await fetch(`${process.env.BLAND_API_URL}/phone-numbers/purchase`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BLAND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country_code: countryCode,
        area_code: areaCode,
        webhook_url: `${process.env.BLAND_WEBHOOK_BASE_URL}/api/webhooks/blandai`,
        metadata: { tenant_id, node_type: nodeType }
      }),
    });

    const blandData = await blandResponse.json();
    if (!blandResponse.ok) throw new Error(blandData.message || 'Bland Purchase Failed');

    // 5. SOVEREIGN LEDGER SYNC
    const { data: node, error: dbError } = await supabase
      .from('phone_numbers')
      .insert({
        tenant_id,
        twilio_sid: blandData.phone_number_id, // Mapping Bland ID to SID for architectural consistency
        phone_number: blandData.phone_number,
        country_code: countryCode,
        status: 'active',
        assigned_node_type: nodeType,
        metadata: { bland_id: blandData.phone_number_id, tier }
      })
      .select()
      .single();

    // ROLLBACK PROTECTION: Release number if database fails to log it
    if (dbError) {
      await fetch(`${process.env.BLAND_API_URL}/phone-numbers/${blandData.phone_number_id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${process.env.BLAND_API_KEY}` },
      });
      throw new Error(`Ledger Sync Failure: ${dbError.message}`);
    }

    return res.status(201).json({ success: true, node });

  } catch (error: any) {
    console.error('[PROVISION_ERROR]', error);
    return res.status(500).json({ error: error.message });
  }
}
