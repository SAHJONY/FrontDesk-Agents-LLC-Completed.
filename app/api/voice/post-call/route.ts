import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// Interface to prevent `any` type errors during build
interface PostCallPayload {
  businessId: string;
  customerPhone: string;
  duration: number;
  outcome: string;
  transcript?: string;
}

export async function POST(req: Request) {
  try {
    // Ensure request body is valid JSON
    const body: PostCallPayload = await req.json();

    const {
      businessId,
      customerPhone,
      duration,
      outcome,
      transcript,
    } = body;

    // Required field validation
    if (!businessId || !customerPhone || !outcome) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: businessId, customerPhone, or outcome",
        },
        { status: 400 }
      );
    }

    // ✅ Persist call log using Prisma model
    await db.callLogs.create({
      data: {
        businessId,
        customerPhone,
        duration: Number(duration) || 0,
        outcome,
        transcript: transcript || "",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Call log registered successfully",
    });
  } catch (error) {
    // Detailed logging for Vercel observability
    console.error("CRITICAL ERROR: POST /api/voice/post-call", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
