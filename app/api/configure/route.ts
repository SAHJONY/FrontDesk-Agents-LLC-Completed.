// app/api/configure/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

// 1. Aquí colocas tu constante
const SYNTHESIS_PROMPT = `
Analiza el siguiente texto extraído de un sitio web empresarial...
(el resto de tu prompt)
`;

export async function POST(req: Request) {
  const { websiteText } = await req.json();

  // 2. Aquí usas la constante al llamar a la IA
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYNTHESIS_PROMPT },
      { role: "user", content: websiteText }
    ],
    response_format: { type: "json_object" } // Esto asegura que te devuelva el JSON que pediste
  });

  return NextResponse.json(JSON.parse(response.choices[0].message.content));
}
