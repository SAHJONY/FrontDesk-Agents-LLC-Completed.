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

    // Fetch leads with scoring
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .order('score', { ascending: false })
      .limit(50);

    if (leadsError) {
      console.error('Error fetching leads:', leadsError);
      return NextResponse.json({ leads: [] });
    }

    // Calculate next action for each lead
    const leadsWithActions = leads?.map(lead => ({
      ...lead,
      nextAction: determineNextAction(lead),
    })) || [];

    return NextResponse.json({ leads: leadsWithActions });
  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function determineNextAction(lead: any): string {
  const now = new Date();
  const lastContact = lead.last_contact ? new Date(lead.last_contact) : null;
  const daysSinceContact = lastContact 
    ? Math.floor((now.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // High score leads
  if (lead.score >= 80) {
    if (lead.status === 'new') {
      return 'Send personalized email immediately';
    } else if (lead.status === 'contacted' && daysSinceContact && daysSinceContact >= 3) {
      return 'Follow up with phone call';
    } else if (lead.status === 'responded') {
      return 'Schedule demo call';
    }
  }

  // Medium score leads
  if (lead.score >= 60) {
    if (lead.status === 'new') {
      return 'Add to email nurture campaign';
    } else if (lead.status === 'contacted' && daysSinceContact && daysSinceContact >= 7) {
      return 'Send follow-up email';
    }
  }

  // Low score leads
  if (lead.score >= 40) {
    if (lead.status === 'new') {
      return 'Add to general newsletter';
    } else if (lead.status === 'contacted' && daysSinceContact && daysSinceContact >= 14) {
      return 'Send re-engagement email';
    }
  }

  // Very low score leads
  if (lead.status === 'new') {
    return 'Monitor for engagement signals';
  }

  return 'No action needed';
}

// Lead scoring algorithm
export async function scoreLeads() {
  const supabase = await createClient();

  const { data: leads } = await supabase
    .from('leads')
    .select('*');

  if (!leads) return;

  for (const lead of leads) {
    let score = 0;

    // Email domain scoring (company vs personal email)
    if (lead.email) {
      const domain = lead.email.split('@')[1];
      if (!['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain)) {
        score += 20; // Company email
      }
    }

    // Phone number presence
    if (lead.phone) {
      score += 10;
    }

    // Company name presence
    if (lead.company) {
      score += 15;
    }

    // Source quality
    const sourceScores: Record<string, number> = {
      'referral': 25,
      'website': 20,
      'linkedin': 15,
      'cold_outreach': 10,
      'other': 5,
    };
    score += sourceScores[lead.source] || 0;

    // Engagement signals
    if (lead.website_visits > 5) score += 10;
    if (lead.email_opens > 3) score += 10;
    if (lead.link_clicks > 2) score += 10;

    // Recency
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceCreated <= 7) score += 10;
    else if (daysSinceCreated <= 30) score += 5;

    // Cap score at 100
    score = Math.min(score, 100);

    // Update lead score
    await supabase
      .from('leads')
      .update({ score })
      .eq('id', lead.id);
  }
}
