/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Secondary Infrastructure: Twilio Number Provisioning (Fallback/SMS)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { z } from 'zod';
import { verifyJWT } from '@/lib/auth/jwt-verify';
import { supabaseServer as supabase } from '@/lib/supabase/client';

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const provisionSchema = z.object({
  countryCode: z.string().length(2).toUpperCase(),
  areaCode: z.string().optional(),
  nodeType: z.enum(['receptionist', 'qualification', 'scaling', 'priority']),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    // 1. IDENTITY & AUTHORITY (Elite-Grade Security)
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Auth Required' });

    const { tenant_id, role, tier } = verifyJWT(token);
    if (!['owner', 'admin'].includes(role)) return res.status(403).json({ error: 'Admin access required' });

    // 2. FLEET CAPACITY CHECK [cite: 2025-12-28]
    const { data: existing } = await supabase
      .from('phone_numbers')
      .select('id')
      .eq('tenant_id', tenant_id)
      .eq('status', 'active');

    const maxNodes = { basic: 1, professional: 3, growth: 10, elite: 1000 }[tier] || 1;
    if (existing && existing.length >= maxNodes) {
      return res.status(403).json({ error: 'Fleet Cap Reached', message: `Upgrade from ${tier} for more nodes.` });
    }

    const { countryCode, areaCode, nodeType } = provisionSchema.parse(req.body);

    // 3. TWILIO INVENTORY SEARCH
    const available = await twilioClient.availablePhoneNumbers(countryCode).local.list({
      areaCode,
      limit: 1,
    });

    if (!available.length) return res.status(404).json({ error: 'No localized inventory available.' });

    // 4. THE ACQUISITION
    const purchased = await twilioClient.incomingPhoneNumbers.create({
      phoneNumber: available[0].phoneNumber,
      voiceUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/telephony/twiml-callback`,
      smsUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/telephony/sms-callback`,
    });

    // 5. SOVEREIGN LEDGER SYNC
    const { data: node, error: dbError } = await supabase
      .from('phone_numbers')
      .insert({
        tenant_id,
        twilio_sid: purchased.sid,
        phone_number: purchased.phoneNumber,
        country_code: countryCode,
        status: 'active',
        assigned_node_type: nodeType,
        capabilities: { voice: true, sms: true, ai_powered: false }, // Tagged as non-AI fallback
        metadata: { provider: 'twilio', tier }
      })
      .select().single();

    // ROLLBACK PROTECTION
    if (dbError) {
      await twilioClient.incomingPhoneNumbers(purchased.sid).remove();
      throw dbError;
    }

    return res.status(201).json({ success: true, node });

  } catch (error: any) {
    console.error('[TWILIO_PROVISION_FAILURE]', error);
    return res.status(500).json({ error: error.message });
  }
}
