/**
 * Calculates revenue saved by the Autonomous Front Office
 * logic: (After-hours + Overflow Leads) * Avg Lead Value * Conversion %
 */

export const calculateRecoveredRevenue = (
  interactions: any[],
  avgLeadValue: number = 2500,
  conversionRate: number = 0.20
) => {
  const recovered = interactions.filter(i => {
    const isAfterHours = new Date(i.created_at).getHours() > 18 || new Date(i.created_at).getHours() < 8;
    const isOverflow = i.metadata?.concurrent_calls > 1;
    return isAfterHours || isOverflow;
  });

  return recovered.length * avgLeadValue * conversionRate;
};
