/**
 * FRONTDESK AGENTS - REVENUE CALCULATION ENGINE
 * Quantifies the financial impact of the Neural Suite.
 */

export function generateROIMetrics(stats: {
  appointmentsBooked: number;
  dealsClosedBySDR: number;
  avgDealValue: number;
  automatedHoursSaved: number;
}) {
  const directRevenue = stats.dealsClosedBySDR * stats.avgDealValue;
  const pipelineValue = stats.appointmentsBooked * (stats.avgDealValue * 0.2); // 20% close probability
  const laborSavings = stats.automatedHoursSaved * 25; // Estimated $25/hr for front desk labor

  return {
    totalImpact: directRevenue + pipelineValue + laborSavings,
    efficiencyGain: `${(stats.automatedHoursSaved / 160 * 100).toFixed(1)}%`, // Against a 160hr work month
    label: "Total Financial Sovereignty Impact"
  };
}
