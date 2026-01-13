import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';


// GET /api/agents/[id] - Get a single agent
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = requireSupabaseServer();
    const { id } = params;

    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ agent: data });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/agents/[id] - Update an agent
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = requireSupabaseServer();
  try {
    const { id } = params;
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    delete body.id;
    delete body.created_at;
    delete body.updated_at;
    delete body.customer_id; // Prevent changing ownership

    const { data, error } = await supabase
      .from('agents')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('❌ Error updating agent:', error);
      return NextResponse.json(
        { error: 'Failed to update agent' },
        { status: 500 }
      );
    }

    console.log('✅ Agent updated successfully:', id);
    return NextResponse.json({ agent: data });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/agents/[id] - Delete an agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = requireSupabaseServer();
  try {
    const { id } = params;

    // Soft delete by setting status to 'deleted'
    const { data, error } = await supabase
      .from('agents')
      .update({ status: 'deleted' })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('❌ Error deleting agent:', error);
      return NextResponse.json(
        { error: 'Failed to delete agent' },
        { status: 500 }
      );
    }

    console.log('✅ Agent deleted successfully:', id);
    return NextResponse.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
