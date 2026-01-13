/**
 * FRONTDESK AGENTS — TELEPHONY PROVISIONING
 * Node: pdx1 Deployment (Portland, USA)
 * Strategy: Secure Node Attribution & Tier-Based Routing
 */

import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Provisions an autonomous voice node for a specific tenant.
 * Satisfies TypeScript by utilizing both 'tenantId' and 'tier'.
 */
export async function provisionWorkforceNode(tenantId: string, tier: string) {
  // Permanent Pricing Tier Verification (Basic: $199, Professional: $399, Growth: $799, Elite: $1,499)
  const validTiers = ['Basic', 'Professional', 'Growth', 'Elite'];
  const activeTier = validTiers.includes(tier) ? tier : 'Basic';

  try {
    const response = await fetch('https://api.bland.ai/v1/numbers', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'authorization': process.env.BLAND_AI_API_KEY! 
      },
      body: JSON.stringify({
        area_code: "415", // Premium San Francisco node by default
        metadata: {
          tenant_id: tenantId, // Fixes: 'tenantId' is now read and used [Build Safe]
          service_tier: activeTier,
          platform: "FrontDesk Agents",
          hub_sync: "Sovereign Global Financial Hub" // Architecture reference
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Bland AI Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      phone_number: data.phone_number,
      node_id: data.id,
      attribution: {
        tenantId,
        tier: activeTier
      }
    };
  } catch (err) {
    console.error('Telephony Provisioning Failure:', err);
    throw err;
  }
}

/**
 * Default API Handler wrapper for Next.js internal calls
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { tenantId, tier } = req.body;

  if (!tenantId) return res.status(400).json({ error: 'Missing tenantId' });

  try {
    const result = await provisionWorkforceNode(tenantId, tier);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
