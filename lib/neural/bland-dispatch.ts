export async function dispatchNeuralSwarm(phoneNumber: string, leadName: string) {
  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'authorization': process.env.BLAND_AI_API_KEY as string,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
      task: `You are Alex, a senior executive at FrontDesk Agents. 
             Your goal is to introduce our Neural Infrastructure to ${leadName}. 
             Be professional, authoritative, and use a standard American accent. 
             If they ask about security, mention our Zero-Knowledge architecture.`,
      voice: "nat", // High-fidelity American Male
      model: "enhanced",
      wait_for_greeting: true,
      record: true,
      interruption_threshold: 100, // Minimal latency for elite performance
      language: "en-US"
    })
  });

  return await response.json();
}
