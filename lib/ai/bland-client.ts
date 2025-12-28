export async function triggerSovereignCall(phoneNumber: string, businessName: string) {
  // Use the exact key name from your Vercel screenshot
  const apiKey = process.env.BLAND_AI_API_KEY;

  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'authorization': apiKey as string,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
      task: `Establish a neural link for ${businessName}. Conduct a voice quality audit.`,
      voice: 'nat',
      request_data: {
        business: businessName
      }
    })
  });

  const result = await response.json();
  console.log("Bland Trace:", result);
  return result;
}
