import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { leads, businessData } = await req.json();

  // ALEX llama a toda la lista de leads
  const calls = leads.map(async (lead: any) => {
    return fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_AI_API_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: lead.phone,
        from: process.env.NEXT_PUBLIC_ALEX_PHONE,
        task: `Llamada de ventas para ${lead.name}. Vende el servicio de ${businessData.topService}.`,
        voice: "en-US-GuyNeural",
        request_data: {
          customerName: lead.name,
          businessName: businessData.name
        }
      })
    });
  });

  await Promise.all(calls);
  return NextResponse.json({ success: true, message: "Campaña de ALEX iniciada" });
}
