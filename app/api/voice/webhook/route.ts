import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  
  // Initialize Supabase with service role for backend bypass or admin client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use Service Role Key for background tasks
    { cookies: { getAll: () => [] } }
  )

  const { error } = await supabase
    .from('call_logs')
    .insert([{
      call_id: body.call_id,
      phone_number: body.to,
      transcript: body.transcript,
      summary: body.concise_summary,
      duration: body.duration,
      status: body.status,
      client_name: body.metadata?.client_name || 'FrontDesk Agents LLC'
    }])

  if (error) {
    console.error('Webhook Save Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
