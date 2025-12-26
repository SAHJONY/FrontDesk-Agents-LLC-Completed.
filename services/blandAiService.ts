import { db } from '@/lib/db';

// --- UNIVERSAL WORLDWIDE LINGUISTIC MAPPING ---
export const WORLDWIDE_LANGUAGES = {
  AMERICAS: ['en-US', 'en-CA', 'es-MX', 'pt-BR', 'fr-CA'],
  EUROPE: ['en-GB', 'fr-FR', 'de-DE', 'it-IT', 'es-ES', 'nl-NL', 'pl-PL', 'tr-TR'],
  AFRICA: ['en-NG', 'en-KE', 'en-ZA', 'sw-KE', 'yo-NG', 'ig-NG', 'ha-NG', 'zu-ZA', 'af-ZA'],
  MIDDLE_EAST: ['ar-AE', 'ar-SA', 'ar-EG', 'he-IL', 'fa-IR'],
  ASIA_PACIFIC: ['zh-CN', 'zh-HK', 'ja-JP', 'ko-KR', 'hi-IN', 'vi-VN', 'th-TH', 'id-ID']
};

export interface CallRequest {
  phoneNumber: string;
  task: string;
  transferPhone?: string;
  locale?: string; // Standardized ISO (e.g., 'yo-NG' for Yoruba, 'ar-AE' for Arabic)
  voiceId?: string;
}

export interface CallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

function hasConsumption(obj: any): obj is typeof db & { 
  consumption: { create: (data: any) => Promise<void>; findMany: (params: any) => Promise<any[]> } 
} {
  return 'consumption' in obj && obj.consumption && typeof obj.consumption === 'object';
}

export const blandAiService = {
  
  /**
   * SECURITY: Checks database to verify daily node limits.
   */
  async checkUsage(): Promise<boolean> {
    try {
      const integration = await db.integrations_control.findUnique({
        where: { provider: 'bland_ai' }
      });

      if (!integration || !integration.enabled) {
        console.warn('⚠️ SARA Node is currently disabled.');
        return false;
      }

      let usageToday = 0;
      if (hasConsumption(db)) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const consumption = await db.consumption.findMany({
          where: { provider: 'bland_ai', created_at: { gte: today } }
        });
        usageToday = consumption?.length || 0;
      }

      return usageToday < integration.daily_limit;
    } catch (error) {
      return false; 
    }
  },

  /**
   * INITIATE CALL: Universal Neural Dispatch for Global Markets.
   */
  async makeCall(request: CallRequest): Promise<CallResponse> {
    const isAllowed = await this.checkUsage();
    if (!isAllowed) return { success: false, error: "Node limit reached or disabled." };

    try {
      const response = await fetch('https://api.bland.ai/v1/calls', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.BLAND_AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: request.phoneNumber,
          task: request.task,
          transfer_phone_number: request.transferPhone,
          // Support for LTR and RTL scripts automatically handled by neural core
          language: request.locale || 'en-US',
          voice_id: request.voiceId || process.env.BLAND_AI_VOICE_ID || 'nat', 
          record: true,
          reduce_latency: true,
          // NEURAL TUNING: Adjusts stability and tone for African/Asian tonal languages
          voice_settings: {
            speed: 1.0,
            stability: 0.8,
            tone_adjustment: request.locale?.match(/(yo|ig|ha|sw|zh|vi|th)/) ? 0.75 : 0.5
          },
          webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/voice/webhook`,
          metadata: {
            market_locale: request.locale || 'en-US',
            source: 'Sovereign_Universal_v3'
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
      }

      const data = await response.json();

      if (hasConsumption(db)) {
        await db.consumption.create({ 
          data: { 
            provider: 'bland_ai',
            metadata: { call_id: data.call_id, locale: request.locale }
          } 
        });
      }

      return { success: true, callId: data.call_id };
    } catch (error) {
      console.error('❌ Neural Dispatch Failure:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown neural error' };
    }
  },

  /**
   * TELEMETRY: Retrieves live call state for the CallMonitor.
   */
  async getCallStatus(callId: string) {
    try {
      const response = await fetch(`https://api.bland.ai/v1/calls/${callId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.BLAND_AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok ? await response.json() : null;
    } catch (error) {
      return null;
    }
  }
};
