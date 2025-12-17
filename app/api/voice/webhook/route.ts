import { createVoicePrompt } from '@/lib/ai/agent-factory';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const { callId, businessId } = await req.json();

  // 1. Buscamos la configuración que el crawler generó automáticamente
  const config = await db.businessConfig.findUnique({
    where: { id: businessId }
  });

  // 2. Generamos el prompt de voz en milisegundos
  const dynamicPrompt = createVoicePrompt(config);

  // 3. Enviamos las instrucciones al proveedor de Voz AI
  // Ejemplo con una API genérica de Voz:
  await fetch('https://api.voice-provider.com/v1/update-agent', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${process.env.VOICE_API_KEY}` },
    body: JSON.stringify({
      call_id: callId,
      system_prompt: dynamicPrompt
    })
  });

  return Response.json({ status: "Agent Ready" });
}
