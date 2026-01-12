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
        lastContact: null,
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
      ? leads.filter(lead => lead.campaignId === campaignId)
      : leads;

    return NextResponse.json({ 
      leads: filteredLeads,
      total: filteredLeads.length,
      stats: {
        new: filteredLeads.filter(l => l.status === 'new').length,
        contacted: filteredLeads.filter(l => l.status === 'contacted').length,
        responded: filteredLeads.filter(l => l.status === 'responded').length,
        converted: filteredLeads.filter(l => l.status === 'converted').length,
        avgScore: Math.round(filteredLeads.reduce((sum, l) => sum + l.score, 0) / filteredLeads.length),
      }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, count, industry, region } = body;

    // Generate leads using AI
    console.log(`Generating ${count} leads for campaign ${campaignId}`);
    console.log(`Industry: ${industry}, Region: ${region}`);

    // In production, this would:
    // 1. Query lead databases (Apollo, ZoomInfo, etc.)
    // 2. Use AI to score and qualify leads
    // 3. Enrich lead data with company info
    // 4. Generate personalized outreach messages
    // 5. Save to database

    const generatedLeads = {
      campaignId,
      leadsGenerated: count,
      status: 'processing',
      estimatedCompletion: new Date(Date.now() + 300000).toISOString(), // 5 minutes
    };

    return NextResponse.json({ 
      success: true,
      data: generatedLeads,
      message: `Generating ${count} leads. This may take a few minutes.`
    });
  } catch (error) {
    console.error('Error generating leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, status, notes } = body;

    console.log(`Updating lead ${leadId} to status: ${status}`);

    // In production, this would update the lead in the database
    
    return NextResponse.json({ 
      success: true,
      message: 'Lead updated successfully'
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
