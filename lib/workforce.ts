import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use Service Role for backend init
);

export async function initWorkforce() {
  try {
    const { data, error } = await supabase
      .from('workforce_stats')
      .select('*');

    if (error) throw error;

    console.log('--- Supabase Workforce Sync ---');
    data.forEach(item => {
      console.log(`${item.name} initialized: ${item.agents_count} agents ready`);
    });
    
    return data;
  } catch (err) {
    console.error('Failed to sync workforce from Supabase:', err);
    return null;
  }
}
