// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as z from "zod";

// Force Node.js runtime (not Edge)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function getCookieFromHeader(cookieHeader: string, name: string) {
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("=== LOGIN ATTEMPT ===");
    console.log("Email:", email);
    console.log("Supabase URL:", supabaseUrl ? "CONFIGURED" : "MISSING");
    console.log("Anon Key:", anonKey ? "CONFIGURED" : "MISSING");
    console.log("Service Key:", serviceKey ? "CONFIGURED" : "MISSING");

    if (!supabaseUrl || !anonKey || !serviceKey) {
      console.error("❌ Supabase configuration missing");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Response where we will attach BOTH: Supabase SSR cookies + your JWT cookies
    const res = NextResponse.json({ success: true });

    /**
     * 1) Supabase SSR login (sets sb-* cookies) so server-side auth checks work.
     *    This is the critical fix for "can't stay logged in" issues.
     */
    const cookieHeader = req.headers.get("cookie") || "";

    const supabaseSSR = createServerClient(supabaseUrl, anonKey, {
      cookies: {
        get(name: string) {
          // Read from request cookies
          return getCookieFromHeader(cookieHeader, name);
        },
        set(name: string, value: string, options: any) {
          // Attach to response cookies
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    });

    // If you do NOT use Supabase Auth users and only use custom users table,
    // this step can fail because the Supabase auth user doesn't exist.
    // But if your platform relies on Supabase session anywhere, you must keep it.
    const { data: authData, error: authError } = await supabaseSSR.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (authError || !authData.session) {
      console.error("❌ Supabase SSR signIn failed:", authError?.message);
      // We continue to your custom user-table auth only if you want.
      // If your app depends on Supabase SSR session, return 401 here instead.
      // return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      console.warn("⚠️ Continuing with custom users table auth (no Supabase SSR session).");
    } else {
      // ensure cookies flushed
      await supabaseSSR.auth.getUser();
      console.log("✅ Supabase SSR session created");
    }

    /**
     * 2) Your existing custom users table auth (service role key)
     */
    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    console.log("🔍 Querying user from database...");
    const { data: users, error: dbError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .limit(1);

    if (dbError) {
      console.error("❌ Database query error:", dbError);
      return NextResponse.json({ error: "Database error occurred" }, { status: 500 });
    }

    if (!users || users.length === 0) {
      console.error("❌ User not found:", email);
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = users[0];
    console.log("✅ User found:", user.email, "Role:", user.role);

    console.log("🔐 Verifying password...");
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      console.error("❌ Password mismatch");
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    console.log("✅ Password verified");

    /**
     * 3) Generate JWTs (your existing behavior) - but remove fallback secret in production.
     */
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("❌ JWT_SECRET missing");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
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

    console.log("✅ Login successful! Redirecting to:", redirectUrl);

    // Build final JSON response body
    res.headers.set("content-type", "application/json");
    // Replace the body with full payload (we created res earlier to attach cookies)
    const payload = {
      success: true,
      message: "Authentication successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        tier: user.tier,
        status: user.status, // if undefined, fine
        tenantId: user.tenant_id,
      },
      accessToken,
      refreshToken,
      redirectUrl,
    };

    // Overwrite response body safely
    const finalRes = NextResponse.json(payload);

    /**
     * IMPORTANT:
     * We must copy cookies already set on `res` (Supabase SSR cookies) into finalRes,
     * then set your JWT cookies on finalRes.
     */
    for (const c of res.cookies.getAll()) {
      finalRes.cookies.set(c);
    }

    // Your JWT cookies
    finalRes.cookies.set("auth-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    finalRes.cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return finalRes;
  } catch (error) {
    console.error("❌ Login error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
