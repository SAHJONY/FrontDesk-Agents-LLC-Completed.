import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "temp-secret-key-12345";

type Body = {
  secret: string;
  email: string;
  password: string;
  role?: string; // optional; we will safely use it to avoid TS unused errors
};

function normalizeRole(role?: string) {
  const r = (role || "").trim().toLowerCase();
  if (!r) return null;
  const allowed = new Set(["owner", "admin", "agent", "manager", "staff"]);
  return allowed.has(r) ? r : null;
}

export async function POST(request: Request) {
  try {
    // Check admin secret
    const { secret, email, password, role }: Body = await request.json();

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Supabase configuration missing" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Hash password using bcrypt (same as login API)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use role safely (prevents TS "unused" and optionally updates if valid)
    const normalizedRole = normalizeRole(role);

    // Check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        { error: "Failed to check user", details: checkError },
        { status: 500 }
      );
    }

    if (existingUser) {
      // Update existing user
      // Default behavior: update password only.
      // If a valid role is provided, update role too.
      const updateData: Record<string, any> = {
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      };

      if (normalizedRole) {
        updateData.role = normalizedRole;
      }

      const { data, error } = await supabase
        .from("users")
        .update(updateData)
        .eq("email", email)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: "Failed to update user", details: error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: normalizedRole
          ? "User password and role updated successfully"
          : "User password updated successfully",
        user: {
          id: data.id,
          email: data.email,
          role: data.role,
          name: data.name || "N/A",
        },
      });
    }

    return NextResponse.json(
      {
        error: "User does not exist",
        message: "Please create the user account first in Supabase dashboard",
      },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
