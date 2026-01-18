'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Logic to impersonate a tenant. 
 * Since it's in a "use server" file, it won't crash the browser build.
 */
export async function impersonateTenant(ownerId: string) {
  const supabase = await createClient();

  // 1. Optional: Add a security check here to ensure the 
  // currently logged-in user is actually the Super Admin.
  
  // 2. Perform your logic (e.g., setting a session cookie or metadata)
  // 3. Redirect to the tenant's view
  redirect(`/dashboard/owner?impersonate=${ownerId}`);
}
