// lib/redis.ts
import { Redis } from "@upstash/redis";

const url =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.UPSTASH_REDIS_URL ||
  "";

const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.UPSTASH_REDIS_TOKEN ||
  "";

export const redis: Redis | null =
  url && token ? new Redis({ url, token }) : null;

export function requireRedis(): Redis {
  if (!redis) {
    throw new Error(
      "Upstash Redis is not configured. Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (preferred) or UPSTASH_REDIS_URL + UPSTASH_REDIS_TOKEN."
    );
  }
  return redis;
}
