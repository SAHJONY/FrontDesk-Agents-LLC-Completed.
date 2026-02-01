import { Redis } from '@upstash/redis';

/**
 * Bulletproof Redis Configuration
 * Prevents "Application Error" by providing a fallback 
 * if environment variables are missing.
 */

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const isConfigured = !!(redisUrl && redisToken && redisUrl.startsWith('http'));

// Initializing the real client or null
const client = isConfigured
  ? new Redis({
      url: redisUrl as string,
      token: redisToken as string,
    })
  : null;

/**
 * The exported redis object.
 * If unconfigured, it returns a Proxy that prevents .get() or .set() 
 * from throwing "Cannot read property of null" errors.
 */
export const redis = new Proxy((client || {}) as Redis, {
  get(target, prop) {
    if (!isConfigured) {
      // If code tries to call a redis method, return a no-op function
      return () => Promise.resolve(null);
    }
    return Reflect.get(target, prop);
  },
});

export const getRedis = () => (isConfigured ? redis : null);

export default redis;
