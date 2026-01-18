'use server'; // THIS IS CRITICAL

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function impersonateTenant(ownerId: string) {
  const supabase = await createClient();
  
  // Logic to set session or cookie to act as this user
  // ... your impersonation logic ...
  
  redirect(`/dashboard?as=${ownerId}`);
}
