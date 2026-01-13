import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Verify user is owner
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user || user.email !== 'frontdeskllc@outlook.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch automation rules
    const { data: rules, error: rulesError } = await supabase
      .from('automation_rules')
      .select('*')
      .order('created_at', { ascending: false });

    if (rulesError) {
      console.error('Error fetching rules:', rulesError);
      return NextResponse.json({ rules: [] });
    }

    return NextResponse.json({ rules: rules || [] });
  } catch (error) {
    console.error('Error in rules API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Verify user is owner
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user || user.email !== 'frontdeskllc@outlook.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, trigger, action, conditions } = body;

    // Create new automation rule
    const { data: rule, error: createError } = await supabase
      .from('automation_rules')
      .insert({
        name,
        trigger,
        action,
        conditions,
        enabled: true,
        execution_count: 0,
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating rule:', createError);
      return NextResponse.json(
        { error: 'Failed to create rule' },
        { status: 500 }
      );
    }

    return NextResponse.json({ rule });
  } catch (error) {
    console.error('Error in rules API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
