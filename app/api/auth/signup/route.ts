import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ... tu lógica real de signup ...

    return NextResponse.json({
      success: true,
      message: "Signup successful",
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message || "Signup failed" },
      { status: 400 }
    );
  }
}
