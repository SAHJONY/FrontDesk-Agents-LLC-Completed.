/**
 * FRONTDESK AGENTS — TWILIO PROVISIONING
 * Node: pdx1 Deployment
 * Logic: Securely provisions Twilio numbers with correct type casting
 */

import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from 'next';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { countryCode = 'US', areaCode = '415', tenantId, tier } = req.body;

  try {
    // 1. Validating Tier (Basic: $199, Professional: $399, Growth: $799, Elite: $1,499)
    const validTiers = ['Basic', 'Professional', 'Growth', 'Elite'];
    const activeTier = validTiers.includes(tier) ? tier : 'Basic';

    // 2. TWILIO INVENTORY SEARCH
    // Fix: Type-casting areaCode to Number to satisfy Twilio SDK Overload
    const available = await twilioClient.availablePhoneNumbers(countryCode).local.list({
      areaCode: parseInt(areaCode as string, 10), // This fixes the 'string to number' build error
      limit: 1,
    });

    if (!available || available.length === 0) {
      return res.status(404).json({ error: 'No numbers found for this area code.' });
    }

    // 3. PURCHASE & ATTRIBUTION
    const purchased = await twilioClient.incomingPhoneNumbers.create({
      phoneNumber: available[0].phoneNumber,
      friendlyName: `FrontDesk Agent - ${tenantId}`,
      // Attributing metadata for Global Financial Hub tracking
      identitySid: tenantId 
    });

    return res.status(201).json({
      success: true,
      phoneNumber: purchased.phoneNumber,
      sid: purchased.sid,
      tier: activeTier
    });
  } catch (err: any) {
    console.error('Twilio Provisioning Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
