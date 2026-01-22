// lib/supabase/server.ts
import 'server-only'
import { cookies } from 'next/headers'
import { createServerClient as _createServerClient } from '@supabase/ssr'

export async function createServerClient() {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      'Missing env vars: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }

  return _createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet: { name: string; value: string; options: any }[]) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // no-op (can fail in some environments)
        }
      },
    },
  })
}

/**
 * Backwards-compatible alias used across route handlers.
 */
export async function requireSupabaseServer() {
  return createServerClient()
}
