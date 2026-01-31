import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase'; // Using the file we updated
import { Redis } from '@upstash/redis';

export async function GET() {
  const results: any = { supabase: 'pending', redis: 'pending' };

  try {
    // 1. Test Supabase Admin
    const { count, error } = await supabaseAdmin!
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    results.supabase = error ? `Error: ${error.message}` : `Success (Users: ${count})`;

    // 2. Test Redis (Now that your token is fixed!)
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    
    await redis.set('connection_test', 'active');
    const val = await redis.get('connection_test');
    results.redis = val === 'active' ? 'Success' : 'Failed';

  } catch (err: any) {
    results.error = err.message;
  }

  return NextResponse.json(results);
}
