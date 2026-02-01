import { Redis } from '@upstash/redis';

/**
 * Singleton pattern for Redis connection.
 * Designed to prevent "Application Error" crashes on Vercel 
 * when environment variables are temporarily missing.
 */

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Validation helper to avoid runtime crashes
const isConfigured = !!(redisUrl && redisToken && redisUrl !== "");

/**
 * The Redis client instance.
 * Returns null if unconfigured to allow the build process to complete.
 */
export const redis = isConfigured
  ? new Redis({
      url: redisUrl as string,
      token: redisToken as string,
    })
  : null;

/**
 * Helper to safely check Redis status without hanging the request
 */
export async function getRedisStatus(): Promise<'unconfigured' | 'connected' | 'error'> {
  if (!redis) return 'unconfigured';
  try {
    // 1-second timeout to prevent the UI from "loading forever" if Redis is down
    const ping = await Promise.race([
      redis.ping(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
    ]);
    return ping === 'PONG' ? 'connected' : 'error';
  } catch (error) {
    console.error('🔴 Redis Connection Error:', error);
    return 'error';
  }
}

/**
 * Global accessor. 
 * Modified to return null instead of throwing, ensuring the 
 * "Supreme Commander" dashboard can still load basic DB data.
 */
export const getRedis = () => {
  if (!redis && process.env.NODE_ENV === 'production') {
    // We log a clear error to the Vercel console, but don't crash the process
    console.error("❌ CRITICAL: Redis environment variables are missing in production. Caching is disabled.");
  }
  return redis;
};

export default redis;
