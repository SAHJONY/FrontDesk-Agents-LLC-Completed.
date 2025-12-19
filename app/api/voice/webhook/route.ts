import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import twilio from 'twilio'

// CEO Fix: Ensure SID and Token exist for Twilio initialization
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || ''
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
          setAll() {
            // Webhooks generally don't set cookies, but this satisfies the type
          }
        },
      }
    )

    // 1. Log the data to Supabase (Standardized for your Dashboard)
    const { error: dbError } = await supabase
      .from('CallLog') // Matched to your Admin table name
      .insert([{
        callId: body.call_id,
        phoneNumber: body.to,
        transcript: body.transcript,
        summary: body.concise_summary,
        duration: body.duration,
        status: body.status,
        recordingUrl: body.recording_url,
        estimatedValue: 50 // CEO Move: Default value for ROI tracking
      }])

    if (dbError) {
      console.error('Supabase Insert Error:', dbError.message)
      // Log the error but keep going to attempt SMS
    }

    // 2. Trigger "Hot Lead" SMS Notification
    if (body.status === 'completed') {
      try {
        // CEO Fix: Use "!" or "|| ''" to satisfy TypeScript string requirement
        await twilioClient.messages.create({
          body: `🚀 New Lead: ${body.to}\n\nSummary: ${body.concise_summary}\n\nListen: ${body.recording_url}`,
          from: process.env.TWILIO_PHONE_NUMBER || '', 
          to: process.env.CLIENT_MOBILE_NUMBER || '' 
        })
      } catch (smsError: any) {
        console.error('Twilio SMS Error:', smsError.message)
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Call processed successfully' 
    })

  } catch (err: any) {
    console.error('Webhook Runtime Error:', err.message)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
