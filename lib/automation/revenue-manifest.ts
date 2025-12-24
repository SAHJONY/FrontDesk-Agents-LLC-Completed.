import { createClient } from '@/lib/supabase/server'; // FIX: Added missing import

export async function generateWeeklyManifest(clientId: string) {
  // FIX: In Next.js 15, the server client must be awaited
  const supabase = await createClient();
  
  // 1. Fetch all successful bookings from the last 7 days
  const { data: bookings, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('client_id', clientId)
    .eq('status', 'booked')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  if (error || !bookings) {
    return { count: 0, total: 0, topJobs: [] };
  }

  // 2. Calculate Industry-Standard "Save Value" 
  // We use fallback to 0 to prevent NaN in the manifest
  const totalProtected = bookings.reduce((acc, call) => acc + (call.estimated_value || 0), 0);

  return {
    count: bookings.length,
    total: totalProtected,
    topJobs: bookings.slice(0, 3) // Get the 3 most recent high-value saves
  };
}
