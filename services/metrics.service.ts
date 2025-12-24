// metrics.service.ts
import { createClient } from '@/lib/supabase/server'; // Point to the server client
import { telegramBot } from '@/lib/telegram';

export const metricsService = {
  async trackEvent(eventName: string, payload: any) {
    // Initialize the client within the method
    const supabase = await createClient();

    const { error } = await supabase
      .from('metrics')
      .insert([{ event_name: eventName, data: payload, created_at: new Date() }]);

    if (error) {
      console.error('Failed to log metric:', error.message);
    }

    // Trigger emergency alert if this is a high-priority freeze lead
    if (payload.priority === 'priority_1') {
      await telegramBot.sendMessage(`🚨 URGENT: High-priority lead captured in Houston!`);
    }
  }
};
