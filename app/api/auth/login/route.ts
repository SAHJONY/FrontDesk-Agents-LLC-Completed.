import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as z from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function cookieSecure() {
  return process.env.NODE_ENV === "production";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: users, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .limit(1);

    if (dbError) {
      return NextResponse.json({ error: "Database error occurred" }, { status: 500 });
    }

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ error: "Server missing JWT_SECRET" }, { status: 500 });
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        tier: user.tier,
        tenantId: user.tenant_id,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, type: "refresh" },
      jwtSecret,
      { expiresIn: "30d" }
    );

    let redirectUrl = "/dashboard";
    if (user.role === "OWNER") redirectUrl = "/dashboard/owner";
    else if (user.role === "admin") redirectUrl = "/dashboard/admin";

    const res = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        tier: user.tier,
        tenantId: user.tenant_id,
      },
      accessToken,
      refreshToken,
      redirectUrl,
    });

    const common = {
      httpOnly: true,
      secure: cookieSecure(),
      sameSite: "lax" as const,
      path: "/",
    };

    // Primary cookies
    res.cookies.set("auth-token", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("refresh-token", refreshToken, { ...common, maxAge: 60 * 60 * 24 * 30 });

    // ✅ Compatibility aliases for existing guards
    res.cookies.set("token", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("fd_session", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("access_token", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("refresh_token", refreshToken, { ...common, maxAge: 60 * 60 * 24 * 30 });

    return res;
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
