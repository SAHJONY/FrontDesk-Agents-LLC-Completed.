import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createInternalServerClient() {
  const cookieStore = await cookies() // En Next 15, cookies() es async

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Se ignora si se llama desde un Server Component
          }
        },
      },
    }
  )
}
