import { NextRequest, NextResponse } from 'next/server';

/**
 * Campaign Analytics & ROI Dashboard API
 * 
 * Provides real-time analytics, ROI tracking, and performance metrics
 * for global sales campaigns
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const campaignId = searchParams.get('campaignId');
    const timeframe = searchParams.get('timeframe') || '30d';

    switch (action) {
      case 'overview':
        return handleGetOverview(campaignId, timeframe);
      
      case 'performance':
        return handleGetPerformance(campaignId, timeframe);
      
      case 'roi':
        return handleGetROI(campaignId);
      
      case 'funnel':
        return handleGetFunnel(campaignId);
      
      case 'channels':
        return handleGetChannelPerformance(campaignId);
      
      case 'leads':
        return handleGetLeadMetrics(campaignId, timeframe);
      
      case 'revenue':
        return handleGetRevenueMetrics(campaignId, timeframe);
      
      case 'comparison':
        return handleGetComparison(timeframe);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Campaign analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get campaign overview
 */
async function handleGetOverview(campaignId: string | null, timeframe: string) {
  const overview = {
    totalCampaigns: 12,
    activeCampaigns: 5,
    totalLeads: 15750,
    qualifiedLeads: 4725,
    meetingsBooked: 945,
    dealsWon: 189,
    totalRevenue: 9450000,
    averageROI: 6.8,
    topPerformingIndustry: 'Software SaaS',
    topPerformingRegion: 'USA',
    topPerformingChannel: 'Email + LinkedIn',
    timeframe,
  };

  return NextResponse.json({
    success: true,
    overview,
  });
}

/**
 * Get campaign performance metrics
 */
async function handleGetPerformance(campaignId: string | null, timeframe: string) {
  const performance = {
    campaignId: campaignId || 'all',
    timeframe,
    metrics: {
      // Lead metrics
      leadsGenerated: 1250,
      leadsQualified: 375,
      leadQualificationRate: 30.0,
      
      // Outreach metrics
      emailsSent: 3750,
      emailsDelivered: 3675,
      emailsOpened: 1470,
      emailsClicked: 441,
      emailBounceRate: 2.0,
      emailOpenRate: 40.0,
      emailClickRate: 12.0,
      
      // Call metrics
      callsMade: 625,
      callsAnswered: 187,
      callsVoicemail: 312,
      callsNoAnswer: 126,
      callAnswerRate: 30.0,
      averageCallDuration: 185, // seconds
      
      // SMS metrics
      smsSent: 500,
      smsDelivered: 495,
      smsReplied: 74,
      smsReplyRate: 15.0,
      
      // Social metrics
      linkedInConnectionsSent: 400,
      linkedInConnectionsAccepted: 280,
      linkedInMessagesReplied: 98,
      linkedInAcceptanceRate: 70.0,
      linkedInReplyRate: 35.0,
      
      // Engagement metrics
      websiteVisits: 892,
      contentDownloads: 156,
      webinarAttendees: 67,
      
      // Conversion metrics
      meetingsBooked: 94,
      meetingShowRate: 85.0,
      meetingsHeld: 80,
      proposalsSent: 56,
      dealsWon: 23,
      dealsLost: 18,
      dealsPending: 15,
      
      // Conversion rates
      leadToMeetingRate: 7.5,
      meetingToProposalRate: 70.0,
      proposalToCloseRate: 41.1,
      overallConversionRate: 1.8,
    },
    trends: {
      leadsGenerated: [120, 135, 142, 138, 145, 152, 148, 155, 162, 153],
      meetingsBooked: [8, 9, 10, 9, 11, 10, 9, 10, 9, 9],
      dealsWon: [2, 3, 2, 2, 3, 2, 3, 2, 2, 2],
    },
  };

  return NextResponse.json({
    success: true,
    performance,
  });
}

/**
 * Get ROI metrics
 */
async function handleGetROI(campaignId: string | null) {
  const roi = {
    campaignId: campaignId || 'all',
    
    // Investment
    totalInvestment: 165000,
    breakdown: {
      software: 25000,
      personnel: 80000,
      advertising: 35000,
      dataServices: 15000,
      other: 10000,
    },
    
    // Revenue
    totalRevenue: 1150000,
    averageDealSize: 50000,
    dealsWon: 23,
    
    // ROI Calculations
    grossProfit: 985000,
    roi: 5.97,
    roiPercentage: 597,
    
    // Cost metrics
    costPerLead: 132,
    costPerQualifiedLead: 440,
    costPerMeeting: 1755,
    costPerProposal: 2946,
    costPerDeal: 7174,
    
    // Lifetime value
    averageCustomerLifetimeValue: 250000,
    ltvToCAC: 34.8,
    
    // Payback period
    paybackPeriodMonths: 3.4,
    
    // Projections
    projectedAnnualRevenue: 6900000,
    projectedAnnualROI: 7.2,
  };

  return NextResponse.json({
    success: true,
    roi,
  });
}

