// services/usage-monitor.ts

const TIER_LIMITS = {
  STARTER: 500,
  GROWTH: 1000,
  SCALE: 1500
};

export async function checkCustomerUsage(customerId: string, tier: keyof typeof TIER_LIMITS) {
  const usedMinutes = await getNeuralMinutesUsed(customerId);
  const limit = TIER_LIMITS[tier];
  const percentage = (usedMinutes / limit) * 100;

  // 80% Threshold Alert
  if (percentage >= 80 && percentage < 100) {
    await sendUsageWarning(customerId, usedMinutes, limit);
  }

  // Overage Activation
  if (usedMinutes > limit) {
    const overage = usedMinutes - limit;
    await triggerOverageBilling(customerId, overage, tier);
  }
}
