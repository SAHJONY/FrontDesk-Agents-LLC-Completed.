import { createInternalServerClient } from '@/lib/supabase/server'

// Fuerza Node.js (evita Edge + Supabase warnings)
export const runtime = 'nodejs'

export async function runBillingCycle(): Promise<void> {
  const supabase = await createInternalServerClient()

  // Uso mínimo real para satisfacer TS strict
  const { error } = await supabase
    .from('invoices')
    .select('id')
    .limit(1)

  if (error) {
    throw new Error(`Billing cycle failed: ${error.message}`)
  }

  // Aquí va la lógica real de facturación
}
