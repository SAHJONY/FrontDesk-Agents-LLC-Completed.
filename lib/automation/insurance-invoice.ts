// lib/automation/insurance-invoice.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { resend } from '@/lib/mail/resend'

export async function generateMonthlyInsuranceInvoices() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from('insurance_policies')
    .select('*')

  if (error) {
    throw error
  }

  // lógica de facturación aquí
  return data
}
