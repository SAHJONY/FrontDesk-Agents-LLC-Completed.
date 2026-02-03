import "server-only";
import { serverEnv } from "@/src/env.server";

export function requireCron(req: Request) {
  const secret = serverEnv.CRON_SECRET;
  const auth = req.headers.get("authorization") || "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}
