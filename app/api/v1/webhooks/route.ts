// app/api/v1/webhooks/route.ts
import { NextResponse } from 'next/server';
import { billingService } from '@/services/billing';
import { whatsappAgent } from '@/services/whatsappAgent';
import { automationService } from '@/services/automation.service';

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
        if (data.ruleId) {
          await automationService.executeRule(data.ruleId, data.context || {});
        }
        break;

      case 'stripe.webhook':
        // Handle Stripe webhooks
        // This would typically verify the signature and process the event
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
