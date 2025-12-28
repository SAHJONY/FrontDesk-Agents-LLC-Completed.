// services/reports.ts

export const generateWeeklyReport = (
  tierName: string, 
  minutesUsed: number, 
  appointmentsBooked: number
) => {
  const avgHumanLaborCost = 25.00; // Hourly rate including taxes/benefits
  const minutesInHour = 60;
  
  // Calculate Savings
  const equivalentHumanCost = (minutesUsed / minutesInHour) * avgHumanLaborCost;
  const platformCostPerWeek = getWeeklyTierCost(tierName); // e.g., $399 / 4
  const netSavings = equivalentHumanCost - platformCostPerWeek;

  return {
    period: "Dec 21 - Dec 27, 2025",
    tier: tierName,
    metrics: {
      minutesActive: minutesUsed,
      callsHandled: Math.round(minutesUsed / 3.5), // Avg 3.5 mins per call
      appointments: appointmentsBooked,
      revenueCaptured: appointmentsBooked * 150, // Based on $150 avg service value
    },
    economics: {
      humanLaborEquivalent: equivalentHumanCost.toFixed(2),
      netSavings: netSavings.toFixed(2),
      roiMultiplier: ((appointmentsBooked * 150) / platformCostPerWeek).toFixed(1)
    }
  };
};

function getWeeklyTierCost(tier: string) {
  const prices: Record<string, number> = { BASIC: 199, PROFESSIONAL: 399, GROWTH: 799, ELITE: 1499 };
  return (prices[tier] || 399) / 4;
}
