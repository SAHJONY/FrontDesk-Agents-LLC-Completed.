/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Infrastructure: Redis-Backed Sliding Window Rate Limiting
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'redis';

// Sovereign Hub Redis Cluster Configuration
const redis = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  socket: {
    tls: process.env.REDIS_TLS_ENABLED === 'true',
  },
});

redis.on('error', (err) => console.error('[REDIS_ERROR] Fleet Shield connection failed:', err));

let isConnected = false;
async function ensureRedisConnection() {
  if (!isConnected) {
    await redis.connect();
    isConnected = true;
  }
}

/**
 * TIER-BASED THROUGHPUT ARCHITECTURE [cite: 2025-12-28]
 * Dynamically assigns API capacity based on the user's Financial Hub Tier.
 */
export function tierBasedRateLimit() {
  const tierLimits: Record<string, { windowMs: number; maxRequests: number }> = {
    basic: { windowMs: 60000, maxRequests: 60 },        // 1 request/sec
    professional: { windowMs: 60000, maxRequests: 120 }, // 2 requests/sec
    growth: { windowMs: 60000, maxRequests: 300 },      // 5 requests/sec
    elite: { windowMs: 60000, maxRequests: 1000 },      // 16+ requests/sec (Workforce Grade)
  };

  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    // Identity extraction from the JWT payload we architected earlier
    const user = (req as any).user;
    const tier = user?.tier || 'basic';
    const limits = tierLimits[tier];

    const key = `ratelimit:${tier}:${user?.id || getClientIP(req)}`;
    
    try {
      await ensureRedisConnection();
      const now = Date.now();
      const windowStart = now - limits.windowMs;

      // Sliding Window Log Implementation via Redis Sorted Sets
      await redis.zRemRangeByScore(key, 0, windowStart);
      const requestCount = await redis.zCard(key);

      if (requestCount >= limits.maxRequests) {
        return res.status(429).json({
          error: 'THROUGHPUT_LIMIT_EXCEEDED',
          message: `The ${tier} tier is limited to ${limits.maxRequests} requests per minute.`,
          tier: tier
        });
      }

      await redis.zAdd(key, { score: now, value: `${now}-${Math.random()}` });
      await redis.expire(key, Math.ceil(limits.windowMs / 1000));

      // Standard Sovereign Hub Headers
      res.setHeader('X-Sovereign-Limit', limits.maxRequests);
      res.setHeader('X-Sovereign-Remaining', limits.maxRequests - requestCount - 1);
      
      next();
    } catch (error) {
      console.error('[RATELIMIT_CRITICAL]', error);
      next(); // Fail open to prioritize workforce uptime
    }
  };
}

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  return (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress) || 'unknown';
}
