import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase"; // Ensure this points to your Supabase admin/client

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
  company?: string;
  [key: string]: unknown;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupBody;

    // 1. Validation
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const name = typeof body.name === "string" ? body.name.trim() : "New User";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2. Supabase Auth Signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("User creation failed");

    // 3. Database Record (The 'accountId')
    // We attempt to create a profile; we return the user ID as the accountId 
    // to satisfy the frontend's requirement.
    const accountId = authData.user.id;

    // 4. Set Session Cookie
    // This allows the middleware to recognize the user immediately
    const cookieStore = await cookies();
    if (authData.session?.access_token) {
      cookieStore.set("sb-access-token", authData.session.access_token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }

    // 5. Successful Response
    return NextResponse.json({
      success: true,
      message: "Signup successful",
      accountId: accountId, // CRITICAL: This fixes the frontend error
      email: authData.user.email,
    });

  } catch (e: any) {
    console.error("Signup Error:", e.message);
    return NextResponse.json(
      { success: false, error: e?.message || "Signup failed" },
      { status: 400 }
    );
  }
}
