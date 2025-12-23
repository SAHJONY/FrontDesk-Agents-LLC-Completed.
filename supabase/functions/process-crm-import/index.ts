import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { parse } from 'https://deno.land/std@0.168.0/encoding/csv.ts'

serve(async (req) => {
  try {
    const { filePath, userId } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Download the file from Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('crm-imports')
      .download(filePath)

    if (downloadError) throw downloadError

    // 2. Parse the CSV text
    const csvText = await fileData.text()
    const rows = await parse(csvText, { skipFirstRow: true })

    // 3. Process in Chunks (Neural Batching)
    const CHUNK_SIZE = 500
    for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
      const chunk = rows.slice(i, i + CHUNK_SIZE).map((row: any) => ({
        full_name: row[0]?.trim(),
        phone_number: row[1]?.trim(),
        user_id: userId,
        status: 'READY'
      }))

      // Upsert prevents duplicates based on phone_number if you have a unique constraint
      const { error: insertError } = await supabase
        .from('leads')
        .upsert(chunk, { onConflict: 'phone_number' })

      if (insertError) console.error(`Chunk error: ${insertError.message}`)
    }

    // 4. Cleanup: Remove the temp file
    await supabase.storage.from('crm-imports').remove([filePath])

    return new Response(JSON.stringify({ success: true, count: rows.length }), {
      headers: { "Content-Type": "application/json" },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
