export async function startSalesCall(customerPhone: string, customerName: string) {
  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'authorization': process.env.BLAND_AI_API_KEY!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: customerPhone,
      from: process.env.NEXT_PUBLIC_ALEX_PHONE_NUMBER,
      task: `Eres ALEX, un ejecutivo de ventas experto. Llama a ${customerName} para ofrecerle nuestros servicios basados en la web que analizamos. Sé persuasivo pero profesional.`,
      voice: "en-US-GuyNeural", // O una voz masculina en español
      wait_for_greeting: true,
      record: true,
      // Pasamos los datos del negocio para que Alex sepa qué vender
      model: "enhanced"
    })
  });

  return await response.json();
}
