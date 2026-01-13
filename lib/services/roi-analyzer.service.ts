export function calculateShadowROI(leads: any[]) {
  const MONTHLY_SUBSCRIPTION = 299; // Standard Tier
  const LEAD_CONVERSION_RATE = 0.25; // Target 25% of shadow leads
  
  const totalLeads = leads.length;
  const projectedMonthlyRevenue = totalLeads * LEAD_CONVERSION_RATE * MONTHLY_SUBSCRIPTION;
  const annualValue = projectedMonthlyRevenue * 12;

  return {
    potentialMonthly: projectedMonthlyRevenue,
    potentialAnnual: annualValue,
    marketDiversity: [...new Set(leads.map(l => l.language))].length
  };
}
