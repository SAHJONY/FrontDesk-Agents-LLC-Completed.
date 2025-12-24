// metrics.service.ts
import { createClient } from '@/lib/supabase/server'; // Point to the correct server helper
import { telegramBot } from '@/lib/telegram';

export const metricsService = {
  async logLeadMetric(leadData: any) {
    // Initialize the client inside the function
    const supabase = await createClient();

    const { error } = await supabase
      .from('metrics')
      .insert([{ 
        type: 'LEAD_INBOUND', 
        details: leadData, 
        timestamp: new Date().toISOString() 
      }]);

    if (error) {
      console.error('❌ Metrics Log Failed:', error.message);
    }
    
    // Alerting logic for Houston Freeze leads
    if (leadData.priority === 'CRISIS') {
      await telegramBot.sendMessage(`🚨 FREEZE ALERT: Emergency lead captured for ${leadData.vertical}`);
    }
  }
};
