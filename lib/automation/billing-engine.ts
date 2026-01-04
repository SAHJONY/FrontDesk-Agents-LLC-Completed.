// lib/automation/billing-engine.ts
import { createServerClient } from '@/lib/supabase/server'; // Nombre corregido

export async function runBillingCycle() {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('billing_records')
    .select('id')
    .limit(1);

  if (error) {
    console.error("Error en el nodo pdx1:", error.message);
    return null;
  }

  return data;
}

export const runtime = 'nodejs';
