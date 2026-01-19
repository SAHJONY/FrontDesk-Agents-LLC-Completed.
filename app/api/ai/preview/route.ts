// ... existing imports ...

export async function POST(req: Request) {
  const { message } = await req.json();
  const cookieStore = await cookies();
  const tenantId = cookieStore.get('tenant_id')?.value || req.headers.get('x-impersonated-user-id');

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // 1. Fetch knowledge with filenames
  const { data: knowledge } = await supabase
    .from('agent_knowledge')
    .select('file_name, content_summary')
    .eq('tenant_id', tenantId);

  // 2. Format context with labels
  const formattedContext = knowledge?.map(k => `SOURCE: ${k.file_name}\nCONTENT: ${k.content_summary}`).join('\n\n---\n\n') 
    || "No specific business knowledge uploaded yet.";

  // 3. Ask OpenAI to cite sources in a specific format
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: `You are an AI FrontDesk Agent. Use the provided business knowledge to answer. 
        IMPORTANT: At the very end of your response, list the 'Sources Used:' based on the SOURCE labels provided in the context. 
        If no source was used, do not add a source section.` 
      },
      { role: "system", content: `CONTEXT:\n${formattedContext}` },
      { role: "user", content: message }
    ]
  });

  return NextResponse.json({ reply: completion.choices[0].message.content });
}
