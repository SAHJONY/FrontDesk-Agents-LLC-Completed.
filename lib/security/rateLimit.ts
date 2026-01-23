// lib/security/rateLimit.ts
import { Redis } from "@upstash/redis";
import { serverEnv } from "@/lib/env/server";

const hasUpstash = Boolean(serverEnv.UPSTASH_REDIS_REST_URL && serverEnv.UPSTASH_REDIS_REST_TOKEN);

const redis = hasUpstash
  ? new Redis({ url: serverEnv.UPSTASH_REDIS_REST_URL!, token: serverEnv.UPSTASH_REDIS_REST_TOKEN! })
  : null;

export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  if (!redis) return { ok: true as const, remaining: limit };

  const now = Math.floor(Date.now() / 1000);
  const bucket = Math.floor(now / windowSeconds);
  const redisKey = `rl:${key}:${bucket}`;

  const count = await redis.incr(redisKey);
  if (count === 1) await redis.expire(redisKey, windowSeconds);

  const remaining = Math.max(0, limit - count);
  return { ok: count <= limit, remaining };
}
