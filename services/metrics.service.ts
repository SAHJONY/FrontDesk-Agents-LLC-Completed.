// File: metrics.service.ts
import { createServerSupabase as createClient } from '@/lib/supabase/server';
// import { telegramBot } from '@/lib/telegram';

export const metricsService = {
  async recordSovereignEvent(eventName: string, payload: any) {
    try {
      // FIX: Dynamically generate the client and await it
      const supabase = await createClient(); 
      
      const { error } = await supabase
        .from('global_metrics')
        .insert({
          event_type: eventName,
          metadata: payload,
          timestamp: new Date().toISOString()
        });

      if (error) {
        console.error("[METRICS_ERROR]:", error.message);
      }
    } catch (err) {
      console.error("[METRICS_SYSTEM_ERROR]:", err);
    }
  }
};
