import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The master account that bypasses all platform restrictions
const MASTER_EMAIL = "frontdeskllc@outlook.com";

function getToken(cookieHeader: string) {
  const pick = (name: string) => {
    const m = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  };
  return pick("auth-token") || pick("token") || pick("fd_session") || pick("access_token") || null;
}

export async function GET(req: Request) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json({ authenticated: false, error: "Server missing JWT_SECRET" }, { status: 500 });
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const token = getToken(cookieHeader);

  if (!token) return NextResponse.json({ authenticated: false }, { status: 200 });

  try {
    const payload = jwt.verify(token, jwtSecret) as any;

    /**
     * 👑 SUPREME OVERRIDE LOGIC
     * If the login email matches your master address, we elevate privileges 
     * regardless of what is stored in the JWT or Database.
     */
    const isMaster = payload.email?.toLowerCase() === MASTER_EMAIL.toLowerCase();

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: payload.userId,
          email: payload.email,
          tenantId: isMaster ? null : (payload.tenantId ?? null), // Master is not locked to a tenant
        },
        // Force highest permissions for master account
        role: isMaster ? "ADMIN" : (payload.role ?? "USER"),
        tier: isMaster ? "ENTERPRISE_UNLIMITED" : (payload.tier ?? "FREE"),
        isSuperAdmin: isMaster,
        unrestricted: isMaster,
      },
      { status: 200 }
    );
  } catch (error) {
    // If token is expired or invalid, clear the session
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
