export const dynamic = 'force-dynamic';

export default function DebugPage() {
  const envStatus = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    redisUrl: !!process.env.UPSTASH_REDIS_REST_URL,
    redisToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', lineHeight: '2' }}>
      <h1>🛠️ System Diagnostic</h1>
      <hr />
      <ul>
        <li>Supabase URL: {envStatus.supabaseUrl ? '✅ Loaded' : '❌ MISSING'}</li>
        <li>Supabase Key: {envStatus.supabaseKey ? '✅ Loaded' : '❌ MISSING'}</li>
        <li>Redis URL: {envStatus.redisUrl ? '✅ Loaded' : '❌ MISSING'}</li>
        <li>Redis Token: {envStatus.redisToken ? '✅ Loaded' : '❌ MISSING'}</li>
        <li>Environment: <b>{envStatus.nodeEnv}</b></li>
      </ul>
      <hr />
      <p>If any are ❌ MISSING, go to Vercel Settings &gt; Environment Variables and add them.</p>
    </div>
  );
}
