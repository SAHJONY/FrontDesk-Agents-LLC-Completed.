// supabase/functions/bland-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Initialize Supabase with Service Role Key for administrative access
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  try {
    const body = await req.json()
    const { 
      call_id, 
      status, 
      transcript, 
      summary, 
      duration, 
      completed, 
      metadata,
      concatenated_transcript 
    } = body

    // 1. LIVE STATUS UPDATES (Dashboard Pulse)
    // Updates the dashboard to 'In Call' as soon as the agent starts.
    if (status === 'started' || status === 'in-progress') {
      await supabase
        .from('call_results')
        .upsert({ 
          call_id, 
          status: 'In Call 📞', 
          user_id: metadata?.user_id || '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce' 
        })
    }

    // 2. FINAL ANALYSIS & CONVERSION LOGIC
    if (status === 'completed' || completed === true) {
      // Logic to determine if the lead is "Hot" based on the conversation.
      const fullTranscript = concatenated_transcript || transcript || "";
      const isHot = fullTranscript.toLowerCase().includes('yes') || 
                    fullTranscript.toLowerCase().includes('interested') ||
                    fullTranscript.toLowerCase().includes('interesado') ||
                    summary?.toLowerCase().includes('booked');
      
      const sentiment = isHot ? 'Hot 🔥' : 'Neutral';
      const finalStatus = isHot ? 'Meeting Booked 📅' : 'Completed ✅';

      // Update Database with the full post-call analysis.
      const { error: dbError } = await supabase
        .from('call_results')
        .update({
          status: finalStatus,
          transcript: fullTranscript,
          summary: summary || "Call finished.",
          call_duration_seconds: Math.round(duration || 0),
          was_completed: true,
          sentiment_score: sentiment
        })
        .eq('call_id', call_id);

      if (dbError) console.error("Database Update Error:", dbError.message);

      // 3. AUTOMATED FRONTDESK AGENTS FOLLOW-UP (Category 4.1 & 7.1)
      // Only trigger if the lead expressed high interest.
      if (isHot) {
        const TWILIO_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
        const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
        const TWILIO_PHONE = Deno.env.get('TWILIO_PHONE_NUMBER');

        const leadName = metadata?.full_name || 'Prospecto';
        const destinationPhone = metadata?.phone_number;

        // The branded calendar link for FrontDesk Agents follow-ups.
        const calendarLink = `https://calendly.com/frontdesk-agents/follow-up`;

        if (destinationPhone && TWILIO_SID && TWILIO_AUTH_TOKEN) {
          const smsBody = `¡Hola ${leadName}! Soy SARA de FrontDesk Agents. Noté que estás interesado en avanzar. Reserva un espacio en mi calendario aquí para concretar los detalles: ${calendarLink}`;

          // Execute SMS dispatch via Twilio API.
          const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${btoa(`${TWILIO_SID}:${TWILIO_AUTH_TOKEN}`)}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              To: destinationPhone,
              From: TWILIO_PHONE!,
              Body: smsBody,
            }),
          });
          
          if (twilioRes.ok) {
            console.log(`🔥 Conversion: SMS protocol executed for ${leadName}.`);
          }
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { "Content-Type": "application/json" } 
    })
  } catch (err) {
    console.error("Webhook Execution Failure:", err.message)
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" } 
    })
  }
})
