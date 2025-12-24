import { createClient } from '@/lib/supabase/server';
import { resend } from '@/lib/mail/resend'; // Ensure this matches exactly

export async function generateMonthlyInsuranceInvoices() {
  const supabase = await createClient(); // Await the server client for Next.js 15
  
  // Logic to calculate and send invoices for protected revenue
  // ...
}
