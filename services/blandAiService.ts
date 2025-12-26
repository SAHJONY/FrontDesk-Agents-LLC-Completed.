import { db } from '@/lib/db';

// --- TYPES & INTERFACES ---
export interface CallRequest {
  phoneNumber: string;
  task: string;
  transferPhone?: string;
}

export interface CallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

// Type guard for DB consumption tracking
function hasConsumption(obj: any): obj is typeof db & { 
  consumption: { 
    getDailyUsage: (provider: string) => Promise<number>;
    create: (data: any) => Promise<void>;
    findMany: (params: any) => Promise<any[]>;
  } 
} {
  return 'consumption' in obj && obj.consumption && typeof obj.consumption === 'object';
}

// --- CORE SERVICE ---
export const blandAiService = {
  
  /**
   * SECURITY: Checks database to see if the daily call limit is reached.
   */
  async checkUsage(): Promise<boolean> {
    try {
      const integration = await db.integrations_control.findUnique({
        where: { provider: 'bland_ai' }
      });

      if (!integration || !integration.enabled) return false;

      let usageToday = 0;
      if (hasConsumption(db)) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const consumption = await db.consumption.findMany({
          where: { provider: 'bland_ai', created_at: { gte: today } }
        });
        usageToday = consumption?.length || 0;
      }

      if (usageToday >= integration.daily_limit) {
        throw new Error(`Daily limit of ${integration.daily_limit} calls reached.`);
      }
      return true;
    } catch (error) {
      console.error('Usage Check Error:', error);
      return false; 
    }
  },

  /**
   * INITIATE CALL: The main entry point for SARA.AI voice calls.
   */
  async makeCall(request: CallRequest): Promise<CallResponse> {
    // 1. Check if we are allowed to make the call
    const isAllowed = await this.checkUsage();
    if (!isAllowed) return { success: false, error: "Usage limit reached or service disabled." };

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
          voice_id: process.env.BLAND_AI_VOICE_ID || 'default',
        }),
      });

      if (!response.ok) throw new Error(`Bland AI API error: ${response.statusText}`);

      const data = await response.json();

      // 2. Track successful usage in DB
      if (hasConsumption(db)) {
        await db.consumption.create({ data: { provider: 'bland_ai' } });
      }

      return { success: true, callId: data.call_id };
    } catch (error) {
      console.error('Bland AI service error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  /**
   * CONFIGURATION: Updates agent personality/system prompt.
   */
  async configureAgent(config: any): Promise<any> {
    try {
      const response = await fetch('https://api.bland.ai/v1/agents/config', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.BLAND_AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update neural settings' };
    }
  }
};
