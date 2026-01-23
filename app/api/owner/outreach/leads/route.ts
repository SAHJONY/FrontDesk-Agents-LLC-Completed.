// app/api/owner/outreach/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    // Mock lead data with AI scoring
    const leads = [
      {
        id: 'lead_001',
        name: 'Dr. Sarah Johnson',
        email: 'sjohnson@healthclinic.com',
        phone: '+1-555-0123',
        company: 'Downtown Health Clinic',
        industry: 'Healthcare',
        score: 92,
        status: 'responded',
        source: 'AI Lead Generation',
        lastContact: new Date(Date.now() - 3600000).toISOString(),
        nextAction: 'Schedule demo call',
        campaignId: campaignId || 'camp_001',
      },
      {
        id: 'lead_002',
        name: 'Michael Chen',
        email: 'mchen@legalpartners.com',
        phone: '+1-555-0124',
        company: 'Chen & Associates Law',
        industry: 'Legal Services',
        score: 85,
        status: 'contacted',
        source: 'AI Lead Generation',
        lastContact: new Date(Date.now() - 7200000).toISOString(),
        nextAction: 'Follow-up email in 2 days',
        campaignId: campaignId || 'camp_002',
      },
      {
        id: 'lead_003',
        name: 'Jennifer Martinez',
        email: 'jmartinez@propertygroup.com',
        phone: '+1-555-0125',
        company: 'Martinez Property Management',
        industry: 'Property Management',
        score: 78,
        status: 'new',
        source: 'AI Lead Generation',
        lastContact: null as string | null,
        nextAction: 'Send initial outreach',
        campaignId: campaignId || 'camp_001',
      },
      {
        id: 'lead_004',
        name: 'Robert Williams',
        email: 'rwilliams@hospitalityplus.com',
        phone: '+1-555-0126',
        company: 'Hospitality Plus Hotels',
        industry: 'Hospitality',
        score: 88,
        status: 'converted',
        source: 'AI Lead Generation',
        lastContact: new Date(Date.now() - 86400000).toISOString(),
        nextAction: 'Onboarding scheduled',
        campaignId: campaignId || 'camp_001',
      },
    ];

    // Filter by campaign if specified
    const filteredLeads = campaignId
      ? leads.filter((lead) => lead.campaignId === campaignId)
      : leads;

    const total = filteredLeads.length;
    const avgScore =
      total > 0
        ? Math.round(filteredLeads.reduce((sum, l) => sum + l.score, 0) / total)
        : 0;

    return NextResponse.json({
      leads: filteredLeads,
      total,
      stats: {
        new: filteredLeads.filter((l) => l.status === 'new').length,
        contacted: filteredLeads.filter((l) => l.status === 'contacted').length,
        responded: filteredLeads.filter((l) => l.status === 'responded').length,
        converted: filteredLeads.filter((l) => l.status === 'converted').length,
        avgScore,
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, count, industry, region } = body ?? {};

    if (!campaignId || typeof campaignId !== 'string') {
      return NextResponse.json({ error: 'campaignId is required' }, { status: 400 });
    }
    if (typeof count !== 'number' || !Number.isFinite(count) || count <= 0) {
      return NextResponse.json({ error: 'count must be a positive number' }, { status: 400 });
    }

    // Generate leads using AI (mock)
    console.log(`Generating ${count} leads for campaign ${campaignId}`);
    if (industry) console.log(`Industry: ${industry}`);
    if (region) console.log(`Region: ${region}`);

    const generatedLeads = {
      campaignId,
      leadsGenerated: count,
      status: 'processing',
      estimatedCompletion: new Date(Date.now() + 300000).toISOString(), // 5 minutes
    };

    return NextResponse.json({
      success: true,
      data: generatedLeads,
      message: `Generating ${count} leads. This may take a few minutes.`,
    });
  } catch (error) {
    console.error('Error generating leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, status, notes } = body ?? {};

    if (!leadId || typeof leadId !== 'string') {
      return NextResponse.json({ error: 'leadId is required' }, { status: 400 });
    }
    if (!status || typeof status !== 'string') {
      return NextResponse.json({ error: 'status is required' }, { status: 400 });
    }

    console.log(`Updating lead ${leadId} to status: ${status}`);

    // Use notes so TypeScript doesn't fail with noUnusedLocals
    if (typeof notes === 'string' && notes.trim()) {
      console.log(`Notes for ${leadId}: ${notes.trim()}`);
    }

    // In production, this would update the lead in the database
    return NextResponse.json({
      success: true,
      message: 'Lead updated successfully',
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
