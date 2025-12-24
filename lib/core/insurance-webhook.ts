export async function handleInsuranceReferral(callData: any) {
  const { damageEstimate, insuranceCarrier, leadDetails } = callData;

  // Threshold: Only refer claims estimated over $10,000
  if (damageEstimate < 10000) return;

  const payload = {
    type: "FIRST_NOTICE_OF_LOSS",
    priority: "URGENT",
    estimated_claim: damageEstimate,
    carrier: insuranceCarrier,
    customer: {
      name: leadDetails.name,
      phone: leadDetails.phone,
      address: leadDetails.address
    },
    system_origin: "Sovereign_HQ_Texas_Triangle"
  };

  // Dispatch to Partner Endpoint (Restoration Franchise or Public Adjuster)
  const response = await fetch(process.env.INSURANCE_PARTNER_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Sovereign-Key': process.env.INTERNAL_AUTH_KEY! },
    body: JSON.stringify(payload),
  });

  return response.ok;
}
