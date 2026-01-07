import { createClient } from '@supabase/supabase-js';

// Validate environment variables for the pdx1 build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key-for-build';

// Warn if using placeholder values
if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseServiceKey === 'placeholder-key-for-build') {
  console.warn('⚠️  Using placeholder Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
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
