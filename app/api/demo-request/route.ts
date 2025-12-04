// app/api/demo-request/route.ts
import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

type DemoRequestBody = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  notes?: string;
  plan?: string;
  locale?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as DemoRequestBody;
    const { name, email, company, phone, notes, plan, locale } = body;

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    // Cambia "demo_requests" por el nombre real de tu tabla si es otro
    const { error } = await supabase.from("demo_requests").insert([
      {
        name: name || null,
        email,
        company: company || null,
        phone: phone || null,
        notes: notes || null,
        plan: plan || null,
        locale: locale || "en",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error inserting demo request:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to save demo request" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in demo-request route:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
