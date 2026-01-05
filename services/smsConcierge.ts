// services/smsConcierge.ts
// SMS Concierge - Two-way SMS conversations powered by AI

import OpenAI from 'openai';
import twilio from 'twilio';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface SMSMessage {
  from: string;
  to: string;
  body: string;
  timestamp: Date;
  direction: 'inbound' | 'outbound';
}

interface ConversationContext {
  customerId: string;
  businessId: string;
  conversationHistory: SMSMessage[];
  customerProfile?: {
    name?: string;
    lastPurchase?: Date;
    preferences?: Record<string, any>;
  };
}

export class SMSConciergeService {
  /**
   * Handle incoming SMS message
   */
  async handleInboundSMS(
    from: string,
    to: string,
    body: string,
    businessId: string
  ): Promise<string> {
    // Load conversation context
    const context = await this.loadContext(from, businessId);

    // Get AI response
    const aiResponse = await this.generateResponse(body, context);

    // Save conversation
    await this.saveMessage({
      from,
      to,
      body,
      timestamp: new Date(),
      direction: 'inbound',
    }, businessId);

    // Send response via Twilio
    await this.sendSMS(to, from, aiResponse);

    // Save AI response
    await this.saveMessage({
      from: to,
      to: from,
      body: aiResponse,
      timestamp: new Date(),
      direction: 'outbound',
    }, businessId);

    return aiResponse;
  }

  /**
   * Generate AI response based on context
   */
  private async generateResponse(
    message: string,
    context: ConversationContext
  ): Promise<string> {
    const systemPrompt = `You are a helpful SMS assistant for a business.
- Be concise (SMS should be under 160 characters when possible)
- Be friendly and professional
- If asked about appointments, offer to book one
- If asked about products, provide information
- If asked about pricing, give accurate info
- For complex requests, offer to have a human call them
- Always end with a helpful question or call-to-action

Business Context:
${JSON.stringify(context.customerProfile || {})}

Recent conversation:
${context.conversationHistory
  .slice(-5)
  .map(msg => `${msg.direction === 'inbound' ? 'Customer' : 'Business'}: ${msg.body}`)
  .join('\n')}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I had trouble understanding. Can you rephrase?';
  }

  /**
   * Send SMS via Twilio
   */
  async sendSMS(from: string, to: string, body: string): Promise<void> {
    try {
      await twilioClient.messages.create({
        from,
        to,
        body,
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send SMS');
    }
  }

  /**
   * Send bulk SMS campaign
   */
  async sendBulkSMS(
    from: string,
    recipients: string[],
    message: string
  ): Promise<{ sent: number; failed: number }> {
    let sent = 0;
    let failed = 0;

    for (const recipient of recipients) {
      try {
        await this.sendSMS(from, recipient, message);
        sent++;
        // Rate limiting: wait 1 second between messages
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to send to ${recipient}:`, error);
        failed++;
      }
    }

    return { sent, failed };
  }

  /**
   * Load conversation context from database
   */
  private async loadContext(
    phoneNumber: string,
    businessId: string
  ): Promise<ConversationContext> {
    // This would query your database
    // Simplified for now
    return {
      customerId: phoneNumber,
      businessId,
      conversationHistory: [],
    };
  }

  /**
   * Save message to database
   */
  private async saveMessage(
    message: SMSMessage,
    _businessId: string
  ): Promise<void> {
    // This would save to your database
    console.log('Saving message:', message);
  }

  /**
   * Schedule automated SMS
   */
  async scheduleReminder(
    to: string,
    message: string,
    sendAt: Date
  ): Promise<void> {
    const delay = sendAt.getTime() - Date.now();
    
    if (delay < 0) {
      throw new Error('Cannot schedule SMS in the past');
    }

    setTimeout(async () => {
      await this.sendSMS(process.env.TWILIO_PHONE_NUMBER!, to, message);
    }, delay);
  }
}

export const smsConcierge = new SMSConciergeService();
