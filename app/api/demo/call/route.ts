import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Número de teléfono requerido' }, { status: 400 });
    }

    // Llamada a la API de Bland AI
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_AI_API_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phone,
        from: process.env.NEXT_PUBLIC_ALEX_PHONE, // +13465214387
        task: `Eres ALEX de FrontDesk Agents. Llama a este prospecto que acaba de pedir una demo en nuestra web. 
               Salúdalo por su nombre si es posible, dile que eres una IA y que estás llamando para demostrar 
               lo rápido que puedes contactar a nuevos clientes potenciales. 
               Trata de agendar una reunión real para mañana a las 10 AM.`,
        voice: "en-US-GuyNeural", // Voz masculina profesional
        wait_for_greeting: true,
        record: true,
        model: "enhanced"
      })
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, callId: data.call_id });
    } else {
      return NextResponse.json({ error: 'Error al conectar con el agente de voz' }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
