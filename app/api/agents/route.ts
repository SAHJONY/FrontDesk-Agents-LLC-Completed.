import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/agents - List all agents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customer_id = searchParams.get('customer_id');
    const status = searchParams.get('status');

    let query = supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (customer_id) {
      query = query.eq('customer_id', customer_id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Error fetching agents:', error);
      return NextResponse.json(
        { error: 'Failed to fetch agents' },
        { status: 500 }
      );
    }

    return NextResponse.json({ agents: data || [] });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/agents - Create a new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_id,
      name,
      role,
      language,
      voice_id,
      phone_number,
      system_prompt,
      greeting_message,
      tools,
      model,
    } = body;

    // Validate required fields
    if (!customer_id || !name || !role) {
      return NextResponse.json(
        { error: 'Customer ID, name, and role are required' },
        { status: 400 }
      );
    }

    // Create agent
    const { data, error } = await supabase
      .from('agents')
      .insert([
        {
          customer_id,
          name,
          role,
          language: language || 'en',
          voice_id: voice_id || 'default',
          phone_number,
          system_prompt: system_prompt || `You are ${name}, a professional ${role} assistant.`,
          greeting_message: greeting_message || `Hello, this is ${name}. How can I help you today?`,
          tools: tools || [],
          model: model || 'gpt-4',
          status: 'training',
          calls_handled: 0,
          conversion_rate: 0,
          revenue_generated: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating agent:', error);
      return NextResponse.json(
        { error: 'Failed to create agent' },
        { status: 500 }
      );
    }

    console.log('✅ Agent created successfully:', data.id);
    return NextResponse.json({ agent: data }, { status: 201 });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
