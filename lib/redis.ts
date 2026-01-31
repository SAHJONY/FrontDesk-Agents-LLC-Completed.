import { Redis } from '@upstash/redis';

/**
 * Singleton pattern for Redis connection to prevent 
 * multiple socket connections in development/HMR.
 */

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Validation helper to avoid runtime crashes
const isConfigured = !!(redisUrl && redisToken);

/**
 * The Redis client instance.
 * If credentials are missing (e.g., during build time), this will be null
 * rather than throwing a hard error that stops the deployment.
 */
export const redis = isConfigured
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null;

/**
 * Helper to safely check Redis status
 */
export async function getRedisStatus() {
  if (!redis) return 'unconfigured';
  try {
    await redis.ping();
    return 'connected';
  } catch (error) {
    console.error('Redis Connection Error:', error);
    return 'error';
  }
}

/**
 * Global accessor to ensure we always have a client in the right environment
 */
export const getRedis = () => {
  if (!redis) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error("CRITICAL: Redis environment variables are missing in production.");
    }
    // In dev/build, we return a mock or null to let the process continue
    return null;
  }
  return redis;
};

export default redis;
