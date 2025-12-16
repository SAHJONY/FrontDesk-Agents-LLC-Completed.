import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-App-Device", "universal");
  return res;
}

export const config = {
  matcher: "/:path*"
};
