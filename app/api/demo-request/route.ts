// app/api/demo-request/route.ts
import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

/**
 * API para manejar el formulario de "Request Demo".
 * Guarda los datos en la tabla "demo_requests" en Supabase.
 *
 * Espera un body JSON con:
 * {
 *   name?: string;
 *   email: string;
 *   phone?: string;
 *   company?: string;
 *   plan?: string;
 *   notes?: string;
 * }
 */
export async function POST(req: Request) {
  try {
    const supabase = createServerSupabase();
    const body = await req.json();

    const {
      name = "",
      email,
      phone = "",
      company = "",
      plan = "",
      notes = "",
    } = body ?? {};

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Missing required field: email" },
        { status: 400 }
      );
    }

    // Cambia "demo_requests" por el nombre real de tu tabla si es diferente
    const { error } = await supabase.from("demo_requests").insert([
      {
        name,
        email,
        phone,
        company,
        plan,
        notes,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error (demo_requests):", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("Unexpected error in demo-request API:", err);
    return NextResponse.json(
      { ok: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
