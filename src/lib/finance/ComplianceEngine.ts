import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Ensure your ENV variables are set)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

interface TransactionAttempt {
  businessId: string;
  amount: number;
  customerName: string;
  type: string;
}

export const runComplianceCheck = async (attempt: TransactionAttempt) => {
  const { businessId, amount, customerName, type } = attempt;

  // 1. Velocity Check: Has this customer sent too much money in 24 hours?
  const { data: recentTxs } = await supabase
    .from('business_roi_stats')
    .select('amount')
    .eq('business_id', businessId)
    .eq('customer_name', customerName)
    .gte('recorded_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  const totalDailyVolume = (recentTxs?.reduce((sum, tx) => sum + tx.amount, 0) || 0) + amount;

  // 2. Threshold Logic (Local Market Limits)
  // Standard "Fair Use" limit: $3,000/day before manual review is required
  const COMPLIANCE_LIMIT = 3000;

  if (totalDailyVolume > COMPLIANCE_LIMIT) {
    return {
      status: 'FLAGGED',
      reason: 'Daily transaction limit exceeded for this customer.',
      action: 'REQUIRES_MANUAL_APPROVAL'
    };
  }

  // 3. Agentic Pattern Detection (RL Layer)
  // If the amount is just below the limit (e.g., $2,999), flag it as "Structuring"
  if (amount > 2900 && amount < 3000) {
    return {
      status: 'FLAGGED',
      reason: 'Potential structuring pattern detected by RL workforce.',
      action: 'NOTIFY_OWNER'
    };
  }

  // 4. Verification Check
  // Ensures the business is on the Elite ($1,499) tier for high-volume transactions
  const { data: tierData } = await supabase
    .from('business_roi_stats')
    .select('tier_level')
    .eq('business_id', businessId)
    .single();

  if (amount > 500 && tierData?.tier_level !== 'ELITE') {
    return {
      status: 'FLAGGED',
      reason: 'High-value transfers require Elite Tier compliance tools.',
      action: 'UPGRADE_REQUIRED'
    };
  }

  return { status: 'PASSED', action: 'PROCEED' };
};
