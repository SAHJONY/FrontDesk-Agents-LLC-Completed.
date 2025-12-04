// app/api/demo-request/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Aquí LOG nada más, para debug (se ve en logs de Vercel)
    console.log("Demo request received:", body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in demo-request route:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
