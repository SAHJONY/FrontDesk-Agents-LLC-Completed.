// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as z from "zod";

const signupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  companyName: z.string().min(2),
  subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/),
  country: z.string().min(2),
});

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = signupSchema.parse(body);

    const fullName = parsed.fullName.trim();
    const email = parsed.email.trim().toLowerCase();
    const companyName = parsed.companyName.trim();
    const subdomain = parsed.subdomain.trim().toLowerCase();
    const country = parsed.country.trim();

    // Validate password match
    if (parsed.password !== parsed.confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // Service Supabase
    const supabase = getServiceSupabase();
    if (!supabase) {
      console.error("Supabase configuration missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // JWT secret must exist (NO insecure fallback)
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Check if user already exists (handle 0-row from .single())
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUserError) {
      console.error("Error checking existing user:", existingUserError);
      return NextResponse.json(
        { error: "Server error" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Check if subdomain is available
    const { data: existingSubdomain, error: existingSubdomainError } = await supabase
      .from("users")
      .select("id")
      .eq("subdomain", subdomain)
      .maybeSingle();

    if (existingSubdomainError) {
      console.error("Error checking subdomain:", existingSubdomainError);
      return NextResponse.json(
        { error: "Server error" },
        { status: 500 }
      );
    }

    if (existingSubdomain) {
      return NextResponse.json(
        { error: "Subdomain already taken" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    // Generate identifiers
    const nodeId = `node_${subdomain}_${Date.now()}`;
    const clientKey = `FDDG-${subdomain
      .toUpperCase()
      .substring(0, 6)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const nowIso = new Date().toISOString();

    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        email,
        password_hash: hashedPassword,
        full_name: fullName,
        name: fullName,
        company_name: companyName,
        subdomain,
        country,
        node_id: nodeId,
        client_key: clientKey,
        role: "OWNER",
        tier: "BASIC",
        created_at: nowIso,
        updated_at: nowIso,
      })
      .select()
      .single();

    if (insertError || !newUser) {
      console.error("Database insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create account" },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        clientKey: newUser.client_key,
      },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Response
    const response = NextResponse.json(
      {
        success: true,
        message: "Node Provisioned Successfully",
        nodeId,
        subdomain,
        tier: "BASIC",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.full_name,
          role: newUser.role,
        },
      },
      { status: 201 }
    );

    // Cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Signup error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
