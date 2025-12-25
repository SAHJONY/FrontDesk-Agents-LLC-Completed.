// metrics.service.ts
import { createClient } from '@/lib/supabase/server';
import { telegramBot } from '@/lib/telegram';

export const metricsService = {
  async trackActivity(type: 'SPAM_BLOCKED' | 'LEAD_CAPTURED' | 'CRISIS_TRANSFER', data: any) {
    const supabase = createClient(); // No await needed - createClient is synchronous
    
    const { error } = await supabase
      .from('platform_metrics')
      .insert([{ 
        event_type: type, 
        payload: data, 
        brand: 'FrontDesk Agents' 
      }]);
    
    if (error) console.error('Platform Sync Error:', error.message);
    
    // Immediate notification for Crisis Transfers (Houston Freeze logic)
    if (type === 'CRISIS_TRANSFER') {
      await telegramBot.sendMessage('🚀 FRONTDESK AGENTS: High-value job transferred to tech!');
    }
  }
};
