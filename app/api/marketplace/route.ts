/**
 * AI Marketplace API
 * Status: Verified Global Hub - Tier: Elite
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiMarketplace } from '@/lib/marketplace/ai-marketplace';

// CRITICAL: Force dynamic runtime to prevent build-time 'null' key errors
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Initializing Marketplace Logic
    if (!aiMarketplace) {
      throw new Error("Marketplace Engine failed to initialize. Check Supabase Keys.");
    }

    if (action === 'search') {
      const query = searchParams.get('query') || '';
      const type = searchParams.get('type') || undefined;
      const category = searchParams.get('category') || undefined;
      const minRating = searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined;
      
      const items = await aiMarketplace.search(query, { type, category, minRating });
      return NextResponse.json({ success: true, data: items });
    }

    if (action === 'featured') {
      const items = await aiMarketplace.getFeaturedItems(); // Await added for consistency
      return NextResponse.json({ success: true, data: items });
    }

    if (action === 'popular') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
      const items = await aiMarketplace.getPopularItems(limit);
      return NextResponse.json({ success: true, data: items });
    }

    if (action === 'item') {
      const itemId = searchParams.get('itemId');
      if (!itemId) return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
      const item = await aiMarketplace.getItem(itemId);
      return NextResponse.json({ success: true, data: item });
    }

    if (action === 'agent_templates') {
      const templates = await aiMarketplace.getAllAgentTemplates();
      return NextResponse.json({ success: true, data: templates });
    }

    if (action === 'agent_template') {
      const templateId = searchParams.get('templateId');
      if (!templateId) return NextResponse.json({ error: 'Missing templateId' }, { status: 400 });
      const template = await aiMarketplace.getAgentTemplate(templateId);
      return NextResponse.json({ success: true, data: template });
    }

    if (action === 'workflow_templates') {
      const templates = await aiMarketplace.getAllWorkflowTemplates();
      return NextResponse.json({ success: true, data: templates });
    }

    if (action === 'workflow_template') {
      const templateId = searchParams.get('templateId');
      if (!templateId) return NextResponse.json({ error: 'Missing templateId' }, { status: 400 });
      const template = await aiMarketplace.getWorkflowTemplate(templateId);
      return NextResponse.json({ success: true, data: template });
    }

    if (action === 'categories') {
      const categories = await aiMarketplace.getCategories();
      return NextResponse.json({ success: true, data: categories });
    }

    if (action === 'installed') {
      const customerId = searchParams.get('customerId');
      if (!customerId) return NextResponse.json({ error: 'Missing customerId' }, { status: 400 });
      const items = await aiMarketplace.getInstalledItems(customerId);
      return NextResponse.json({ success: true, data: items });
    }

    if (action === 'reviews') {
      const itemId = searchParams.get('itemId');
      if (!itemId) return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
      const reviews = await aiMarketplace.getReviews(itemId);
      return NextResponse.json({ success: true, data: reviews });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error("Marketplace API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'install') {
      const { customerId, itemId } = body;
      await aiMarketplace.install(customerId, itemId);
      return NextResponse.json({ success: true });
    }

    if (action === 'publish') {
      const { customerId, item } = body;
      const newItem = await aiMarketplace.publish(customerId, item);
      return NextResponse.json({ success: true, data: newItem });
    }

    if (action === 'review') {
      const { itemId, userId, userName, rating, comment } = body;
      const review = await aiMarketplace.submitReview(itemId, userId, userName, rating, comment);
      return NextResponse.json({ success: true, data: review });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
