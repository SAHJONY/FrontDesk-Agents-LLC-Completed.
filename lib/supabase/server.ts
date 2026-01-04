import { cookies } from 'next/headers'
import { createServerClient as _createServerClient } from '@supabase/ssr'

export const runtime = 'nodejs'

export async function createServerClient() {
  const cookieStore = await cookies() // Next.js 15: cookies() es async

  return _createServerClient(
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
            // Ignorar en Server Components
          }
        },
      },
    }
  )
}
