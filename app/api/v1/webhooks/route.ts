import { billingService } from '@/services/billing';
import { whatsappAgent } from '@/services/whatsappAgent';
import { automationService } from '@/services/automation.service';

export async function POST(req: Request) {
  const signature = req.headers.get('x-webhook-signature');
  const body = await req.json();

  // 1. Clasificar el origen del Webhook
  switch (body.provider) {
    case 'STRIPE':
      return await billingService.handlePayment(body.data); //
    case 'WHATSAPP':
      return await whatsappAgent.processIncoming(body.data); //
    case 'SECURITY_ALERT':
      return await automationService.triggerPanic(body.reason); //
    default:
      return new Response('Unknown Provider', { status: 400 });
  }
}
