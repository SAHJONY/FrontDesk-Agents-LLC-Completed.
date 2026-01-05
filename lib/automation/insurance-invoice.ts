import { createServerClient } from '@/lib/supabase/server'; // Nombre corregido 1:1
	// import { resend } from '@/lib/mail/resend'; // Ensure this matches exactly

// Fuerza Node.js (evita Edge + Supabase warnings)
export const runtime = 'nodejs';

/**
 * GENERACIÓN DE FACTURAS
 * Procesa los registros de facturación para la fuerza de trabajo global.
 */
export async function generateMonthlyInsuranceInvoices() {
  const supabase = await createServerClient(); // Await the server client for Next.js 15
	
	  const { data, error } = await supabase
	    .from('billing_records')
	    .select('id')
	    .limit(1);
	
	  if (error) {
	    throw new Error(`Error en el ciclo de facturación: ${error.message}`);
	  }
	
	  return data;
}
