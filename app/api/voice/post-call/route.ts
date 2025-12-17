import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { call_id, transcript, businessId, customerPhone } = await req.json();

  // 1. La IA analiza la transcripción completa
  const analysis = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Eres un experto en análisis de llamadas. Resume la conversación y determina si se agendó una cita. Responde estrictamente en JSON con este formato: { summary: string, wasBooked: boolean, serviceRequested: string, sentiment: 'positive' | 'neutral' | 'negative' }"
      },
      { role: "user", content: transcript }
    ],
    response_format: { type: "json_object" }
  });

  const result = JSON.parse(analysis.choices[0].message.content || "{}");

  // 2. Guardamos el resultado final en la Base de Datos
  await db.callLog.create({
    data: {
      businessId,
      customerPhone,
      summary: result.summary,
      wasBooked: result.wasBooked,
      estimatedValue: result.wasBooked ? 100 : 0, // Ajustable según el crawler
      createdAt: new Date(),
    }
  });

  return NextResponse.json({ success: true });
}
