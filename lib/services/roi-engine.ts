export function generateForensicROI(lead: any) {
  const industryBenchmarks: Record<string, any> = {
    medical: { leadValue: 150, missedCallRate: 0.35 },
    legal: { leadValue: 500, missedCallRate: 0.28 },
    trades: { leadValue: 250, missedCallRate: 0.42 },
    default: { leadValue: 100, missedCallRate: 0.30 }
  };

  const benchmark = industryBenchmarks[lead.industry.toLowerCase()] || industryBenchmarks.default;
  
  // Calculations
  const monthlyMissedCalls = lead.estimatedVolume * benchmark.missedCallRate;
  const annualRevenueLeakage = monthlyMissedCalls * benchmark.leadValue * 12;
  const sovereignEfficiency = 0.98; // Sovereign agents catch 98% of traffic

  return {
    leakage: annualRevenueLeakage,
    recoveryPotential: annualRevenueLeakage * sovereignEfficiency,
    currency: lead.currency || 'USD',
    direction: lead.direction // 'ltr' or 'rtl'
  };
}
