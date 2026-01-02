/**
 * FRONTDESK AGENTS — TELEPHONY PROVISIONING
 * Node: pdx1 Deployment
 * Strategy: Secure Node Attribution
 */

export async function provisionWorkforceNode(tenantId: string, tier: string) {
  // We utilize 'tenantId' in the request body to satisfy the TS compiler
  // and ensure every phone number is mapped to a customer account.
  const response = await fetch('https://api.bland.ai/v1/numbers', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'authorization': process.env.BLAND_AI_API_KEY! 
    },
    body: JSON.stringify({
      area_code: "415", 
      metadata: {
        tenant_id: tenantId, // Variable is now read and used
        tier: tier,
        platform: "FrontDesk Agents"
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Telephony Error: ${errorData.message || response.statusText}`);
  }

  return response.json();
}
