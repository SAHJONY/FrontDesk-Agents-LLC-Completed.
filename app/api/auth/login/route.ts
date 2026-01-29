import { NextResponse } from "next/server";
import { supabase, getUserByEmail } from "@/lib/supabase"; // Use central client & helper
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

    // 1. Fetch user using centralized helper (uses Service Role internally)
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 2. Verify Password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 3. JWT Signing Logic
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("CRITICAL: Missing JWT_SECRET");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
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

    // 4. Determine Redirect URL
    let redirectUrl = "/dashboard";
    if (role === "ADMIN") redirectUrl = "/admin/tenants";
    if (role === "OWNER") redirectUrl = "/admin";

    // 5. Build Response & Set Cookies
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

    // Standard Auth Cookies
    res.cookies.set("auth-token", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("refresh-token", refreshToken, { ...common, maxAge: 60 * 60 * 24 * 30 });

    // Legacy/Compatibility Cookies
    res.cookies.set("token", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("fd_session", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("access_token", accessToken, { ...common, maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set("refresh_token", refreshToken, { ...common, maxAge: 60 * 60 * 24 * 30 });

    return res;
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 });
    }
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
