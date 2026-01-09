import { getSupabaseServer } from '@/lib/supabase-server';


/**
 * GLOBAL REVENUE AGGREGATOR
 * Handles multi-currency normalization and Partner Commission logic.
 */
export const financeAgent = {
  // Mock exchange rates (In production, fetch from an API like OpenExchangeRates)

let supabaseClient: ReturnType<typeof getSupabaseServer> | null = null;
function getSupabase() {
  if (!supabaseClient) {
    supabaseClient = getSupabaseServer();
  }
  return supabaseClient;
}
  rates: { GBP: 1.27, EUR: 1.10, AED: 0.27, AUD: 0.66, USD: 1 },

  async aggregateGlobalRevenue() {
    console.log("[FINANCE] Aggregating planetary revenue nodes...");
    
    const { data: invoices, error } = await supabase
      .from('invoices')
      .select('amount, currency, status, region, partner_id')
      .eq('status', 'PAID');

    if (error) throw error;

    return invoices.reduce((acc, inv) => {
      // Normalize everything to USD for the CEO's Master View
      const rate = this.rates[inv.currency as keyof typeof this.rates] || 1;
      const amountUSD = inv.amount * rate;
      
      acc.totalGrossUSD += amountUSD;
      acc.byRegion[inv.region] = (acc.byRegion[inv.region] || 0) + amountUSD;
      
      if (inv.partner_id) {
        acc.partnerCommissionsUSD += (amountUSD * 0.20); // 20% Standard Partner Cut
      }

      return acc;
    }, { totalGrossUSD: 0, partnerCommissionsUSD: 0, byRegion: {} as Record<string, number> });
  },

  async getPartnerStatement(partnerId: string) {
    const { data } = await supabase
      .from('invoices')
      .select('amount, currency, created_at')
      .eq('partner_id', partnerId)
      .eq('status', 'PAID');

    return data;
  }
};
