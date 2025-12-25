// services/metrics.service.ts
import { createClient } from '@/lib/supabase/server'; // Pointing to your new server logic
import { telegramBot } from '@/lib/telegram';

export const metricsService = {
  async recordSovereignEvent(eventName: string, payload: any) {
    // FIX: Await the client creation as per Next.js 15 requirements
    const supabase = await createClient();
    
    console.log(`[METRICS] Recording ${eventName}...`);
    
    const { error } = await supabase
      .from('global_metrics')
      .insert({
        event_type: eventName,
        metadata: payload,
        timestamp: new Date().toISOString()
      });

    if (error) {
      console.error("[METRICS_ERROR]:", error.message);
      // Optional: Send alert to Telegram
      await telegramBot.sendMessage(`🚨 Metric Alert: ${error.message}`);
    }
  }
};
