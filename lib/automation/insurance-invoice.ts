import { createClient } from '@/lib/supabase/server';
import { resend } from '@/lib/mail/resend';

export async function generateMonthlyInsuranceInvoices() {
  const supabase = createClient();
  const today = new Date();
  const monthLabel = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  // 1. Fetch all High-Value referrals sent this month
  const { data: referrals } = await supabase
    .from('insurance_referrals')
    .select('*, partners(business_name, email, referral_rate)')
    .eq('billed', false)
    .gt('estimated_claim', 10000);

  if (!referrals || referrals.length === 0) return "No claims to bill.";

  // 2. Group by Partner and Calculate Fees
  const partnerInvoices = referrals.reduce((acc: any, ref) => {
    const partnerId = ref.partner_id;
    if (!acc[partnerId]) acc[partnerId] = { name: ref.partners.business_name, email: ref.partners.email, total: 0, count: 0 };
    
    // Logic: Standard $500 flat fee + 2% of the estimated claim value
    const fee = 500 + (ref.estimated_claim * 0.02);
    acc[partnerId].total += fee;
    acc[partnerId].count += 1;
    return acc;
  }, {});

  // 3. Dispatch Invoices
  for (const partnerId in partnerInvoices) {
    const invoice = partnerInvoices[partnerId];
    await resend.emails.send({
      from: 'billing@frontdesk-agents.com',
      to: invoice.email,
      subject: `Sovereign HQ: Insurance Referral Invoice - ${monthLabel}`,
      html: `
        <h1>Monthly Referral Summary</h1>
        <p>Partner: ${invoice.name}</p>
        <p>Claims Referred: ${invoice.count}</p>
        <p><strong>Total Due: $${invoice.total.toLocaleString()}</strong></p>
        <hr />
        <p>System processed these First Notice of Loss (FNOL) reports via AI Dispatch.</p>
      `
    });
    
    // Mark as billed in DB to prevent double-charging
    await supabase.from('insurance_referrals').update({ billed: true }).eq('partner_id', partnerId);
  }

  return `Generated ${Object.keys(partnerInvoices).length} invoices.`;
        }
