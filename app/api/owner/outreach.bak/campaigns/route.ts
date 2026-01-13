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

    // Fetch campaigns
    const { data: campaigns, error: campaignsError } = await supabase
      .from('outreach_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (campaignsError) {
      console.error('Error fetching campaigns:', campaignsError);
      return NextResponse.json({ campaigns: [] });
    }

    return NextResponse.json({ campaigns: campaigns || [] });
  } catch (error) {
    console.error('Error in campaigns API:', error);
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
    const { name, type, targetSegment, message, schedule } = body;

    // Create new campaign
    const { data: campaign, error: createError } = await supabase
      .from('outreach_campaigns')
      .insert({
        name,
        type,
        target_segment: targetSegment,
        message,
        schedule,
        status: 'active',
        leads_targeted: 0,
        leads_contacted: 0,
        responses: 0,
        conversions: 0,
        response_rate: 0,
        conversion_rate: 0,
        last_activity: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating campaign:', createError);
      return NextResponse.json(
        { error: 'Failed to create campaign' },
        { status: 500 }
      );
    }

    // Trigger autonomous outreach
    await triggerAutonomousOutreach(campaign.id);

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error('Error in campaigns API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function triggerAutonomousOutreach(campaignId: string) {
  // This function will be called by a background worker
  // For now, we'll just log it
  console.log(`Triggering autonomous outreach for campaign ${campaignId}`);
  
  // In production, this would:
  // 1. Fetch qualified leads based on campaign target segment
  // 2. Score and prioritize leads
  // 3. Generate personalized messages using AI
  // 4. Send messages via appropriate channels (email, SMS, etc.)
  // 5. Track responses and update campaign metrics
}
