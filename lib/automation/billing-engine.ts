import { createInternalServerClient } from '@/lib/supabase/server'

export async function processMonthlyBilling() {
  const supabase = await createInternalServerClient()

  const { data, error } = await supabase
    .from('billing_records')
    .select('*')

  if (error) {
    console.error("Billing Engine error at pdx1 node:", error.message)
    throw error
  }

  return data
}

export const runtime = 'nodejs'; // Asegura compatibilidad con el entorno Portland
