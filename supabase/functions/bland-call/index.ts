// supabase/functions/bland-call/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { record } = await req.json() // Data from your 'leads' table

  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'authorization': 'YOUR_BLAND_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: record.phone_number,
      task: "You are an SDR calling " + record.full_name + " to book a demo.",
      model: "enhanced", // Best for Category 1.1 Sales calls
      voice: "nat",      // Friendly, professional voice
      request_data: {
        full_name: record.full_name,
        email: record.email
      }
    })
  })

  return new Response(JSON.stringify({ status: 'Bland Call Sent' }))
})
