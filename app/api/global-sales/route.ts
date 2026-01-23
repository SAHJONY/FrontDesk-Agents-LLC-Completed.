import { NextRequest, NextResponse } from 'next/server';
import {
  globalSalesWorkforce,
  IndustryCategory,
  GeographicRegion,
  BusinessSize,
  OutreachChannel,
  CampaignStatus,
} from '@/lib/global-sales-workforce';

/**
 * Global Sales Workforce API
 *
 * Endpoints (by action param):
 * - POST /api/global-sales?action=create_campaign
 * - POST /api/global-sales?action=generate_leads
 * - POST /api/global-sales?action=launch_campaign
 * - POST /api/global-sales?action=get_industries
 * - POST /api/global-sales?action=get_recommendations
 *
 * - GET  /api/global-sales?action=analytics&campaignId=...
 * - GET  /api/global-sales?action=industries
 * - GET  /api/global-sales?action=regions
 * - GET  /api/global-sales?action=channels
 */

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const body = await request.json();

    switch (action) {
      case 'create_campaign':
        return handleCreateCampaign(body);

      case 'generate_leads':
        return handleGenerateLeads(body);

      case 'launch_campaign':
        return handleLaunchCampaign(body);

      case 'get_industries':
        return handleGetIndustries();

      case 'get_recommendations':
        return handleGetRecommendations(body);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Global sales API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const campaignId = searchParams.get('campaignId');

    switch (action) {
      case 'analytics':
        if (!campaignId) {
          return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
        }
        return handleGetAnalytics(campaignId);

      case 'industries':
        return handleGetIndustries();

      case 'regions':
        return handleGetRegions();

      case 'channels':
        return handleGetChannels();

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Global sales API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Create a new sales campaign
 */
async function handleCreateCampaign(body: any) {
  const { name, industry, targetAudience, channels, dailyLimit, goals } = body;

  const campaign = globalSalesWorkforce.createCampaign({
    name,
    industry: industry as IndustryCategory,
    targetAudience: {
      industries: targetAudience?.industries || [industry],
      businessSizes: targetAudience?.businessSizes || [BusinessSize.SMALL, BusinessSize.MEDIUM],
      regions: targetAudience?.regions || [GeographicRegion.USA],
      jobTitles: targetAudience?.jobTitles || [
        'CEO',
        'CTO',
        'VP of Sales',
        'Director of Marketing',
      ],
      qualificationCriteria: targetAudience?.qualificationCriteria || {},
    },
    channels: channels || [OutreachChannel.EMAIL, OutreachChannel.LINKEDIN],
    schedule: {
      startDate: new Date(),
      dailyLimit: dailyLimit || 100,
      weeklyLimit: (dailyLimit || 100) * 5,
      workingDays: [1, 2, 3, 4, 5],
      workingHours: { start: 9, end: 17 },
      timeZone: 'America/New_York',
    },
    goals: goals || {
      targetLeads: 1000,
      targetMeetings: 50,
      targetDeals: 10,
      targetRevenue: 500000,
      maxCostPerLead: 20,
      maxCostPerMeeting: 300,
      targetROI: 5.0,
    },
  });

  return NextResponse.json({
    success: true,
    campaign: {
      id: campaign.id,
      name: campaign.name,
      industry: campaign.industry,
      status: campaign.status,
      createdAt: new Date().toISOString(),
    },
    message: 'Campaign created successfully',
  });
}

/**
 * Generate leads for a specific industry and region
 */
async function handleGenerateLeads(body: any) {
  const { industry, region, count } = body;

  if (!industry || !region || !count) {
    return NextResponse.json(
      { error: 'Industry, region, and count are required' },
      { status: 400 }
    );
  }

  const leads = await globalSalesWorkforce.generateLeads(
    industry as IndustryCategory,
    region as GeographicRegion,
    count
  );

  return NextResponse.json({
    success: true,
    leads: leads.map((lead: any) => ({
      id: lead.id,
      companyName: lead.companyName,
      industry: lead.industry,
      region: lead.region,
      contactName: lead.contactName,
      contactTitle: lead.contactTitle,
      email: lead.email,
      phone: lead.phone,
      score: lead.score,
      status: lead.status,
    })),
    count: leads.length,
  });
}

/**
 * Launch a campaign
 */
async function handleLaunchCampaign(body: any) {
  const { campaignId } = body;

  if (!campaignId) {
    return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
  }

  await globalSalesWorkforce.launchCampaign(campaignId);

  return NextResponse.json({
    success: true,
    message: 'Campaign launched successfully',
    campaignId,
    status: CampaignStatus.ACTIVE,
  });
}

/**
 * Get campaign analytics
 */
async function handleGetAnalytics(campaignId: string) {
  const analytics: any = globalSalesWorkforce.getCampaignAnalytics(campaignId);

  // Guard against divide-by-zero
  const emailsSent = analytics.emailsSent || 0;
  const callsMade = analytics.callsMade || 0;
  const leadsGenerated = analytics.leadsGenerated || 0;
  const meetingsBooked = analytics.meetingsBooked || 0;

  return NextResponse.json({
    success: true,
    analytics: {
      ...analytics,
      openRate: emailsSent ? ((analytics.emailsOpened / emailsSent) * 100).toFixed(2) + '%' : '0.00%',
      clickRate: emailsSent ? ((analytics.emailsClicked / emailsSent) * 100).toFixed(2) + '%' : '0.00%',
      callAnswerRate: callsMade ? ((analytics.callsAnswered / callsMade) * 100).toFixed(2) + '%' : '0.00%',
      meetingBookingRate: leadsGenerated
        ? ((analytics.meetingsBooked / leadsGenerated) * 100).toFixed(2) + '%'
        : '0.00%',
      dealWinRate: meetingsBooked
        ? ((analytics.dealsWon / meetingsBooked) * 100).toFixed(2) + '%'
        : '0.00%',
    },
  });
}

/**
 * Get list of all industries
 */
async function handleGetIndustries() {
  const industries = Object.entries(IndustryCategory).map(([key, value]) => ({
    id: value,
    name: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()),
    category: getCategoryForIndustry(value as IndustryCategory),
  }));

  return NextResponse.json({
    success: true,
    industries: industries.sort((a, b) => a.name.localeCompare(b.name)),
    count: industries.length,
  });
}

/**
 * Get list of all regions
 */
async function handleGetRegions() {
  const regions = Object.entries(GeographicRegion).map(([key, value]) => ({
    id: value,
    name: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()),
    continent: getContinentForRegion(value as GeographicRegion),
  }));

  return NextResponse.json({
    success: true,
    regions: regions.sort((a, b) => a.name.localeCompare(b.name)),
    count: regions.length,
  });
}

