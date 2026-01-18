import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: payload.userId,
          email: payload.email,
          tenantId: payload.tenantId ?? null,
        },
        role: payload.role ?? null,
        tier: payload.tier ?? null,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
