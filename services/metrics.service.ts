// metrics.service.ts
import { createClient } from '@/lib/supabase/server'; // 1. Point to the correct file
import { telegramBot } from '@/lib/telegram';

export async function processMetrics() {
  // 2. Initialize the client inside the function for Next.js 15
  const supabase = await createClient(); 

  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .limit(10);

  if (error) {
    console.error('Metrics Sync Error:', error.message);
    return;
  }
  
  // Logic for Telegram alerts if metrics spike (e.g., Freeze alerts)
  if (data.length > 100) {
    await telegramBot.sendMessage('🚀 Lead volume spike detected in Houston!');
  }
}
