// ... existing imports

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { call_id, transcript, recording_url, duration, to, from } = body;

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    // 1. Enhanced AI Analysis (Structured Data)
    let analysis = {
      summary: "No transcript available.",
      sentiment: "Neutral",
      is_lead: false
    };

    if (transcript) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: `Analyze the transcript and return ONLY a JSON object: 
            {
              "summary": "one sentence summary",
              "sentiment": "Positive | Neutral | Frustrated",
              "is_lead": true/false
            }
            Base "is_lead" on whether they want to book, buy, or schedule.` 
          },
          { role: "user", content: transcript }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = completion.choices[0].message.content;
      if (content) analysis = JSON.parse(content);
    }

    // 2. Fetch Tenant Info
    const { data: phoneData } = await supabase
      .from('phone_numbers')
      .select(`tenant_id, tenants (email, name)`)
      .eq('phone_number', to)
      .single();

    const tenantInfo = phoneData?.tenants as any;

    // 3. Save with Sentiment
    await supabase.from('call_logs').upsert({
      tenant_id: phoneData?.tenant_id,
      call_id,
      customer_number: from,
      transcript,
      recording_url,
      duration,
      summary: analysis.summary,
      sentiment: analysis.sentiment, // Make sure this column exists in your DB!
      status: 'completed'
    }, { onConflict: 'call_id' });

    // 4. Update Email with "Mood"
    if (analysis.is_lead && tenantInfo?.email) {
      const moodEmoji = analysis.sentiment === 'Positive' ? '😊' : analysis.sentiment === 'Frustrated' ? '⚠️' : '😐';
      
      await sendLeadNotification(tenantInfo.email, {
        customer_number: from,
        summary: `${moodEmoji} [${analysis.sentiment}] ${analysis.summary}`,
        call_id,
        duration
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
