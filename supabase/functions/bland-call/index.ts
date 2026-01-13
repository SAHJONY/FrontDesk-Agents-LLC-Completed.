import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // 1. Initialize Supabase Client within the Edge Function
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // 2. Extract lead record and user metadata
  const { record, metadata } = await req.json() 

  // 3. FETCH DYNAMIC INSTRUCTIONS from FrontDesk Agents configuration
  // We default to 'sara' but you can pass this in your record if needed
  const { data: config } = await supabase
    .from('agent_config')
    .select('system_prompt')
    .eq('agent_id', 'sara') 
    .single()

  // Fallback prompt if the database query fails
  const dynamicTask = config?.system_prompt || `You are a professional SDR for FrontDesk Agents. Call ${record.full_name} to qualify them for a demo.`

  // 4. Trigger the Bland AI Call with dynamic intelligence
  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'authorization': Deno.env.get('BLAND_API_KEY')!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: record.phone_number,
      task: dynamicTask, // <--- No longer hardcoded! Uses your Settings UI.
      model: "enhanced", 
      voice: "nat",      
      metadata: {
        user_id: metadata?.user_id || record.user_id, 
        lead_id: record.id
      },
      request_data: {
        full_name: record.full_name,
        email: record.email || 'Not provided'
      }
    })
  })

  const result = await response.json()

  return new Response(
    JSON.stringify({ 
      status: 'FrontDesk Protocol Initiated', 
      call_id: result.call_id,
      agent_used: 'sara'
    }),
    { headers: { "Content-Type": "application/json" } }
  )
})
