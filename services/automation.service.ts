// app/api/v1/webhooks/route.ts
import { NextResponse } from 'next/server';
import { billingService } from '@/services/billing';
import { whatsappAgent } from '@/services/whatsappAgent';
import { aiCeoAgent } from '@/services/automation.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, productId, clientId, data } = body;

    // Route to appropriate service based on webhook type
    switch (type) {
      case 'whatsapp.message':
        await whatsappAgent.processMessage({
          from: data.from,
          to: data.to,
          body: data.body,
          mediaUrl: data.mediaUrl,
        });
        break;

      case 'billing.payment_failed':
        if (data.customerId) {
          await billingService.handleFailedPayment(data.customerId);
        }
        break;

      case 'automation.trigger':
        // Use aiCeoAgent orchestration
        await aiCeoAgent.orchestrate({
          productId: productId || 'unknown',
          clientId,
          type,
          data,
        });
        break;

      case 'stripe.webhook':
        // Handle Stripe webhooks
        console.log('Stripe webhook received:', data);
        break;

      default:
        console.log('Unknown webhook type:', type);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Webhook processed successfully' 
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
