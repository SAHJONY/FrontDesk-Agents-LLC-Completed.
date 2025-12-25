// services/metrics.service.ts
import { createClient } from '@/lib/supabase'; 
import { telegramBot } from '@/lib/telegram';

/**
 * Sovereign Metrics Service
 * Handles the recording of global events and telemetry 
 * for the FrontDesk Agents LLC ecosystem.
 */
export const metricsService = {
  async recordSovereignEvent(eventName: string, payload: any) {
    try {
      // Initialize the dynamic Supabase client for Next.js 15
      const supabase = await createClient();
      
      console.log(`[METRICS] Initiating record for event: ${eventName}`);
      
      const { error } = await supabase
        .from('global_metrics')
        .insert({
          event_type: eventName,
          metadata: payload,
          timestamp: new Date().toISOString()
        });

      if (error) {
        console.error("[METRICS_DATABASE_ERROR]:", error.message);
        // Alert the control center via Telegram if the database write fails
        if (telegramBot) {
          await telegramBot.sendMessage(`⚠️ Metric Failure: ${eventName} - ${error.message}`);
        }
      }
    } catch (err: any) {
      console.error("[METRICS_CRITICAL_SYSTEM_ERROR]:", err.message);
    }
  }
};
