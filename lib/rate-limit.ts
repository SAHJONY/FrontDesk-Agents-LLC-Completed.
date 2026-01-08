import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<{ success: boolean; remaining: number }> => {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();

    // Clean up expired entries
    if (store[key] && store[key].resetTime < now) {
      delete store[key];
    }

    // Initialize or get current state
    if (!store[key]) {
      store[key] = {
        count: 0,
        resetTime: now + config.interval,
      };
    }

    // Increment counter
    store[key].count++;

    // Check if limit exceeded
    const remaining = Math.max(0, config.maxRequests - store[key].count);
    const success = store[key].count <= config.maxRequests;

    return { success, remaining };
  };
}

// Preset configurations
export const rateLimits = {
  auth: { interval: 60 * 1000, maxRequests: 5 }, // 5 requests per minute
  api: { interval: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  webhook: { interval: 60 * 1000, maxRequests: 1000 }, // 1000 requests per minute
};
