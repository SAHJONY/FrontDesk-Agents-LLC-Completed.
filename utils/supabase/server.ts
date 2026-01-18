import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  // Detect if the Super Admin is currently in 'Impersonation Mode'
  const impersonateId = cookieStore.get('impersonate_id')?.value

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: any) {
          try {
            cookiesToSet.forEach(({ name, value, options }: { name: string, value: string, options: any }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
      // --- IMPERSONATION OVERRIDE ---
      // We inject a custom header if we are impersonating. 
      // You can use this header in your Postgres RLS policies 
      // or to filter data in your server actions.
      global: impersonateId ? {
        headers: {
          'x-impersonate-user-id': impersonateId,
        },
      } : undefined,
    }
  )
}
