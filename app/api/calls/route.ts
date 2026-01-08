import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/calls - List all calls with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agent_id = searchParams.get('agent_id');
    const customer_id = searchParams.get('customer_id');
    const status = searchParams.get('status');
    const direction = searchParams.get('direction');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('calls')
      .select(`
        *,
        agents(name, role),
        customers(company_name)
      `)
      .order('started_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (agent_id) {
      query = query.eq('agent_id', agent_id);
    }

    if (customer_id) {
      query = query.eq('customer_id', customer_id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (direction) {
      query = query.eq('direction', direction);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('❌ Error fetching calls:', error);
      return NextResponse.json(
        { error: 'Failed to fetch calls' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      calls: data || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/calls - Create a new call record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      agent_id,
      customer_id,
      direction,
      from_number,
      to_number,
      status,
    } = body;

    if (!agent_id || !customer_id || !direction) {
      return NextResponse.json(
        { error: 'Agent ID, customer ID, and direction are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('calls')
      .insert([
        {
          agent_id,
          customer_id,
          direction,
          from_number,
          to_number,
          status: status || 'initiated',
          started_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating call:', error);
      return NextResponse.json(
        { error: 'Failed to create call' },
        { status: 500 }
      );
    }

    console.log('✅ Call created:', data.id);
    return NextResponse.json({ call: data }, { status: 201 });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
