// app/api/demo-request/route.ts
import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      businessType,
      companyName,
      notes,
    } = body ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    const { error } = await supabase.from("demo_leads").insert({
      name,
      email,
      phone,
      business_type: businessType ?? null,
      company_name: companyName ?? null,
      notes: notes ?? null,
      source: "website-demo",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "DB_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Demo request API error:", err);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
