import { Redis } from '@upstash/redis'

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn('⚠️ Telemetry Warning: Redis credentials missing. Real-time metrics are disabled.')
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

/**
 * Logs agent efficiency metrics to the Global Fleet Map
 */
export async function logAgentTelemetry(agentId: string, metrics: { conversion: number; latency: number }) {
  try {
    await redis.hset(`agent:${agentId}:telemetry`, {
      ...metrics,
      timestamp: Date.now(),
    })
    await redis.publish('fleet-updates', { agentId, ...metrics })
  } catch (error) {
    console.error('Telemetry Write Failed:', error)
  }
}
