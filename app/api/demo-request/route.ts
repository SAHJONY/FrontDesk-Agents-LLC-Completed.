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
      company,
      plan, // starter / pro / enterprise
      notes,
    } = body || {};

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Missing email" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    const { error } = await supabase.from("demo_requests").insert([
      {
        name: name ?? null,
        email,
        phone: phone ?? null,
        company: company ?? null,
        plan: plan ?? null,
        notes: notes ?? null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Demo request error", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}
