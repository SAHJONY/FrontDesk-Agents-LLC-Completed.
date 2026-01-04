import { createServerClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function generateWeeklyManifest(clientId: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('revenue_records')
    .select('*')
    .eq('client_id', clientId)

  if (error) {
    throw new Error(`Error en el manifiesto de ingresos: ${error.message}`)
  }

  return data
}
