// app/api/workflows/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';

export async function GET(_req: NextRequest) {
  try {
    const supabase = await requireSupabaseServer();

    // If you don’t have a workflows table yet, return a safe mock payload.
    // If the table exists, this will return real rows.
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Common during early build when table doesn't exist.
      return NextResponse.json(
        {
          success: true,
          workflows: [],
          source: 'mock',
          warning: error.message,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      workflows: data ?? [],
      source: 'supabase',
    });
  } catch (e: any) {
    console.error('Workflows GET error:', e);
    return NextResponse.json(
      { success: false, error: e?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await requireSupabaseServer();
    const body = await request.json();

    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const description = typeof body?.description === 'string' ? body.description.trim() : null;
    const steps = Array.isArray(body?.steps) ? body.steps : [];
    const enabled = typeof body?.enabled === 'boolean' ? body.enabled : true;

    if (!name) {
      return NextResponse.json({ success: false, error: 'name is required' }, { status: 400 });
    }

    // Insert if table exists; otherwise return mock success.
    const { data, error } = await supabase
      .from('workflows')
      .insert([
        {
          name,
          description,
          steps,
          enabled,
        },
      ])
      .select('*')
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: true,
          workflow: {
            id: `wf_${Date.now()}`,
            name,
            description,
            steps,
            enabled,
            created_at: new Date().toISOString(),
          },
          source: 'mock',
          warning: error.message,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      workflow: data,
      source: 'supabase',
    });
  } catch (e: any) {
    console.error('Workflows POST error:', e);
    return NextResponse.json(
      { success: false, error: e?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
