import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/calls/[id] - Get call details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from('calls')
      .select(`
        *,
        agents(name, role, voice_id),
        customers(company_name, contact_name)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ call: data });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/calls/[id] - Update call details
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    delete body.id;
    delete body.created_at;
    delete body.agent_id;
    delete body.customer_id;

    // Handle call completion
    if (body.status === 'completed' && !body.ended_at) {
      body.ended_at = new Date().toISOString();
      
      // Calculate duration if we have start and end times
      const { data: call } = await supabase
        .from('calls')
        .select('started_at')
        .eq('id', id)
        .single();

      if (call && call.started_at) {
        const start = new Date(call.started_at);
        const end = new Date(body.ended_at);
        body.duration = Math.floor((end.getTime() - start.getTime()) / 1000);
      }
    }

    const { data, error } = await supabase
      .from('calls')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('❌ Error updating call:', error);
      return NextResponse.json(
        { error: 'Failed to update call' },
        { status: 500 }
      );
    }

    console.log('✅ Call updated:', id);
    return NextResponse.json({ call: data });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
