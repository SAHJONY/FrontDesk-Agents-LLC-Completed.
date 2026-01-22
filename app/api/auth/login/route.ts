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

function normalizeRole(role: unknown): "ADMIN" | "OWNER" | "USER" {
  const r = String(role ?? "").trim().toUpperCase();
  if (r === "ADMIN") return "ADMIN";
  if (r === "OWNER") return "OWNER";
  return "USER";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = loginSchema.parse(body);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const emailNorm = email.trim().toLowerCase();

    const { data: users, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("email", emailNorm)
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

    const role = normalizeRole(user.role);

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role,
        tier: user.tier,
        tenantId: user.tenant_id,
      },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, type: "refresh" },
      jwtSecret,
      { expiresIn: "30d" }
    );

    // Redirect policy (stable + predictable)
    let redirectUrl = "/dashboard";
    if (role === "ADMIN") redirectUrl = "/admin/tenants";
    if (role === "OWNER") redirectUrl = "/admin";

    const res = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role,
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

    // Clean up lingering impersonation state
    res.cookies.delete("impersonated_owner_id");

    // Primary cookies
    res.cookies.set("auth-token", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("refresh-token", refreshToken, { ...common, maxAge: 60 * 60 * 24 * 30 });

    // Compatibility aliases
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
