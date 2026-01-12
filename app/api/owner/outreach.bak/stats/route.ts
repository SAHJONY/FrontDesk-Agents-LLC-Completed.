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

    // Fetch all leads
    const { data: leads } = await supabase
      .from('leads')
      .select('*');

    const totalLeads = leads?.length || 0;
    const qualifiedLeads = leads?.filter(l => l.score >= 60).length || 0;

    // Fetch all outreach activities
    const { data: activities } = await supabase
      .from('outreach_activities')
      .select('*');

    const activeOutreach = activities?.filter(a => a.status === 'sent').length || 0;
    const totalResponses = activities?.filter(a => a.status === 'responded').length || 0;
    const totalConversions = activities?.filter(a => a.status === 'converted').length || 0;

    // Calculate average response time
    const respondedActivities = activities?.filter(a => 
      a.status === 'responded' && a.sent_at && a.responded_at
    ) || [];

    const avgResponseTime = respondedActivities.length > 0
      ? respondedActivities.reduce((sum, a) => {
          const sent = new Date(a.sent_at).getTime();
          const responded = new Date(a.responded_at).getTime();
          return sum + (responded - sent) / (1000 * 60 * 60); // Convert to hours
        }, 0) / respondedActivities.length
      : 0;

    const stats = {
      totalLeads,
      qualifiedLeads,
      activeOutreach,
      avgResponseTime: Math.round(avgResponseTime),
      totalResponses,
      totalConversions,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in stats API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
