// app/api/onboarding/auto-configure/route.ts
export async function POST(req: Request) {
  const { url } = await req.json();

  // Paso 1: Ir al sitio web
  const webText = await scrapeBusinessWebsite(url);

  // Paso 2: Usar IA para extraer especificaciones
  const specs = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "system", content: SYNTHESIS_PROMPT }, { role: "user", content: webText }]
  });

  const businessInfo = JSON.parse(specs.choices[0].message.content);

  // Paso 3: Configurar el Agente Autónomamente
  const finalPrompt = `
    Eres el Recepcionista de ${businessInfo.name}. 
    Tus servicios son: ${businessInfo.services.join(', ')}.
    Tu horario es: ${businessInfo.hours}.
    Responde con un tono ${businessInfo.brandTone}.
  `;

  // Paso 4: Guardar en la DB y Activar
  await db.aiAgent.upsert({
    where: { website: url },
    update: { config: finalPrompt, status: 'READY' },
    create: { website: url, config: finalPrompt, status: 'READY' }
  });

  return Response.json({ success: true, profile: businessInfo });
}
