import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as z from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The master account that bypasses all platform restrictions
const MASTER_EMAIL = "frontdeskllc@outlook.com";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function cookieSecure() {
  return process.env.NODE_ENV === "production";
}

function normalizeRole(role: unknown, email: string): "ADMIN" | "OWNER" | "USER" {
  // Supreme Override for Master Email
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

    // 1. Fetch user via centralized helper
    const user = await getUserByEmail(email);

    if (!user || !user.password_hash) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 2. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. JWT signing
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("CRITICAL: Missing JWT_SECRET");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Check if this is the master account
    const isMaster = email.toLowerCase() === MASTER_EMAIL.toLowerCase();
    const role = normalizeRole(user.role, email);
    const tier = isMaster ? "ENTERPRISE_UNLIMITED" : (user.tier || "FREE");

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role,
        tier,
        tenantId: isMaster ? null : user.tenant_id, // Master has global scope
        unrestricted: isMaster,
      },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, type: "refresh" },
      jwtSecret,
      { expiresIn: "30d" }
    );

    // 4. Redirect logic (Master goes to Global Admin)
    let redirectUrl = "/dashboard";
    if (role === "ADMIN") redirectUrl = "/admin/tenants";
    if (role === "OWNER") redirectUrl = "/admin";

    // 5. Response + cookies
    const res = NextResponse.json({
      success: true,
      message: isMaster ? "Welcome back, Supreme AI Commander" : "Authentication successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role,
        tier,
        tenantId: isMaster ? null : user.tenant_id,
      },
      accessToken,
      refreshToken,
      redirectUrl,
    });

    const commonCookie = {
      httpOnly: true,
      secure: cookieSecure(),
      sameSite: "lax" as const,
      path: "/",
    };

    // Clean impersonation residue
    res.cookies.delete("impersonated_owner_id");

    const weekInSeconds = 60 * 60 * 24 * 7;
    const monthInSeconds = 60 * 60 * 24 * 30;

    // Primary cookies
    res.cookies.set("auth-token", accessToken, { ...commonCookie, maxAge: weekInSeconds });
    res.cookies.set("refresh-token", refreshToken, { ...commonCookie, maxAge: monthInSeconds });

    // Compatibility cookies
    res.cookies.set("token", accessToken, { ...commonCookie, maxAge: weekInSeconds });
    res.cookies.set("access_token", accessToken, { ...commonCookie, maxAge: weekInSeconds });

    return res;
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
    );
  }
}
