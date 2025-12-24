export async function generateCancellationDefense(clientId: string) {
  const supabase = createClient();
  
  // 1. Pull all "Saved" high-ticket emergencies from the last 30 days
  const { data: savedJobs } = await supabase
    .from('call_logs')
    .select('*')
    .eq('client_id', clientId)
    .gt('revenue_protected', 1000) // Focus only on the big $1,000+ emergency saves
    .order('completed_at', { ascending: false });

  const totalSavedValue = savedJobs.reduce((acc, job) => acc + job.revenue_protected, 0);
  
  return {
    count: savedJobs.length,
    totalValue: totalSavedValue,
    topSaves: savedJobs.slice(0, 3) // Get the 3 most recent hero calls
  };
}
