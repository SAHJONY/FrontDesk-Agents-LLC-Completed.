// lib/supabase-admin.ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!url) {
  throw new Error("Missing Supabase URL: set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL)");
}
if (!serviceKey) {
  throw new Error(
    "Missing Supabase service key: set SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY)"
  );
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
