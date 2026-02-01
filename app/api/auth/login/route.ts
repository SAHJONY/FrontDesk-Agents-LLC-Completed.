import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as z from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MASTER_EMAIL = "frontdeskllc@outlook.com";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Helper to ensure secure cookies in production
function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAge,
  };
}

function normalizeRole(role: unknown, email: string): "ADMIN" | "OWNER" | "USER" {
  if (email.toLowerCase() === MASTER_EMAIL.toLowerCase()) return "ADMIN";
  const r = String(role ?? "").trim().toUpperCase();
  if (r === "ADMIN") return "ADMIN";
  if (r === "OWNER") return "OWNER";
  return "USER";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = loginSchema.parse(body);

    const user = await getUserByEmail(email);

    if (!user || !user.password_hash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("FATAL: JWT_SECRET is not defined in environment variables.");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    const isMaster = email.toLowerCase() === MASTER_EMAIL.toLowerCase();
    const role = normalizeRole(user.role, email);
    const tier = isMaster ? "ENTERPRISE_UNLIMITED" : (user.tier || "FREE");

    // Generate Tokens
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role,
        tier,
        tenantId: isMaster ? null : user.tenant_id,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, type: "refresh" },
      jwtSecret,
      { expiresIn: '30d' }
    );

    // Redirect Logic based on Division
    let redirectUrl = "/dashboard";
    if (role === "ADMIN") redirectUrl = "/admin/tenants";
    if (role === "OWNER") redirectUrl = "/owner"; // Standardized for division-logic

    const res = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, role, tier },
      redirectUrl,
    });

    // 🍪 SET COOKIES
    // We set multiple names to ensure Middleware (which checks for 'token' or 'auth-token') catches it
    const week = 60 * 60 * 24 * 7;
    const month = 60 * 60 * 24 * 30;

    res.cookies.set("auth-token", accessToken, getCookieOptions(week));
    res.cookies.set("token", accessToken, getCookieOptions(week)); // Backup for Middleware
    res.cookies.set("refresh-token", refreshToken, getCookieOptions(month));
    
    // Clear any old impersonation sessions
    res.cookies.delete("impersonated_owner_id");

    return res;

  } catch (error: any) {
    console.error("Login Route Error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
