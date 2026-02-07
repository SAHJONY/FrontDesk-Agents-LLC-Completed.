// services/whatsappAgent.ts
import { getSupabaseAdmin } from "@/lib/supabase";
import twilio from 'twilio';

const twilioClient = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export interface WhatsAppMessage {
  from: string;
  to: string;
  body: string;
  mediaUrl?: string;
}

export interface WhatsAppResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * WhatsApp Business Concierge
 * Handles incoming WhatsApp messages and sends automated responses
 */
export const whatsappAgent = {
  /**
   * FIX: Renamed from processMessage to processIncoming to match Webhook route
   */
  async processIncoming(message: WhatsAppMessage): Promise<WhatsAppResponse> {
    const supabase = getSupabaseAdmin();
    try {
      // Log the message to Supabase
      const { error: logError } = await supabase
        .from('whatsapp_messages')
        .insert({
          from_number: message.from,
          to_number: message.to,
          message_body: message.body,
          media_url: message.mediaUrl,
          direction: 'inbound',
          created_at: new Date().toISOString(),
        });

      if (logError) {
        console.error('Error logging WhatsApp message:', logError);
      }

      // Generate AI response based on message content
      const response = await this.generateResponse(message.body);

      // Send response via Twilio
      await this.sendMessage({
        from: message.to,
        to: message.from,
        body: response,
      });

      return {
        success: true,
        message: 'Message processed and response sent',
      };
    } catch (error) {
      console.error('WhatsApp agent error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Send WhatsApp message via Twilio
   */
  async sendMessage(message: WhatsAppMessage): Promise<WhatsAppResponse> {
    const supabase = getSupabaseAdmin();
    try {
      if (!twilioClient) {
        throw new Error("Twilio client not initialized: Missing credentials");
      }

      const twilioMessage = await twilioClient.messages.create({
        body: message.body,
        from: `whatsapp:${message.from}`,
        to: `whatsapp:${message.to}`,
        ...(message.mediaUrl && { mediaUrl: [message.mediaUrl] }),
      });

      // Log outbound message
      await supabase.from('whatsapp_messages').insert({
        from_number: message.from,
        to_number: message.to,
        message_body: message.body,
        media_url: message.mediaUrl,
        direction: 'outbound',
        twilio_sid: twilioMessage.sid,
        created_at: new Date().toISOString(),
      });

      return {
        success: true,
        message: 'WhatsApp message sent successfully',
      };
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Generate AI response to customer message
   */
  async generateResponse(messageBody: string): Promise<string> {
    const lowerMessage = messageBody.toLowerCase();

    if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
      return 'We are open 24/7! Our AI assistant is always here to help you.';
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our pricing starts at $297/month for our Starter plan. Would you like to schedule a demo?';
    }

    if (lowerMessage.includes('demo') || lowerMessage.includes('meeting')) {
      return 'Great! I can help you schedule a demo. Please visit our website to book a time that works for you.';
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can ask me about:\n- Our services\n- Pricing\n- Schedule a demo\n- Technical support\n\nWhat would you like to know?";
    }

    return 'Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to ask me anything about our services.';
  },

  /**
   * Send catalog or media via WhatsApp
   */
  async sendCatalog(to: string, catalogUrl: string): Promise<WhatsAppResponse> {
    return this.sendMessage({
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
      body: 'Here is our service catalog:',
      mediaUrl: catalogUrl,
    });
  },

  /**
   * Send payment link to customer via WhatsApp
   */
  async sendPaymentLink(invoiceData: any, tone: string): Promise<WhatsAppResponse> {
    console.log(`[WHATSAPP] Sending payment link for invoice ${invoiceData.id} with tone: ${tone}`);
    // Placeholder for actual implementation
    return { success: true, message: 'Payment link sent' };
  },
};
