// supabase/functions/bland-webhook/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  try {
    const body = await req.json()
    // Extract everything needed from the Bland AI payload
    const { call_id, status, transcript, summary, duration, completed, metadata } = body

    // 1. Handle "In-Progress" updates (Shows the pulse on your Dashboard)
    if (status === 'started' || status === 'in-progress') {
      await supabase
        .from('call_results')
        .upsert({ 
          call_id, 
          status: 'In Call 📞', 
          user_id: metadata?.user_id || '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce' 
        })
    }

    // 2. Handle "Completed" events
    if (status === 'completed' || completed === true) {
      // Basic Sentiment Scoring (Category 5.1)
      const isHot = transcript?.toLowerCase().includes('yes') || 
                    transcript?.toLowerCase().includes('interested') ||
                    transcript?.toLowerCase().includes('interesado');
      
      const sentiment = isHot ? 'Hot 🔥' : 'Neutral';

      // Update Database with final results
      const { error } = await supabase
        .from('call_results')
        .update({
          status: 'Completed ✅',
          transcript: transcript,
          summary: summary,
          call_duration_seconds: Math.round(duration || 0),
          was_completed: true,
          sentiment_score: sentiment
        })
        .eq('call_id', call_id);

      if (error) console.error("Database Update Error:", error.message);

      // --- TWILIO SMS TRIGGER (Category 4.1) ---
      if (isHot) {
        const TWILIO_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
        const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
        const TWILIO_PHONE = Deno.env.get('TWILIO_PHONE_NUMBER');

        // Personalize the message using metadata sent from your dashboard
        const leadName = metadata?.full_name || 'Prospecto';
        const destinationPhone = metadata?.phone_number;

        if (destinationPhone && TWILIO_SID && TWILIO_AUTH_TOKEN) {
          const smsBody = `¡Hola ${leadName}! Fue un gusto hablar contigo. Aquí tienes el link para agendar nuestra reunión: https://calendly.com/tu-empresa`;

          const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
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

          if (!response.ok) {
            console.error("Twilio SMS Error:", await response.text());
          }
        }
      }
    }

    return new Response("OK", { status: 200 })
  } catch (err) {
    console.error("Webhook Error:", err.message)
    return new Response("Error", { status: 500 })
  }
})
