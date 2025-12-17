// app/api/onboarding/scrape/route.ts
import { NextResponse } from 'next/server';
import { SYNTHESIS_PROMPT } from '@/lib/ai/prompts'; // Importamos tu prompt
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // 1. Scraping (Ejemplo simplificado)
    // Aquí podrías usar una librería como 'cheerio' o un servicio externo
    const webContent = await fetchContentFromURL(url); 

    // 2. Síntesis con IA
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYNTHESIS_PROMPT },
        { role: "user", content: `Aquí está el contenido del sitio web: ${webContent}` }
      ],
      response_format: { type: "json_object" }
    });

    const businessSpecs = JSON.parse(completion.choices[0].message.content);

    // 3. Respuesta al Frontend para confirmar
    return NextResponse.json(businessSpecs);
    
  } catch (error) {
    return NextResponse.json({ error: "No pudimos configurar el sistema automáticamente" }, { status: 500 });
  }
}
