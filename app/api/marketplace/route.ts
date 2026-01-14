/**
 * AI Marketplace API
 * Status: Verified Global Hub - Tier: Elite
 * Fix: Corrected Supabase query chains to prevent 'order is not a function' TypeError.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// CRITICAL: Force dynamic runtime to prevent build-time 'null' key errors
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use Service Role for Marketplace logic
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    // Ensure marketplace is initialized
    if (typeof (aiMarketplace as any).init === 'function') {
      await (aiMarketplace as any).init();
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Default Action: Fetch all items with fixed query chain
    if (!action || action === 'all') {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*') // CRITICAL: .select() must precede .order()
        .order('created_at', { ascending: false });

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    // Search Logic
    if (action === 'search') {
      const query = searchParams.get('query') || '';
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    // Featured Items
    if (action === 'featured') {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    // Popular Items
    if (action === 'popular') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .order('install_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    // Specific Item Detail
    if (action === 'item') {
      const itemId = searchParams.get('itemId');
      if (!itemId) return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
      
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .eq('id', itemId)
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error("Marketplace API Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      workforce_status: "16 agents stand-by" 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure marketplace is initialized
    if (typeof (aiMarketplace as any).init === 'function') {
      await (aiMarketplace as any).init();
    }

    const body = await request.json();
    const { action, customerId, itemId, item } = body;

    if (action === 'install') {
      // Logic for adding to installed_items table
      const { error } = await supabase
        .from('installed_items')
        .insert([{ customer_id: customerId, item_id: itemId }]);

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (action === 'publish') {
      const { data, error } = await supabase
        .from('marketplace_items')
        .insert([{ ...item, publisher_id: customerId }])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
