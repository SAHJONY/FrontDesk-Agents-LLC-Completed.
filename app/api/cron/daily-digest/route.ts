// app/api/cron/daily-digest/route.ts
import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env/server";

export async function GET(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (!serverEnv.CRON_SECRET || secret !== serverEnv.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: your digest job logic
  return NextResponse.json({ ok: true });
}
