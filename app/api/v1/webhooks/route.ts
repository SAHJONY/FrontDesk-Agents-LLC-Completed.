// app/api/v1/webhooks/route.ts
import { NextResponse } from 'next/server'; // Import this
import { billingService } from '@/services/billing';
import { whatsappAgent } from '@/services/whatsappAgent';
import { automationService } from '@/services/automation.service';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-webhook-signature');
    const body = await req.json();

    // 1. Clasificar el origen del Webhook
    switch (body.provider) {
      case 'STRIPE':
        const stripeData = await billingService.handlePayment(body.data);
        return NextResponse.json(stripeData); // Wrapped in Response

      case 'WHATSAPP':
        const waData = await whatsappAgent.processIncoming(body.data);
        return NextResponse.json(waData); // Wrapped in Response

      case 'SECURITY_ALERT':
        const panicData = await automationService.triggerPanic(body.reason);
        return NextResponse.json(panicData); // Wrapped in Response

      default:
        return new Response('Unknown Provider', { status: 400 });
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
