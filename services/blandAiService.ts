import { db } from '@/lib/db';

// --- TYPES & INTERFACES ---
export interface CallRequest {
  phoneNumber: string;
  task: string;
  transferPhone?: string;
  locale?: string;
}

export interface CallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

// Type guard for DB consumption tracking to ensure type safety with Prisma/Supabase
function hasConsumption(obj: any): obj is typeof db & { 
  consumption: { 
    create: (data: any) => Promise<void>;
    findMany: (params: any) => Promise<any[]>;
  } 
} {
  return 'consumption' in obj && obj.consumption && typeof obj.consumption === 'object';
}

// --- CORE SERVICE ---
export const blandAiService = {
  
  /**
   * SECURITY: Checks database to verify daily node limits.
   * Prevents runaway infrastructure costs and API abuse.
   */
  async checkUsage(): Promise<boolean> {
    try {
      const integration = await db.integrations_control.findUnique({
        where: { provider: 'bland_ai' }
      });

      if (!integration || !integration.enabled) {
        console.warn('⚠️ SARA Node is currently disabled in Integrations Control.');
        return false;
      }

      let usageToday = 0;
      if (hasConsumption(db)) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const consumption = await db.consumption.findMany({
          where: { 
            provider: 'bland_ai', 
            created_at: { gte: today } 
          }
        });
        usageToday = consumption?.length || 0;
      }

      if (usageToday >= integration.daily_limit) {
        throw new Error(`Daily limit of ${integration.daily_limit} calls reached for this node.`);
      }
      return true;
    } catch (error) {
      console.error('🛡️ Usage Guard Error:', error);
      return false; 
    }
  },

  /**
   * INITIATE CALL: The main entry point for SARA.AI voice dispatch.
   */
  async makeCall(request: CallRequest): Promise<CallResponse> {
    // 1. Verify Node Authorization & Usage Limits
    const isAllowed = await this.checkUsage();
    if (!isAllowed) return { success: false, error: "Node limit reached or infrastructure disabled." };

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
          voice_id: process.env.BLAND_AI_VOICE_ID || 'nat', 
          record: true,
          reduce_latency: true,
          // CRITICAL: Link the webhook for post-call telemetry
          webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/voice/webhook`,
          metadata: {
            market_locale: request.locale || 'en',
            source: 'Sovereign_Dashboard_v3'
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Bland AI Handshake Failed: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();

      // 2. Track Consumption: Record this transaction in the forensic ledger
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
   * CONFIGURATION: Updates agent personality/system prompt dynamically.
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
