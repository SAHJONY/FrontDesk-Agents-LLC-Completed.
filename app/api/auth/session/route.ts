// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type JwtPayload = {
  userId: string;
  email?: string;
  role?: string;
  tier?: string;
  tenantId?: string;
  exp?: number;
};

function parseCookie(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const token = parseCookie(cookieHeader, "auth-token");

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: "missing_token" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { authenticated: false, error: "server_misconfigured" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Minimal runtime metadata (optional)
    const nodeId =
      process.env.VERCEL_REGION
        ? `vercel_${process.env.VERCEL_REGION}`
        : process.env.AWS_REGION
        ? `aws_${process.env.AWS_REGION}`
        : "node_unknown";

    return NextResponse.json({
      authenticated: true,
      userId: decoded.userId,
      email: decoded.email ?? null,
      tier: decoded.tier ?? null,
      role: decoded.role ?? null,
      tenantId: decoded.tenantId ?? null,
      nodeId,
    });
  } catch (err) {
    // Token invalid/expired
    return NextResponse.json(
      { authenticated: false, error: "invalid_or_expired_token" },
      { status: 401 }
    );
  }
}
