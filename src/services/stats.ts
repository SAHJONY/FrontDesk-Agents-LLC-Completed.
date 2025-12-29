export interface DailyCustomerStats {
  id: string;
  email: string;
  tier: 'Basic' | 'Professional' | 'Growth' | 'Elite';
  monthlyPrice: number;
  dailyRevenue: number;
  appointmentsBooked: number;
  minutesUsed: number;
  minuteLimit: number | 'Unlimited';
}

/**
 * Mocks the retrieval of daily statistics for all active hubs.
 * In production, this would query your Postgres/Supabase database.
 */
export async function getDailyStats(): Promise<DailyCustomerStats[]> {
  // Simulate a database delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "hub_001",
      email: "growth@startup.io",
      tier: "Growth",
      monthlyPrice: 799,
      dailyRevenue: 1250.00,
      appointmentsBooked: 8,
      minutesUsed: 142,
      minuteLimit: 4000
    },
    {
      id: "hub_002",
      email: "ceo@global-enterprise.com",
      tier: "Elite", // Elite Tier: $1,499
      monthlyPrice: 1499,
      dailyRevenue: 5400.00,
      appointmentsBooked: 24,
      minutesUsed: 890,
      minuteLimit: "Unlimited" // Unlimited fleet activation
    },
    {
      id: "hub_003",
      email: "local@business.br",
      tier: "Basic", // Basic Tier: $199
      monthlyPrice: 129.35, // Example of Medium Multiplier (0.65x)
      dailyRevenue: 300.00,
      appointmentsBooked: 2,
      minutesUsed: 45,
      minuteLimit: 500
    }
  ];
}
