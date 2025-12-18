import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * WEBHOOK ENDPOINT: Receives post-call data from Bland AI
 * This runs automatically every time a call ends.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // We await cookies() to comply with Next.js 15 async headers
    const cookieStore = await cookies()

    // Initialize Supabase with Service Role Key to bypass RLS for data logging
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, 
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      }
    )

    // Log the incoming data to Supabase
    const { error } = await supabase
      .from('call_logs')
      .insert([{
        call_id: body.call_id,
        phone_number: body.to, // The number the AI called/received
        transcript: body.transcript,
        summary: body.concise_summary, // Bland's AI-generated summary
        duration: body.duration, // Duration in seconds
        status: body.status, // e.g., 'completed', 'busy'
        recording_url: body.recording_url, // NEW: Link to the audio file
        client_name: body.metadata?.client_name || 'FrontDesk Agents LLC'
      }])

    if (error) {
      console.error('Supabase Insert Error:', error.message)
      return NextResponse.json({ error: 'Failed to save call log' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Call log and recording saved successfully' 
    })

  } catch (err: any) {
    console.error('Webhook Runtime Error:', err.message)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
