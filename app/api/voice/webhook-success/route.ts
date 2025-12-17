import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Twilio } from 'twilio';

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function POST(req: Request) {
  const { call_id, transcript, summary, wasBooked, businessId } = await req.json();

  if (wasBooked) {
    // 1. Buscamos el teléfono del dueño del negocio en la DB
    const business = await db.businessConfig.findUnique({ where: { id: businessId } });

    // 2. Enviamos WhatsApp de felicitación y alerta
    await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${business?.ownerPhone}`, 
      body: `🚀 ¡GRAN NOTICIA! Tu agente de FrontDesk acaba de cerrar una cita.\n\n📄 Resumen: ${summary}\n\nRevisa los detalles en tu Dashboard.`
    });
  }

  return NextResponse.json({ success: true });
}
