export async function generateWeeklyManifest(clientId: string) {
  const supabase = createClient();
  
  // 1. Fetch all successful bookings from the last 7 days
  const { data: bookings } = await supabase
    .from('call_logs')
    .select('*')
    .eq('client_id', clientId)
    .eq('status', 'booked')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  // 2. Calculate Industry-Standard "Save Value" 
  // (e.g., Average Emergency Plumbing Lead = $1,500)
  const totalProtected = bookings.reduce((acc, call) => acc + call.estimated_value, 0);

  return {
    count: bookings.length,
    total: totalProtected,
    topJobs: bookings.slice(0, 3)
  };
}
