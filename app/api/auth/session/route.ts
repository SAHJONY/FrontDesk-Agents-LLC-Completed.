import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type JwtPayload = {
  userId: string;
  email: string;
  role?: string;
  tier?: string;
  tenantId?: string;
  iat?: number;
  exp?: number;
};

export async function GET(req: Request) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return NextResponse.json(
      { authenticated: false, error: "JWT_SECRET missing" },
      { status: 500 }
    );
  }

  // Read cookie manually (works in route handlers)
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)auth-token=([^;]+)/);
  const token = match?.[1] ? decodeURIComponent(match[1]) : null;

  if (!token) {
    return NextResponse.json(
      { authenticated: false, error: "missing_token" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    return NextResponse.json({
      authenticated: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role || "USER",
        tier: decoded.tier || "STARTER",
        tenantId: decoded.tenantId || null,
      },
      nodeId: "node_pdx_01",
    });
  } catch (e) {
    return NextResponse.json(
      { authenticated: false, error: "invalid_token" },
      { status: 401 }
    );
  }
}