/**
 * Get sales funnel metrics
 */
async function handleGetFunnel(campaignId: string | null) {
  const funnel = {
    campaignId: campaignId || 'all',
    stages: [
      {
        stage: 'Leads Generated',
        count: 1250,
        percentage: 100,
        conversionToNext: 30.0,
      },
      {
        stage: 'Qualified Leads',
        count: 375,
        percentage: 30.0,
        conversionToNext: 25.1,
      },
      {
        stage: 'Meetings Booked',
        count: 94,
        percentage: 7.5,
        conversionToNext: 85.1,
      },
      {
        stage: 'Meetings Held',
        count: 80,
        percentage: 6.4,
        conversionToNext: 70.0,
      },
      {
        stage: 'Proposals Sent',
        count: 56,
        percentage: 4.5,
        conversionToNext: 41.1,
      },
      {
        stage: 'Deals Won',
        count: 23,
        percentage: 1.8,
        conversionToNext: null,
      },
    ],
    averageTimeInStage: {
      'Leads Generated': 2,
      'Qualified Leads': 5,
      'Meetings Booked': 3,
      'Meetings Held': 7,
      'Proposals Sent': 14,
      'Deals Won': 21,
    },
    totalSalesCycleLength: 52, // days
  };

  return NextResponse.json({
    success: true,
    funnel,
  });
}

/**
 * Get channel performance comparison
 */
async function handleGetChannelPerformance(campaignId: string | null) {
  const channels = {
    campaignId: campaignId || 'all',
    performance: [
      {
        channel: 'Email',
        leadsContacted: 3750,
        responses: 441,
        responseRate: 11.8,
        meetingsBooked: 38,
        dealsWon: 8,
        revenue: 400000,
        costPerLead: 0.50,
        roi: 8.5,
        rating: 'Excellent',
      },
      {
        channel: 'LinkedIn',
        leadsContacted: 400,
        responses: 98,
        responseRate: 24.5,
        meetingsBooked: 28,
        dealsWon: 7,
        revenue: 350000,
        costPerLead: 2.00,
        roi: 7.2,
        rating: 'Excellent',
      },
      {
        channel: 'Cold Call',
        leadsContacted: 625,
        responses: 187,
        responseRate: 29.9,
        meetingsBooked: 20,
        dealsWon: 5,
        revenue: 250000,
        costPerLead: 5.00,
        roi: 4.8,
        rating: 'Good',
      },
      {
        channel: 'SMS',
        leadsContacted: 500,
        responses: 74,
        responseRate: 14.8,
        meetingsBooked: 5,
        dealsWon: 2,
        revenue: 100000,
        costPerLead: 0.25,
        roi: 6.1,
        rating: 'Good',
      },
      {
        channel: 'Direct Mail',
        leadsContacted: 200,
        responses: 12,
        responseRate: 6.0,
        meetingsBooked: 3,
        dealsWon: 1,
        revenue: 50000,
        costPerLead: 8.00,
        roi: 2.1,
        rating: 'Fair',
      },
    ],
    recommendations: [
      'Increase budget allocation to Email and LinkedIn (highest ROI)',
      'Optimize Cold Call scripts to improve conversion rate',
      'Test SMS for time-sensitive offers and follow-ups',
      'Consider reducing Direct Mail unless targeting specific high-value segments',
    ],
  };

  return NextResponse.json({
    success: true,
    channels,
  });
}

/**
 * Get lead metrics
 */
async function handleGetLeadMetrics(campaignId: string | null, timeframe: string) {
  const leads = {
    campaignId: campaignId || 'all',
    timeframe,
    
    // Lead sources
    sources: [
      { source: 'LinkedIn Sales Navigator', count: 450, percentage: 36.0 },
      { source: 'Web Scraping', count: 325, percentage: 26.0 },
      { source: 'Google Maps', count: 225, percentage: 18.0 },
      { source: 'Business Directories', count: 150, percentage: 12.0 },
      { source: 'Referrals', count: 75, percentage: 6.0 },
      { source: 'Inbound', count: 25, percentage: 2.0 },
    ],
    
    // Lead quality
    quality: {
      highQuality: 375,
      mediumQuality: 625,
      lowQuality: 250,
      averageScore: 68,
    },
    
    // Lead distribution
    byIndustry: [
      { industry: 'Software SaaS', count: 350, percentage: 28.0 },
      { industry: 'Healthcare', count: 250, percentage: 20.0 },
      { industry: 'E-commerce', count: 200, percentage: 16.0 },
      { industry: 'Financial Services', count: 175, percentage: 14.0 },
      { industry: 'Manufacturing', count: 150, percentage: 12.0 },
      { industry: 'Other', count: 125, percentage: 10.0 },
    ],
    
    byRegion: [
      { region: 'USA', count: 625, percentage: 50.0 },
      { region: 'Europe', count: 312, percentage: 25.0 },
      { region: 'Asia Pacific', count: 188, percentage: 15.0 },
      { region: 'Latin America', count: 75, percentage: 6.0 },
      { region: 'Middle East & Africa', count: 50, percentage: 4.0 },
    ],
    
    byBusinessSize: [
      { size: 'Small (10-49)', count: 500, percentage: 40.0 },
      { size: 'Medium (50-249)', count: 437, percentage: 35.0 },
      { size: 'Large (250-999)', count: 250, percentage: 20.0 },
      { size: 'Enterprise (1000+)', count: 63, percentage: 5.0 },
    ],
  };

  return NextResponse.json({
    success: true,
    leads,
  });
}

