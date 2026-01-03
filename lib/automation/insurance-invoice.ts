import { createClient } from '@/lib/supabase/server';
import { resend } from '@/lib/mail/resend';

export async function generateMonthlyInsuranceInvoices() {
  const supabase = createClient();

  const { data: invoices, error } = await supabase
    .from('insurance_invoices')
    .select('*')
    .eq('status', 'pending');

  if (error) {
    throw error;
  }

  for (const invoice of invoices ?? []) {
    await resend.emails.send({
      from: 'billing@frontdeskagents.com',
      to: invoice.email,
      subject: 'Your Monthly Insurance Invoice',
      html: `<p>Your invoice amount is <strong>$${invoice.amount}</strong></p>`,
    });
  }

  return { sent: invoices?.length ?? 0 };
}
