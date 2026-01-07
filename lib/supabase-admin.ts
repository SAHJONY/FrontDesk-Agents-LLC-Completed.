import { createClient } from '@supabase/supabase-js';

// Validate environment variables for the pdx1 build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase Admin Environment Variables');
}

/**
 * Supabase Admin Client
 * Bypasses RLS for:
 * 1. Webhook processing (Bland.AI/Stripe)
 * 2. System-level revenue tracking
 * 3. Tenant provisioning
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
