// app/api/ai/preview/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getTenantId(req: Request) {
  const cookieStore = cookies();
  return (
    cookieStore.get("tenant_id")?.value ||
    req.headers.get("x-impersonated-user-id") ||
    null
  );
}

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const tenantId = getTenantId(req);
    if (!tenantId) {
      return NextResponse.json({ error: "Missing tenantId" }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase configuration missing" },
        { status: 500 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI configuration missing" },
        { status: 500 }
      );
    }

    // 1) Fetch knowledge with filenames
    const { data: knowledge, error: knowledgeError } = await supabase
      .from("agent_knowledge")
      .select("file_name, content_summary")
      .eq("tenant_id", tenantId);

    if (knowledgeError) {
      return NextResponse.json(
        { error: "Failed to load knowledge", details: knowledgeError.message },
        { status: 500 }
      );
    }

    // 2) Format context with labels
    const formattedContext =
      knowledge?.length
        ? knowledge
            .map((k) => {
              const file = k?.file_name || "unknown_file";
              const summary = k?.content_summary || "";
              return `SOURCE: ${file}\nCONTENT: ${summary}`;
            })
            .join("\n\n---\n\n")
        : "No specific business knowledge uploaded yet.";

    // 3) Ask OpenAI to cite sources in a specific format
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI FrontDesk Agent. Use the provided business knowledge to answer.\n" +
            "IMPORTANT: At the very end of your response, list the 'Sources Used:' based on the SOURCE labels provided in the context.\n" +
            "If no source was used, do not add a source section.",
        },
        { role: "system", content: `CONTEXT:\n${formattedContext}` },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content || "";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("❌ AI preview error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
