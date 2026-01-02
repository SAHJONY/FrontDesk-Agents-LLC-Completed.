/**
 * FRONTDESK AGENTS — TELEPHONY PROVISIONING
 * Node: pdx1 Deployment
 * Logic: Provisions autonomous voice nodes with tenant-safe metadata
 */

export async function provisionWorkforceNode(tenantId: string, tier: string) {
  // We pass tenantId in the metadata to ensure the linter sees it being used
  const response = await fetch('https://api.bland.ai/v1/numbers', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'authorization': process.env.BLAND_AI_API_KEY! 
    },
    body: JSON.stringify({
      area_code: "415", // Defaulting to San Francisco area code for global prestige
      metadata: {
        tenantId: tenantId, // Using the variable here fixes the build error
        service_tier: tier,
        platform: "FrontDesk Agents"
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Telephony provisioning failed: ${response.statusText}`);
  }

  return response.json();
}
