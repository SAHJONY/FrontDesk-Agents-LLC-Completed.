export const getTierLimits = (tier: string) => {
  switch (tier) {
    case 'BASIC': return { mins: 500, rate: 0.15 };
    case 'PROFESSIONAL': return { mins: 1500, rate: 0.12 };
    case 'GROWTH': return { mins: 4000, rate: 0.10 };
    case 'ELITE': return { mins: 10000, rate: 0.05 };
    default: return { mins: 0, rate: 0.20 };
  }
};

export const checkUsage = (currentMinutes: number, tier: string) => {
  const limit = getTierLimits(tier);
  if (currentMinutes > limit.mins) {
    return `Overage: Billing at $${limit.rate}/min`;
  }
  return "Within Tier Limits";
};
