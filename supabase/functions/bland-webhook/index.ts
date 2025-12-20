// supabase/functions/bland-webhook/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  try {
    const body = await req.json()
    const { call_id, status, transcript, summary, duration, completed, metadata } = body

    // 1. LIVE STATUS UPDATES (Dashboard Pulse)
    if (status === 'started' || status === 'in-progress') {
      await supabase
        .from('call_results')
        .upsert({ 
          call_id, 
          status: 'In Call 📞', 
          user_id: metadata?.user_id || '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce' 
        })
    }

    // 2. FINAL ANALYSIS & CALENDAR FOLLOW-UP
    if (status === 'completed' || completed === true) {
      const isHot = transcript?.toLowerCase().includes('yes') || 
                    transcript?.toLowerCase().includes('interested') ||
                    transcript?.toLowerCase().includes('interesado');
      
      const sentiment = isHot ? 'Hot 🔥' : 'Neutral';

      // Update DB with results
      const { error } = await supabase
        .from('call_results')
        .update({
          status: 'Completed ✅',
          transcript,
          summary,
          call_duration_seconds: Math.round(duration || 0),
          was_completed: true,
          sentiment_score: sentiment
        })
        .eq('call_id', call_id);

      if (error) console.error("Database Update Error:", error.message);

      // --- TRIGGER CALENDAR SMS (Category 4.1 & 7.1) ---
      if (isHot) {
        const TWILIO_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
        const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
        const TWILIO_PHONE = Deno.env.get('TWILIO_PHONE_NUMBER');

        const leadName = metadata?.full_name || 'Prospecto';
        const destinationPhone = metadata?.phone_number;

        // Replace with your actual Calendly link
        const calendarLink = `https://calendly.com/j-gonzalez/follow-up`;

        if (destinationPhone && TWILIO_SID && TWILIO_AUTH_TOKEN) {
          const smsBody = `¡Hola ${leadName}! Soy SARA. Noté que estás interesado en avanzar. Reserva un espacio en mi calendario aquí para concretar los detalles: ${calendarLink}`;

          await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
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
          
          console.log(`🔥 Conversion: SMS sent to ${leadName} with calendar link.`);
        }
      }
    }

    return new Response("OK", { status: 200 })
  } catch (err) {
    console.error("Webhook Error:", err.message)
    return new Response("Error", { status: 500 })
  }
})
