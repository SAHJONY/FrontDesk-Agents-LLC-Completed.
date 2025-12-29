export async function provisionWorkforceNode(tenantId: string, tier: string) {
  const response = await fetch('https://api.bland.ai/v1/numbers', {
    method: 'POST',
    headers: { 'authorization': process.env.BLAND_AI_API_KEY! },
    body: JSON.stringify({
      area_code: "415",
      prompt: getPromptByTier(tier),
      voice: "maya", // Professional default
      webhook: `${process.env.NEXT_PUBLIC_API_URL}/api/webhooks/blandai`
    })
  });
  return response.json();
}

function getPromptByTier(tier: string) {
  if (tier === 'elite') return "You are a Priority Revenue Agent. Focus on high-value recovery.";
  return "You are a Professional Receptionist. Qualify leads efficiently.";
}
