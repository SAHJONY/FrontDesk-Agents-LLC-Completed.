export async function POST(req: Request) {
  const { call_id, analysis, tenant_id } = await req.json();

  if (analysis.intent === 'payment_recovered' || analysis.intent === 'sale_closed') {
    await supabase.from('revenue_events').insert({
      tenant_id,
      recovered_amount: analysis.amount || 0,
      source_call_id: call_id
    });
    // Triggers Stripe Success Fee Invoice
  }
}
