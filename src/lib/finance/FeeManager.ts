export const calculateFinalAmount = (amount: number, tier: string) => {
  const PLATFORM_FEE = tier === 'ELITE' ? 0.25 : (amount * 0.01); // Elite pays flat, others pay %
  const AGENT_COMMISSION = amount * 0.02; // The local business owner's profit
  const TOTAL_FEES = PLATFORM_FEE + AGENT_COMMISSION;

  return {
    customerPays: amount + TOTAL_FEES,
    businessOwnerEarns: AGENT_COMMISSION,
    platformRevenue: PLATFORM_FEE,
    netTransfer: amount
  };
};
