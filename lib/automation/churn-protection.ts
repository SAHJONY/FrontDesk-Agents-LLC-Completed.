import { createClient } from '@/utils/supabase/server';

export async function generateCancellationDefense(clientId: string) {
  // Initialize the server-side client (must be awaited in Next.js 15)
  const supabase = await createClient();
  
  // 1. Pull all "Saved" high-ticket emergencies from the last 30 days
  const { data: savedJobs, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('client_id', clientId)
    .gt('revenue_protected', 1000) // Focus only on the big $1,000+ emergency saves
    .order('completed_at', { ascending: false });

  if (error || !savedJobs) {
    return { count: 0, totalValue: 0, topSaves: [] };
  }

  const totalSavedValue = savedJobs.reduce((acc, job) => acc + (job.revenue_protected || 0), 0);
  
  return {
    count: savedJobs.length,
    totalValue: totalSavedValue,
    topSaves: savedJobs.slice(0, 3) // Get the 3 most recent hero calls
  };
}
