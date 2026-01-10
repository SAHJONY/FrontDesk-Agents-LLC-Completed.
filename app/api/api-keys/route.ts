import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import crypto from 'crypto';


// GET /api/api-keys - List API keys for a customer
export async function GET(request: NextRequest) {
  const supabase = requireSupabaseServer();
  try {
    const { searchParams } = new URL(request.url);
    const customer_id = searchParams.get('customer_id');

    if (!customer_id) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('id, customer_id, name, key_prefix, scopes, last_used_at, created_at')
      .eq('customer_id', customer_id)
      .eq('revoked', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching API keys:', error);
      return NextResponse.json(
        { error: 'Failed to fetch API keys' },
        { status: 500 }
      );
    }

    return NextResponse.json({ api_keys: data || [] });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/api-keys - Create a new API key
export async function POST(request: NextRequest) {
  const supabase = requireSupabaseServer();
  try {
    const body = await request.json();
    const { customer_id, name, scopes } = body;

    if (!customer_id || !name) {
      return NextResponse.json(
        { error: 'Customer ID and name are required' },
        { status: 400 }
      );
    }

    // Generate API key
    const apiKey = `fda_${crypto.randomBytes(32).toString('hex')}`;
    const keyPrefix = apiKey.substring(0, 12);

    // Hash the key for storage
    const hashedKey = crypto
      .createHash('sha256')
      .update(apiKey)
      .digest('hex');

    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          customer_id,
          name,
          key_hash: hashedKey,
          key_prefix: keyPrefix,
          scopes: scopes || ['read', 'write'],
          revoked: false,
        },
      ])
      .select('id, customer_id, name, key_prefix, scopes, created_at')
      .single();

    if (error) {
      console.error('❌ Error creating API key:', error);
      return NextResponse.json(
        { error: 'Failed to create API key' },
        { status: 500 }
      );
    }

    console.log('✅ API key created:', data.id);
    
    // Return the full key only once
    return NextResponse.json({
      api_key: data,
      key: apiKey, // Only shown once!
      warning: 'Save this key securely. It will not be shown again.',
    }, { status: 201 });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
