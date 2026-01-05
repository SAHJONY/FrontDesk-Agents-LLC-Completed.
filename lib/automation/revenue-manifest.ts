import { createServerClient } from '@/lib/supabase/server'; // FIX: Added missing import
	
	export const runtime = 'nodejs';
	
	export async function generateWeeklyManifest(clientId: string) {
	  // FIX: In Next.js 15, the server client must be awaited
	  const supabase = await createServerClient();
	  
	  // 1. Fetch all successful bookings from the last 7 days
	  const { data, error } = await supabase
	    .from('revenue_records') // Keeping the local table name for now
	    .select('*')
    .eq('client_id', clientId)

  if (error) {
    throw new Error(`Error en el manifiesto de ingresos: ${error.message}`)
  }

  return data
}
