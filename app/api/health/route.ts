import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return cookieStore.getAll() } } }
    )

    // Test the database connection
    const { error } = await supabase.from('calls').select('count').limit(1)
    
    if (error) throw error

    return NextResponse.json({ status: 'healthy', timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ status: 'unhealthy', error: 'Database Connection Failed' }, { status: 500 })
  }
}
