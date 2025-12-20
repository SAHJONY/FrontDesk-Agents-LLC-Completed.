import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  // Extract the record and the metadata (which contains the user_id)
  const { record, metadata } = await req.json() 

  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'authorization': Deno.env.get('BLAND_API_KEY')!, // Uses your secret key from .env
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: record.phone_number,
      task: `You are a professional SDR for FrontDesk Agents. Call ${record.full_name} to qualify them for a demo.`,
      model: "enhanced", 
      voice: "nat",      
      // metadata is returned to the webhook so we can link data back to the user
      metadata: {
        user_id: metadata?.user_id || record.user_id, 
        lead_id: record.id
      },
      // request_data allows the AI to use these variables in the conversation
      request_data: {
        full_name: record.full_name,
        email: record.email
      }
    })
  })

  const result = await response.json()

  return new Response(
    JSON.stringify({ status: 'Bland Call Sent', call_id: result.call_id }),
    { headers: { "Content-Type": "application/json" } }
  )
})
