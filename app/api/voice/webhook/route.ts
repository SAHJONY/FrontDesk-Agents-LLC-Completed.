import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import twilio from 'twilio'

// DO NOT initialize Twilio here at the top level. 
// It will crash the build if the environment variables are not found.

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const cookieStore = await cookies()

    // 1. Initialize Twilio ONLY when the request actually hits the server
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    // Safety check: Twilio library crashes if SID doesn't start with 'AC'
    const twilioClient = (accountSid && accountSid.startsWith('AC')) 
      ? twilio(accountSid, authToken) 
      : null;

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll() {}
        },
      }
    )

    // 2. Log to Supabase
    const { error: dbError } = await supabase
      .from('CallLog')
      .insert([{
        callId: body.call_id,
        phoneNumber: body.to,
        transcript: body.transcript,
        summary: body.concise_summary,
        duration: body.duration,
        status: body.status,
        recordingUrl: body.recording_url,
        estimatedValue: 50 
      }])

    if (dbError) console.error('Supabase Error:', dbError.message);

    // 3. Send SMS using the client initialized inside this function
    if (body.status === 'completed' && twilioClient) {
      try {
        await twilioClient.messages.create({
          body: `🚀 New Lead: ${body.to}\n\nSummary: ${body.concise_summary}\n\nListen: ${body.recording_url}`,
          from: process.env.TWILIO_PHONE_NUMBER || '', 
          to: process.env.CLIENT_MOBILE_NUMBER || '' 
        })
      } catch (smsError: any) {
        console.error('Twilio SMS Error:', smsError.message)
      }
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('Webhook Runtime Error:', err.message)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
