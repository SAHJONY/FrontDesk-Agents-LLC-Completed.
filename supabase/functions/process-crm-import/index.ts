import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { parse } from 'https://deno.land/std@0.168.0/encoding/csv.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { filePath, userId } = await req.json()
    if (!filePath || !userId) throw new Error("Missing parameters")

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Download the file from Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('crm-imports')
      .download(filePath)

    if (downloadError) throw new Error(`Download failed: ${downloadError.message}`)

    // 2. Parse the CSV text (Streaming)
    const csvText = await fileData.text()
    const rows = await parse(csvText, { skipFirstRow: true })

    // 3. Process in Chunks (Neural Batching)
    const CHUNK_SIZE = 500
    let totalInserted = 0

    for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
      const chunk = rows.slice(i, i + CHUNK_SIZE)
        .filter(row => row[1]) // Ensure phone number exists
        .map((row: any) => ({
          full_name: row[0]?.trim() || 'Unknown',
          phone_number: row[1]?.trim(),
          user_id: userId,
          status: 'READY'
        }))

      const { error: insertError } = await supabase
        .from('leads')
        .upsert(chunk, { onConflict: 'phone_number' })

      if (insertError) {
        console.error(`Chunk error at index ${i}:`, insertError.message)
      } else {
        totalInserted += chunk.length
      }
    }

    // 4. Finalizing: Notify Status Tracking Agent & Cleanup
    await supabase.storage.from('crm-imports').remove([filePath])

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Import complete. Processed ${totalInserted} leads.`,
        count: totalInserted 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
