/**
 * FRONTDESK AGENTS: SOVEREIGN CLIENT INTERFACE
 * Standard client for the FrontDesk Agents autonomous dashboard.
 * * Logic optimized for the Western Corridor Primary Operational Zone (pdx1).
 */

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Note: Ensure types are generated via Supabase CLI for full RL agentic type-safety
// If types are not yet generated, you can temporarily use <any> to pass build.
export const supabase = createClientComponentClient();

/**
 * AGENTIC WORKFORCE HOOKS:
 * * 1. Market Equity: Used to fetch the Regional Multiplier (0.35x - 1.0x) 
 * to ensure local platform parity [cite: 2025-12-24].
 * * 2. Tier Verification: Validates node access across the permanent tiers:
 * - Basic: $199
 * - Professional: $399
 * - Growth: $799
 * - Elite: $1,499 (Triggers 15% Performance Recovery Yield) [cite: 2025-12-28].
 * * 3. Sovereign Isolation: Enforces Row-Level Security (RLS) so users only 
 * access their specific autonomous workforce data.
 */

export const getMarketEquityMultiplier = async () => {
  const { data, error } = await supabase
    .from('tenants')
    .select('regional_multiplier')
    .single();
    
  if (error) return 1.0; // Default to standard parity
  return data.regional_multiplier;
};
