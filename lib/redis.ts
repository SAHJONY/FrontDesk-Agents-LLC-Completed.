import { Redis } from '@upstash/redis'

// Check if credentials exist
const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

// Export a dummy or real client
export const redis = (redisUrl && redisToken) 
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

// Helper to safely use Redis without crashing
export async function safeRateLimit(identifier: string) {
  if (!redis) {
    console.warn("Redis not configured: Skipping rate limit for", identifier);
    return { success: true }; // Default to allowing access if Redis is down
  }
  
  // Your actual rate limiting logic here...
}
