// supabase/functions/bland-webhook/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  const { call_id, transcript, summary, duration, completed } = await req.json()

  // This inserts the call data into the table you created in Image 1762
  const { error } = await supabase
    .from('call_results')
    .insert({
      transcript: transcript,
      summary: summary,
      call_duration_seconds: Math.round(duration),
      was_completed: completed
    })

  return new Response("OK", { status: 200 })
})
