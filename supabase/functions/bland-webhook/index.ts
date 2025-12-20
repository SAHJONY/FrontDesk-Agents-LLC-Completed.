// supabase/functions/bland-webhook/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  try {
    const body = await req.json()
    // Extract metadata we sent from the Dashboard (user_id and lead_id)
    const { call_id, status, transcript, summary, duration, completed, metadata } = body

    // 1. Handle "In-Progress" updates to show the pulse on the Dashboard
    if (status === 'started' || status === 'in-progress') {
      await supabase
        .from('call_results')
        .upsert({ 
          call_id, 
          status: 'In Call 📞', 
          user_id: metadata?.user_id || '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce' 
        })
    }

    // 2. Handle "Completed" events to save the final analysis
    if (status === 'completed' || completed === true) {
      // Basic Sentiment Scoring (Category 5.1)
      const isHot = transcript?.toLowerCase().includes('yes') || transcript?.toLowerCase().includes('interested')
      const sentiment = isHot ? 'Hot 🔥' : 'Neutral'

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
        .eq('call_id', call_id)

      if (error) console.error("Update Error:", error.message)
    }

    return new Response("OK", { status: 200 })
  } catch (err) {
    console.error("Webhook Error:", err.message)
    return new Response("Error", { status: 500 })
  }
})
