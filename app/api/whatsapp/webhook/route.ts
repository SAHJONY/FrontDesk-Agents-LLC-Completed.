// app/api/whatsapp/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { whatsappAgent } from '@/services/whatsappAgent';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const body = formData.get('Body') as string;
    const mediaUrl = formData.get('MediaUrl0') as string | undefined;

    const response = await whatsappAgent.handleInboundMessage(
      from.replace('whatsapp:', ''),
      to.replace('whatsapp:', ''),
      body,
      mediaUrl
    );

    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${response}</Message>
</Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    );
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}

// app/api/email/process/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { emailAssistant } from '@/services/emailAssistant';

export async function POST(request: NextRequest) {
  try {
    const email = await request.json();
    const result = await emailAssistant.processIncomingEmail(email);

    if (result.shouldAutoReply) {
      await emailAssistant.autoReply(email, result.suggestedResponse);
    }

    return NextResponse.json({
      success: true,
      category: result.category,
      priority: result.priority,
      sentiment: result.sentiment,
      suggestedResponse: result.suggestedResponse,
      autoReplied: result.shouldAutoReply,
    });
  } catch (error) {
    console.error('Email process error:', error);
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}

// app/api/sdr/campaign/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { aiSDR } from '@/services/aiSDR';

export async function POST(request: NextRequest) {
  try {
    const { leads, message } = await request.json();
    const results = await aiSDR.executeCampaign(leads, message);

    return NextResponse.json({
      success: true,
      metrics: results,
    });
  } catch (error) {
    console.error('SDR campaign error:', error);
    return NextResponse.json({ error: 'Failed to execute' }, { status: 500 });
  }
}

// app/api/analytics/dashboard/route.ts
export async function GET(request: NextRequest) {
  try {
    // Aggregate metrics from all channels
    const metrics = {
      voice: {
        totalCalls: 1234,
        answered: 987,
        avgDuration: 145, // seconds
        conversion: 0.42,
      },
      sms: {
        totalMessages: 3456,
        responded: 2789,
        engagement: 0.81,
      },
      email: {
        sent: 5678,
        opened: 2271,
        clicked: 568,
        replied: 284,
      },
      whatsapp: {
        messages: 2345,
        delivered: 2340,
        read: 2100,
        engagement: 0.89,
      },
    };

    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

// app/api/billing/create-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { customerId, priceId } = await request.json();

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
