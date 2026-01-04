// En tus archivos de automatización de cobros
import { createInternalServerClient } from '@/lib/supabase/server'

export async function runBillingCycle() {
  const supabase = await createInternalServerClient()
  // ... lógica de facturación
}
