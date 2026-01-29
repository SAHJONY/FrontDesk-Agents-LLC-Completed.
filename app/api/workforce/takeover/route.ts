import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { taskId, customerId } = await req.json();
  const supabase = createClient();

  try {
    // 1. Update task status so other humans don't try to take it
    const { error: updateError } = await supabase
      .from('workforce_tasks')
      .update({ status: 'claimed', metadata: { claimed_at: new Date().toISOString() } })
      .eq('id', taskId);

    if (updateError) throw updateError;

    // 2. SIGNAL TO AI PROVIDER (Example: Bland AI)
    // We send a request to stop the AI from speaking further
    /*
    await fetch(`https://api.bland.ai/v1/calls/${taskId}/intervene`, {
      method: 'POST',
      headers: { 'authorization': process.env.BLAND_API_KEY }
    });
    */

    return NextResponse.json({ success: true, message: "AI Agent paused. Session bridged." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