/**
 * Get list of all outreach channels
 */
async function handleGetChannels() {
  const channels = Object.entries(OutreachChannel).map(([key, value]) => ({
    id: value,
    name: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()),
    type: getChannelType(value as OutreachChannel),
    costPerContact: getChannelCost(value as OutreachChannel),
    averageResponseRate: getChannelResponseRate(value as OutreachChannel),
  }));

  return NextResponse.json({
    success: true,
    channels: channels.sort((a, b) => a.name.localeCompare(b.name)),
    count: channels.length,
  });
}

/**
 * Get personalized recommendations for a business
 */
async function handleGetRecommendations(body: any) {
  // Fix build: businessSize was unused; keep it as accepted input without triggering noUnusedLocals.
  const { industry, businessSize: _businessSize, region, budget } = body;

  const safeBudget = typeof budget === 'number' && Number.isFinite(budget) ? budget : 0;

  const estimatedLeads = calculateEstimatedLeads(safeBudget);
  const recommendations = {
    recommendedChannels: getRecommendedChannels(industry as IndustryCategory),
    estimatedLeadsPerMonth: estimatedLeads,
    estimatedMeetingsPerMonth: calculateEstimatedMeetings(safeBudget),
    estimatedRevenue: calculateEstimatedRevenue(safeBudget, industry as IndustryCategory),
    recommendedDailyLimit: Math.floor(estimatedLeads / 20),
    bestTimeToContact: getBestTimeToContact(industry as IndustryCategory, region as GeographicRegion),
    keyPainPoints: getIndustryPainPoints(industry as IndustryCategory),
    competitorInsights: getCompetitorInsights(industry as IndustryCategory),
  };

  return NextResponse.json({
    success: true,
    recommendations,
  });
}

// Helper functions

function getCategoryForIndustry(industry: IndustryCategory): string {
  const categoryMap: Record<string, string> = {
    [IndustryCategory.SOFTWARE_SAAS]: 'Technology',
    [IndustryCategory.IT_SERVICES]: 'Technology',
    [IndustryCategory.CYBERSECURITY]: 'Technology',
    [IndustryCategory.AI_ML]: 'Technology',
    [IndustryCategory.HEALTHCARE]: 'Healthcare',
    [IndustryCategory.MEDICAL_DEVICES]: 'Healthcare',
    [IndustryCategory.BANKING]: 'Financial Services',
    [IndustryCategory.INSURANCE]: 'Financial Services',
    [IndustryCategory.FINTECH]: 'Financial Services',
    [IndustryCategory.RETAIL]: 'Retail',
    [IndustryCategory.ECOMMERCE]: 'Retail',
    [IndustryCategory.REAL_ESTATE]: 'Real Estate',
    [IndustryCategory.MANUFACTURING]: 'Manufacturing',
  };

  return categoryMap[industry] || 'Other';
}

