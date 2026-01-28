import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
  company?: string;
  subdomain?: string;
  country?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupBody;

    // 1. Validation
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const name = typeof body.name === "string" ? body.name.trim() : "New User";
    const company = typeof body.company === "string" ? body.company.trim() : "";

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
        data: { full_name: name, company_name: company },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("User creation failed");

    const userId = authData.user.id;

    // 3. Sync to Public 'users' table
    // This is crucial for your dashboard logic to work
    const { error: dbError } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: email,
        full_name: name,
        company_name: company,
        subdomain: body.subdomain || `${company.toLowerCase().replace(/\s+/g, '-')}`,
        country: body.country || 'USA',
        role: 'OWNER',
        tier: 'BASIC',
        updated_at: new Date().toISOString()
      });

    if (dbError) {
      console.error("Database Profile Sync Error:", dbError.message);
      // We don't necessarily throw here so the user isn't blocked by a profile lag
    }

    // 4. Set Session Cookie
    const cookieStore = await cookies();
    const session = authData.session;
    
    if (session?.access_token) {
      cookieStore.set("sb-access-token", session.access_token, {
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
      accountId: userId, 
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
