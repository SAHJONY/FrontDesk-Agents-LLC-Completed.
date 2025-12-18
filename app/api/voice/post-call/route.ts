import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      businessId,
      customerPhone,
      duration,
      outcome,
      transcript,
    } = body;

    if (!businessId || !customerPhone || !outcome) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ FIX: Using singular 'callLog' (Standard Prisma convention)
    // If your schema uses 'callLogs', ensure it's not being imported as a type/array
    await (db as any).callLog.create({
      data: {
        businessId,
        customerPhone,
        duration: Number(duration) || 0,
        outcome,
        transcript: transcript || "",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/voice/post-call error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
