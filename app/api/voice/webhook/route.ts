import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import twilio from 'twilio'

// Initialize Twilio Client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const cookieStore = await cookies()

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

    // 1. Log the data to Supabase
    const { error: dbError } = await supabase
      .from('call_logs')
      .insert([{
        call_id: body.call_id,
        phone_number: body.to,
        transcript: body.transcript,
        summary: body.concise_summary,
        duration: body.duration,
        status: body.status,
        recording_url: body.recording_url,
        client_name: body.metadata?.client_name || 'FrontDesk Agents LLC'
      }])

    if (dbError) {
      console.error('Supabase Insert Error:', dbError.message)
      return NextResponse.json({ error: 'Failed to save call log' }, { status: 500 })
    }

    // 2. Trigger "Hot Lead" SMS Notification
    // We only send an SMS if the call was completed and not a busy/no-answer
    if (body.status === 'completed') {
      try {
        await twilioClient.messages.create({
          body: `🚀 New Lead: ${body.to}\n\nSummary: ${body.concise_summary}\n\nListen: ${body.recording_url}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: process.env.CLIENT_MOBILE_NUMBER // Business owner's phone
        })
      } catch (smsError: any) {
        console.error('Twilio SMS Error:', smsError.message)
        // We don't return an error here so the webhook still succeeds if only SMS fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Call logged and notification sent' 
    })

  } catch (err: any) {
    console.error('Webhook Runtime Error:', err.message)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
