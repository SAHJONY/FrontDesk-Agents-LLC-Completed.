// app/api/whatsapp/webhook/route.ts
import { NextResponse } from 'next/server';
import { whatsappAgent } from '@/services/whatsappAgent';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const body = formData.get('Body') as string;
    const from = formData.get('From') as string;
    const to = formData.get('To') as string;

    // Process the message through WhatsApp agent
    // FIX: Changed processMessage to processIncoming
    const result = await whatsappAgent.processIncoming({
      from: from.replace('whatsapp:', ''),
      to: to.replace('whatsapp:', ''),
      body,
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('WhatsApp Webhook Route Error:', error.message);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
