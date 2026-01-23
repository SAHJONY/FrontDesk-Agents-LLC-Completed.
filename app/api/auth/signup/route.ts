import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
  [key: string]: unknown;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupBody;

    // Minimal read + validation to satisfy TS noUnusedLocals and prevent bad requests
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid email" },
        { status: 400 }
      );
    }

    // ... tu lógica real de signup (usa `body`, `email`, etc.) ...

    return NextResponse.json({
      success: true,
      message: "Signup successful",
      email,
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message || "Signup failed" },
      { status: 400 }
    );
  }
}
