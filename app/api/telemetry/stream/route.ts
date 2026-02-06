import { NextRequest } from 'next/server';
import { redis } from '@/lib/redis';

/**
 * Enterprise Telemetry Stream
 * Connects the Redis 'fleet-updates' channel to the client via Server-Sent Events (SSE).
 */
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Internal listener for Redis Pub/Sub
      const sub = redis.createSubscriber();
      
      try {
        await sub.subscribe('fleet-updates');

        sub.on('message', (channel, message) => {
          // Format the data for the SSE protocol
          const data = `data: ${JSON.stringify(message)}\n\n`;
          controller.enqueue(encoder.encode(data));
        });

        // Keep-alive heartbeat every 20 seconds to prevent Vercel timeout
        const heartbeat = setInterval(() => {
          controller.enqueue(encoder.encode(': heartbeat\n\n'));
        }, 20000);

        // Clean up subscription when the client disconnects
        req.signal.addEventListener('abort', () => {
          clearInterval(heartbeat);
          sub.unsubscribe();
          sub.quit();
          controller.close();
        });

      } catch (error) {
        console.error('[CRITICAL] Telemetry Stream Error:', error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
