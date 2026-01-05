// services/usage-monitor.ts

const TIER_LIMITS = {
  STARTER: 500,
  GROWTH: 1000,
  SCALE: 1500
};

async function getNeuralMinutesUsed(_customerId: string): Promise<number> {
  // Placeholder for actual database query
  return 450;
}

async function sendUsageWarning(customerId: string, used: number, limit: number): Promise<void> {
  // Placeholder for notification service
  console.log(`[USAGE WARNING] Customer ${customerId} used ${used}/${limit} minutes.`);
}

async function triggerOverageBilling(customerId: string, overage: number, tier: keyof typeof TIER_LIMITS): Promise<void> {
  // Placeholder for billing service
  console.log(`[OVERAGE] Customer ${customerId} triggered ${overage} minutes of overage on tier ${tier}.`);
}

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
