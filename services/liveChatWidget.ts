// services/liveChatWidget.ts
import { supabase } from '@/lib/supabase';

export interface VisitorInfo {
  id: string;
  pagePath: string;
  browser: string;
  location?: string;
}

export class LiveChatWidget {
  /**
   * Procesa mensajes del chat web y decide si usar IA o Handoff Humano
   */
  async handleWebMessage(visitorId: string, message: string, businessId: string) {
    // 1. Registrar el mensaje en la base de datos
    await supabase.from('web_chat_messages').insert({
      visitor_id: visitorId,
      body: message,
      business_id: businessId,
      direction: 'inbound'
    });

    // 2. Lógica de "Handoff" (Si pide hablar con un humano)
    if (message.toLowerCase().includes('human') || message.toLowerCase().includes('agent')) {
      return { action: 'HUMAN_HANDOFF', message: 'Connecting you to a specialist...' };
    }

    // 3. Respuesta de IA usando Knowledge Blocks
    const aiResponse = "I can certainly help you with that. Would you like to see our availability?";
    
    return { action: 'AI_RESPONSE', message: aiResponse };
  }

  async trackVisitor(info: VisitorInfo) {
    console.log(`Tracking visitor ${info.id} on ${info.pagePath}`);
    // Integración con analíticas predictivas
  }
}

export const liveChatWidget = new LiveChatWidget();
