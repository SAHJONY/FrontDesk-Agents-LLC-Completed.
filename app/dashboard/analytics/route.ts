import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // In a real app, you'd filter by the tenant's ID from the session/cookie
  const { data: calls } = await supabase.from('call_logs').select('*');

  if (!calls) return NextResponse.json({ totalCalls: 0 });

  const totalCalls = calls.length;
  const leadsCount = calls.filter(c => c.summary?.toLowerCase().includes('book')).length;
  const totalMinutes = calls.reduce((acc, c) => acc + (c.duration || 0), 0) / 60;
  
  // Hypothetical follow-up rate (mocked for UI demonstration)
  const followupRate = 42; 

  return NextResponse.json({
    totalCalls,
    leadsCount,
    totalMinutes,
    followupRate
  });
}