/**
 * Get revenue metrics
 */
async function handleGetRevenueMetrics(campaignId: string | null, timeframe: string) {
  const revenue = {
    campaignId: campaignId || 'all',
    timeframe,
    
    // Revenue breakdown
    totalRevenue: 1150000,
    recurringRevenue: 920000,
    oneTimeRevenue: 230000,
    
    // By industry
    byIndustry: [
      { industry: 'Software SaaS', revenue: 400000, deals: 8, avgDealSize: 50000 },
      { industry: 'Healthcare', revenue: 300000, deals: 6, avgDealSize: 50000 },
      { industry: 'E-commerce', revenue: 200000, deals: 4, avgDealSize: 50000 },
      { industry: 'Financial Services', revenue: 150000, deals: 3, avgDealSize: 50000 },
      { industry: 'Manufacturing', revenue: 100000, deals: 2, avgDealSize: 50000 },
    ],
    
    // By region
    byRegion: [
      { region: 'USA', revenue: 575000, deals: 12, percentage: 50.0 },
      { region: 'Europe', revenue: 345000, deals: 6, percentage: 30.0 },
      { region: 'Asia Pacific', revenue: 172500, deals: 4, percentage: 15.0 },
      { region: 'Other', revenue: 57500, deals: 1, percentage: 5.0 },
    ],
    
    // Monthly trend
    monthlyRevenue: [
      { month: 'Jan', revenue: 100000, deals: 2 },
      { month: 'Feb', revenue: 150000, deals: 3 },
      { month: 'Mar', revenue: 100000, deals: 2 },
      { month: 'Apr', revenue: 100000, deals: 2 },
      { month: 'May', revenue: 150000, deals: 3 },
      { month: 'Jun', revenue: 100000, deals: 2 },
      { month: 'Jul', revenue: 150000, deals: 3 },
      { month: 'Aug', revenue: 100000, deals: 2 },
      { month: 'Sep', revenue: 100000, deals: 2 },
      { month: 'Oct', revenue: 100000, deals: 2 },
    ],
    
    // Projections
    projectedMonthlyRevenue: 115000,
    projectedAnnualRevenue: 1380000,
    growthRate: 12.5,
  };

  return NextResponse.json({
    success: true,
    revenue,
  });
}

/**
 * Get campaign comparison
 */
async function handleGetComparison(timeframe: string) {
  const comparison = {
    timeframe,
    campaigns: [
      {
        id: 'campaign_1',
        name: 'Software SaaS Outreach',
        industry: 'Software SaaS',
        status: 'active',
        leadsGenerated: 450,
        meetingsBooked: 34,
        dealsWon: 8,
        revenue: 400000,
        roi: 8.5,
        rating: 'Excellent',
      },
      {
        id: 'campaign_2',
        name: 'Healthcare Provider Campaign',
        industry: 'Healthcare',
        status: 'active',
        leadsGenerated: 350,
        meetingsBooked: 28,
        dealsWon: 6,
        revenue: 300000,
        roi: 7.2,
        rating: 'Excellent',
      },
      {
        id: 'campaign_3',
        name: 'E-commerce Growth Initiative',
        industry: 'E-commerce',
        status: 'active',
        leadsGenerated: 250,
        meetingsBooked: 18,
        dealsWon: 4,
        revenue: 200000,
        roi: 5.8,
        rating: 'Good',
      },
      {
        id: 'campaign_4',
        name: 'Financial Services Expansion',
        industry: 'Financial Services',
        status: 'paused',
        leadsGenerated: 150,
        meetingsBooked: 10,
        dealsWon: 3,
        revenue: 150000,
        roi: 4.5,
        rating: 'Good',
      },
      {
        id: 'campaign_5',
        name: 'Manufacturing Outreach',
        industry: 'Manufacturing',
        status: 'completed',
        leadsGenerated: 50,
        meetingsBooked: 4,
        dealsWon: 2,
        revenue: 100000,
        roi: 3.2,
        rating: 'Fair',
      },
    ],
    insights: [
      'Software SaaS campaigns show highest ROI at 8.5x',
      'Healthcare campaigns have best meeting booking rate at 8%',
      'E-commerce campaigns show consistent performance',
      'Consider expanding successful SaaS and Healthcare campaigns',
    ],
  };

  return NextResponse.json({
    success: true,
    comparison,
  });
}
