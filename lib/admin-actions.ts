// lib/admin-actions.ts
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // This key must stay on the server!
);

export async function getAllTenants() {
  // ... (Your code goes here)
}