function getContinentForRegion(region: GeographicRegion): string {
  const continentMap: Record<string, string> = {
    [GeographicRegion.USA]: 'North America',
    [GeographicRegion.CANADA]: 'North America',
    [GeographicRegion.MEXICO]: 'North America',
    [GeographicRegion.UK]: 'Europe',
    [GeographicRegion.GERMANY]: 'Europe',
    [GeographicRegion.FRANCE]: 'Europe',
    [GeographicRegion.CHINA]: 'Asia',
    [GeographicRegion.JAPAN]: 'Asia',
    [GeographicRegion.INDIA]: 'Asia',
    [GeographicRegion.BRAZIL]: 'South America',
  };

  return continentMap[region] || 'Global';
}

function getChannelType(channel: OutreachChannel): string {
  const typeMap: Record<string, string> = {
    [OutreachChannel.EMAIL]: 'Digital',
    [OutreachChannel.COLD_CALL]: 'Voice',
    [OutreachChannel.SMS]: 'Digital',
    [OutreachChannel.LINKEDIN]: 'Social',
    [OutreachChannel.TWITTER]: 'Social',
    [OutreachChannel.FACEBOOK]: 'Social',
  };

  return typeMap[channel] || 'Other';
}

function getChannelCost(channel: OutreachChannel): number {
  const costMap: Record<string, number> = {
    [OutreachChannel.EMAIL]: 0.10,
    [OutreachChannel.COLD_CALL]: 2.50,
    [OutreachChannel.SMS]: 0.05,
    [OutreachChannel.LINKEDIN]: 0.50,
    // If your enum doesn't include DIRECT_MAIL, this line will fail typecheck.
    // Remove or adjust to the correct enum value in your lib.
    [OutreachChannel.DIRECT_MAIL]: 5.00,
  };

  return costMap[channel] ?? 1.0;
}

function getChannelResponseRate(channel: OutreachChannel): string {
  const rateMap: Record<string, string> = {
    [OutreachChannel.EMAIL]: '2-5%',
    [OutreachChannel.COLD_CALL]: '5-10%',
    [OutreachChannel.SMS]: '10-15%',
    [OutreachChannel.LINKEDIN]: '15-25%',
    [OutreachChannel.DIRECT_MAIL]: '1-3%',
  };

  return rateMap[channel] || '3-7%';
}

function getRecommendedChannels(industry: IndustryCategory): string[] {
  const channelMap: Partial<Record<IndustryCategory, string[]>> = {
    [IndustryCategory.SOFTWARE_SAAS]: ['Email', 'LinkedIn', 'Webinar'],
    [IndustryCategory.REAL_ESTATE]: ['Cold Call', 'Email', 'Direct Mail'],
    [IndustryCategory.ECOMMERCE]: ['Email', 'Facebook', 'Instagram'],
    [IndustryCategory.HEALTHCARE]: ['Email', 'Cold Call', 'LinkedIn'],
  };

  return channelMap[industry] || ['Email', 'LinkedIn', 'Cold Call'];
}

function calculateEstimatedLeads(budget: number): number {
  const costPerLead = 15;
  return Math.floor(budget / costPerLead);
}

function calculateEstimatedMeetings(budget: number): number {
  const leads = calculateEstimatedLeads(budget);
  const meetingRate = 0.05; // 5% of leads convert to meetings
  return Math.floor(leads * meetingRate);
}

function calculateEstimatedRevenue(budget: number, _industry: IndustryCategory): number {
  const meetings = calculateEstimatedMeetings(budget);
  const closeRate = 0.2; // 20% of meetings convert to deals
  const averageDealSize = 50000;
  return Math.floor(meetings * closeRate * averageDealSize);
}

function getBestTimeToContact(_industry: IndustryCategory, _region: GeographicRegion): string {
  return 'Tuesday-Thursday, 10am-11am or 2pm-3pm local time';
}

function getIndustryPainPoints(industry: IndustryCategory): string[] {
  const painPointsMap: Partial<Record<IndustryCategory, string[]>> = {
    [IndustryCategory.SOFTWARE_SAAS]: ['Customer churn', 'Long sales cycles', 'Product adoption', 'Scaling infrastructure'],
    [IndustryCategory.HEALTHCARE]: ['Patient retention', 'Regulatory compliance', 'Staff shortage', 'Technology adoption'],
    [IndustryCategory.ECOMMERCE]: ['Cart abandonment', 'Customer acquisition cost', 'Inventory management', 'Competition'],
  };

  return (
    painPointsMap[industry] || [
      'Revenue growth',
      'Customer acquisition',
      'Operational efficiency',
      'Market competition',
    ]
  );
}

function getCompetitorInsights(_industry: IndustryCategory): any {
  return {
    averageMarketingBudget: '$50,000/month',
    averageCAC: '$500',
    averageLTV: '$5,000',
    topChannels: ['Email', 'LinkedIn', 'Content Marketing'],
  };
}
