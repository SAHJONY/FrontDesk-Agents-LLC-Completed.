import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createVoicePrompt } from '@/lib/ai/agent-factory';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Bland AI o Vapi envían el número al que llamaron (to) o un businessId
    const { from, to, call_id } = body;

    // 1. Buscamos el negocio en la DB usando el número de teléfono
    const business = await db.businessConfig.findFirst({
      where: { phoneNumber: to } 
    });

    if (!business) {
      return NextResponse.json({ 
        answer: "Hola, gracias por llamar. Por el momento no puedo identificar este negocio. Adiós." 
      });
    }

    // 2. Generamos el prompt dinámico con los datos del CRAWLER
    const dynamicPrompt = createVoicePrompt(business);

    // 3. Respondemos al proveedor de voz con las instrucciones
    return NextResponse.json({
      instructions: dynamicPrompt,
      voice: "en-US-JennyNeural", // Puedes cambiarla por voces en español
      wait_for_greeting: true,
      interruption_threshold: 100, // Sensibilidad para cuando el humano interrumpe
      model: "enhanced",
      record: true // Guardar audio para tu Dashboard
    });

  } catch (error) {
    console.error("Voice Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
