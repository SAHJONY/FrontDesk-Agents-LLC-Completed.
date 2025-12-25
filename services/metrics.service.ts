// 1. Change the import to get the creation function
import { createClient } from '@/lib/supabase'; 
import { telegramBot } from '@/lib/telegram';

export const metricsService = {
  async recordSovereignEvent(eventName: string, payload: any) {
    // 2. Await the client creation inside the async function
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
  }
};
