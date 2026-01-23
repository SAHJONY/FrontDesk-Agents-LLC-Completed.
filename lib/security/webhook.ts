// lib/security/webhook.ts
import crypto from "crypto";
import { serverEnv } from "@/lib/env/server";

export function verifyHmacSha256(params: {
  rawBody: string;
  signatureHeader: string | null;
  timestampHeader?: string | null;
}) {
  if (!serverEnv.WEBHOOK_SECRET) return false;
  if (!params.signatureHeader) return false;

  // Example signature format: "sha256=<hex>"
  const sig = params.signatureHeader.replace(/^sha256=/, "");

  const mac = crypto.createHmac("sha256", serverEnv.WEBHOOK_SECRET);
  // If you include timestamp in signing, append it here
  mac.update(params.rawBody);
  const expected = mac.digest("hex");

  return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
}
