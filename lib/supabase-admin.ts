import { createClient } from '@supabase/supabase-js';

// Use placeholder values during build, real values at runtime
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key-for-build';

/**
 * Supabase Admin Client
 * Bypasses RLS for:
 * 1. Webhook processing (Bland.AI/Stripe)
 * 2. System-level revenue tracking
 * 3. Tenant provisioning
 * 
 * Note: Uses placeholder values during build if env vars not available.
 * Real credentials must be set in Vercel environment variables for runtime.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
