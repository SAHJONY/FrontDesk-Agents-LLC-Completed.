import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Campaign = {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  industry: string;
  region: string;
  businessSize?: string;
  channel?: string;
  targetCount?: number;
  leadsGenerated: number;
  contacted: number;
  responses: number;
  conversions: number;
  createdAt: string;
};

export async function GET(_request: NextRequest) {
  try {
    // NOTE:
    // We intentionally do NOT read Authorization token yet to avoid unused-var build failures.
    // When you implement auth, read and validate it here.

    // Mock data while system is being built
    const campaigns: Campaign[] = [
      {
        id: 'camp_001',
        name: 'Healthcare Q1 Campaign',
        status: 'active',
        industry: 'Healthcare',
        region: 'North America',
        leadsGenerated: 250,
        contacted: 180,
        responses: 12,
        conversions: 3,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'camp_002',
        name: 'Legal Services Outreach',
        status: 'active',
        industry: 'Legal Services',
        region: 'North America',
        leadsGenerated: 150,
        contacted: 120,
        responses: 8,
        conversions: 2,
        createdAt: new Date(Date.now() - 86_400_000).toISOString(),
      },
    ];

    return NextResponse.json({ success: true, campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, industry, region, businessSize, channel, targetCount } = body ?? {};

    // Validate required fields
    if (!name || !industry || !region || !businessSize) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const campaign: Campaign = {
      id: `camp_${Date.now()}`,
      name,
      status: 'active',
      industry,
      region,
      businessSize,
      channel: channel || 'multi-channel',
      targetCount: typeof targetCount === 'number' ? targetCount : 100,
      leadsGenerated: 0,
      contacted: 0,
      responses: 0,
      conversions: 0,
      createdAt: new Date().toISOString(),
    };

    // In production, this would:
    // 1) Save to database
    // 2) Trigger lead gen via global-sales API
    // 3) Start autonomous outreach workflow
    console.log('Campaign created:', campaign);

    // Trigger lead generation (stub)
    await triggerLeadGeneration(campaign);

    return NextResponse.json({
      success: true,
      campaign,
      message: 'Campaign created successfully. Lead generation started.',
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function triggerLeadGeneration(campaign: Campaign) {
  // Stub integration with global-sales API
  console.log(`Generating ${campaign.targetCount ?? 0} leads for campaign ${campaign.id}`);
  console.log(`Industry: ${campaign.industry}, Region: ${campaign.region}`);

  // In production, this would:
  // 1) Call /api/global-sales?action=generate_leads
  // 2) Score & qualify leads using AI
  // 3) Generate personalized outreach messages
  // 4) Schedule multi-channel outreach (email, SMS, calls)
  // 5) Track responses and update metrics in real-time
}
