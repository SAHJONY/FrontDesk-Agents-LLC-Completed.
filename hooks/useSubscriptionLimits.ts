export function useSubscriptionLimits(userTier: string, currentLocations: number) {
  const limits: Record<string, number> = {
    Starter: 1,
    Professional: 5,
    Growth: 15,
    Enterprise: 100,
  };

  const limit = limits[userTier] || 1;
  const isOverLimit = currentLocations >= limit;

  return {
    limit,
    isOverLimit,
    remaining: limit - currentLocations,
    nextTier: userTier === "Starter" ? "Professional" : "Growth"
  };
}
