/**
 * Autonomous Sales Workforce API
 */

import { NextRequest, NextResponse } from 'next/server';
import { autonomousSalesWorkforce } from '@/lib/sales-workforce/autonomous-sales-workforce';
import { leadSourcingCrawlers } from '@/lib/sales-workforce/lead-sourcing-crawlers';
import { salesRLOptimizer } from '@/lib/sales-workforce/sales-rl-optimizer';
import { outreachAutomation } from '@/lib/sales-workforce/outreach-automation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'metrics') {
      const workforceMetrics = autonomousSalesWorkforce.getMetrics();
      const outreachMetrics = outreachAutomation.getMetrics();

      return NextResponse.json({
        success: true,
        data: {
          workforce: workforceMetrics,
          outreach: outreachMetrics,
        },
      });
    }

    if (action === 'agents') {
      const agents = autonomousSalesWorkforce.getAgents();

      return NextResponse.json({
        success: true,
        data: agents,
      });
    }

    if (action === 'campaigns') {
      const campaigns = autonomousSalesWorkforce.getCampaigns();

      return NextResponse.json({
        success: true,
        data: campaigns,
      });
    }

    if (action === 'policies') {
      const policies = autonomousSalesWorkforce.getPolicies();

      return NextResponse.json({
        success: true,
        data: policies,
      });
    }

    if (action === 'compliance_logs') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
      const logs = autonomousSalesWorkforce.getComplianceLogs(limit);

      return NextResponse.json({
        success: true,
        data: logs,
      });
    }

    if (action === 'data_sources') {
      const sources = leadSourcingCrawlers.getDataSources();

      return NextResponse.json({
        success: true,
        data: sources,
      });
    }

    if (action === 'rate_limits') {
      const sourceId = searchParams.get('sourceId');
      if (!sourceId) {
        return NextResponse.json({ error: 'Missing sourceId' }, { status: 400 });
      }

      const status = leadSourcingCrawlers.getRateLimitStatus(sourceId);

      return NextResponse.json({
        success: true,
        data: status,
      });
    }

    if (action === 'experiments') {
      const experiments = salesRLOptimizer.getAllExperiments();

      return NextResponse.json({
        success: true,
        data: experiments,
      });
    }

    if (action === 'experiment_result') {
      const experimentId = searchParams.get('experimentId');
      if (!experimentId) {
        return NextResponse.json({ error: 'Missing experimentId' }, { status: 400 });
      }

      const result = salesRLOptimizer.getExperimentResults(experimentId);

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    if (action === 'sequences') {
      const sequences = outreachAutomation.getSequences();

      return NextResponse.json({
        success: true,
        data: sequences,
      });
    }

    if (action === 'bookings') {
      const bookings = outreachAutomation.getBookings();

      return NextResponse.json({
        success: true,
        data: bookings,
      });
    }

    if (action === 'deals') {
      const deals = outreachAutomation.getDeals();

      return NextResponse.json({
        success: true,
        data: deals,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Sales workforce API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'create_campaign') {
      const { country, city, industry, language, offer, target_plan, channel_constraints, weekly_volume_target } = body;

      if (!country || !industry || !language || !offer || !target_plan) {
        return NextResponse.json(
          { error: 'Missing required parameters: country, industry, language, offer, target_plan' },
          { status: 400 }
        );
      }

      const campaign = await autonomousSalesWorkforce.createCampaign({
        country,
        city,
        industry,
        language,
        offer,
        target_plan,
        channel_constraints,
        weekly_volume_target,
      });

      return NextResponse.json({
        success: true,
        data: campaign,
      });
    }

    if (action === 'source_leads') {
      const { campaign_id, industry, country, limit } = body;

      if (!campaign_id || !industry || !country || !limit) {
        return NextResponse.json(
          { error: 'Missing required parameters: campaign_id, industry, country, limit' },
          { status: 400 }
        );
      }

      const leads = await outreachAutomation.sourceLeads(campaign_id, {
        industry,
        country,
        limit,
      });

      return NextResponse.json({
        success: true,
        data: leads,
      });
    }

    if (action === 'create_experiment') {
      const { campaign_id, variable, variants, allocation } = body;

      if (!campaign_id || !variable || !variants) {
        return NextResponse.json(
          { error: 'Missing required parameters: campaign_id, variable, variants' },
          { status: 400 }
        );
      }

      const experiment = salesRLOptimizer.createExperiment({
        campaign_id,
        variable,
        variants,
        allocation,
      });

      return NextResponse.json({
        success: true,
        data: experiment,
      });
    }

    if (action === 'run_experiment') {
      const { experiment_id, samples_per_variant } = body;

      if (!experiment_id) {
        return NextResponse.json({ error: 'Missing experiment_id' }, { status: 400 });
      }

      const result = await salesRLOptimizer.runExperiment(experiment_id, samples_per_variant);

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    if (action === 'get_recommendations') {
      const { campaign_id } = body;

      if (!campaign_id) {
        return NextResponse.json({ error: 'Missing campaign_id' }, { status: 400 });
      }

      const recommendations = await salesRLOptimizer.getRecommendations(campaign_id);

      return NextResponse.json({
        success: true,
        data: recommendations,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Sales workforce API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
