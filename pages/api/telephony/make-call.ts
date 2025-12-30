/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * API: Outbound Dispatch Engine (Bland.AI + Supabase)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { verifyJWT } from '@/lib/auth/jwt-verify';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { generateNodePrompt } from '@/lib/ai/bland-config';

const callSchema = z.object({
  toNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid E.164 format'),
  fromPhoneNumberId: z.string().uuid(),
  customPrompt: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    // 1. IDENTITY & TIER VALIDATION
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Identity Required' });

    const { tenant_id, tier } = verifyJWT(token);

    // Gatekeeping: Outbound is reserved for Professional, Growth, and Elite tiers
    if (tier === 'basic') {
      return res.status(403).json({ error: 'Tier Upgrade Required', message: 'Outbound calls require Professional tier or higher.' });
    }

    // 2. SCHEMA VALIDATION
    const { toNumber, fromPhoneNumberId, customPrompt, metadata } = callSchema.parse(req.body);

    // 3. RESOURCE VERIFICATION (Ownership & Status)
    const { data: phone, error: pErr } = await supabase
      .from('phone_numbers')
      .select('phone_number, assigned_node_type, country_code')
      .eq('id', fromPhoneNumberId)
      .eq('tenant_id', tenant_id)
      .single();

    if (pErr || !phone) return res.status(404).json({ error: 'Routing Source Not Found' });

    // 4. PROMPT ASSEMBLY
    // Uses the Hub's specialized templates if no custom prompt is provided
    const taskPrompt = customPrompt || generateNodePrompt(
      phone.assigned_node_type || 'receptionist',
      'The Sovereign Global Hub Client', // Placeholder: would fetch actual company name
      phone.country_code
    );

    // 5. BLAND.AI EXECUTION (The Dispatch)
    const response = await fetch(`${process.env.BLAND_API_URL}/calls`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BLAND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: toNumber,
        from: phone.phone_number,
        task: taskPrompt,
        voice: tier === 'elite' ? 'ryan' : 'maya', // Elite gets the authoritative 'Ryan' voice
        model: 'enhanced',
        record: true,
        voicemail_action: 'hangup', // Standard for business-to-business
        webhook: `${process.env.BLAND_WEBHOOK_BASE_URL}/api/webhooks/telephony`,
        metadata: {
          tenant_id,
          tier,
          node_type: phone.assigned_node_type,
          ...metadata
        }
      }),
    });

    const blandData = await response.json();
    if (!response.ok) throw new Error(blandData.message || 'Bland Dispatch Error');

    // 6. TELEMETRY LOGGING
    await supabase.from('call_logs').insert({
      tenant_id,
      phone_number_id: fromPhoneNumberId,
      twilio_call_sid: blandData.call_id,
      from_number: phone.phone_number,
      to_number: toNumber,
      direction: 'outbound',
      status: 'queued',
      ai_node_type: phone.assigned_node_type,
      metadata: { bland_id: blandData.call_id, tier }
    });

    return res.status(201).json({ success: true, call_id: blandData.call_id });

  } catch (error: any) {
    console.error('[DISPATCH_FAILURE]', error);
    return res.status(error.status || 500).json({ error: error.message });
  }
  }
