import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Only initialize if variables exist, otherwise use a proxy to prevent crashes
export const redis = redisUrl && redisToken 
  ? new Redis({ url: redisUrl, token: redisToken })
  : new Proxy({} as Redis, {
      get: () => () => {
        console.warn("Redis: Attempted to call a method but Redis is not configured.");
        return null;
      }
    });
