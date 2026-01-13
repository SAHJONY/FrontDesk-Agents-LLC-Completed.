import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Verify user is owner
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user || user.email !== 'frontdeskllc@outlook.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const campaignId = params.id;

    // Update campaign status to active
    const { data: campaign, error: updateError } = await supabase
      .from('outreach_campaigns')
      .update({
        status: 'active',
        last_activity: new Date().toISOString(),
      })
      .eq('id', campaignId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating campaign:', updateError);
      return NextResponse.json(
        { error: 'Failed to trigger campaign' },
        { status: 500 }
      );
    }

    // Trigger autonomous outreach process
    await executeAutonomousOutreach(campaignId);

    return NextResponse.json({ 
      success: true,
      campaign 
    });
  } catch (error) {
    console.error('Error in campaign trigger API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function executeAutonomousOutreach(campaignId: string) {
  const supabase = await createClient();

  // Fetch campaign details
  const { data: campaign } = await supabase
    .from('outreach_campaigns')
    .select('*')
    .eq('id', campaignId)
    .single();

  if (!campaign) return;

  // Fetch qualified leads based on target segment
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .eq('status', 'new')
    .gte('score', 60) // Only contact leads with score >= 60
    .limit(100);

  if (!leads || leads.length === 0) return;

  // Process each lead
  for (const lead of leads) {
    try {
      // Generate personalized message using AI
      const personalizedMessage = await generatePersonalizedMessage(lead, campaign);

      // Send message based on campaign type
      if (campaign.type === 'email') {
        await sendEmail(lead.email, personalizedMessage);
      } else if (campaign.type === 'sms') {
        await sendSMS(lead.phone, personalizedMessage);
      } else if (campaign.type === 'multi-channel') {
        await sendEmail(lead.email, personalizedMessage);
        if (lead.phone) {
          await sendSMS(lead.phone, personalizedMessage);
        }
      }

      // Update lead status
      await supabase
        .from('leads')
        .update({
          status: 'contacted',
          last_contact: new Date().toISOString(),
        })
        .eq('id', lead.id);

      // Log outreach activity
      await supabase
        .from('outreach_activities')
        .insert({
          campaign_id: campaignId,
          lead_id: lead.id,
          type: campaign.type,
          message: personalizedMessage,
          status: 'sent',
          sent_at: new Date().toISOString(),
        });

    } catch (error) {
      console.error(`Error processing lead ${lead.id}:`, error);
    }
  }

  // Update campaign metrics
  const { data: activities } = await supabase
    .from('outreach_activities')
    .select('*')
    .eq('campaign_id', campaignId);

  const leadsContacted = activities?.filter(a => a.status === 'sent').length || 0;
  const responses = activities?.filter(a => a.status === 'responded').length || 0;
  const conversions = activities?.filter(a => a.status === 'converted').length || 0;

  await supabase
    .from('outreach_campaigns')
    .update({
      leads_targeted: leads.length,
      leads_contacted: leadsContacted,
      responses,
      conversions,
      response_rate: leadsContacted > 0 ? (responses / leadsContacted) * 100 : 0,
      conversion_rate: responses > 0 ? (conversions / responses) * 100 : 0,
      last_activity: new Date().toISOString(),
    })
    .eq('id', campaignId);
}

async function generatePersonalizedMessage(lead: any, campaign: any): Promise<string> {
  // In production, this would call OpenAI API to generate personalized message
  // For now, return a template
  const template = campaign.message || 'Hi {name}, we noticed you might be interested in our services...';
  return template.replace('{name}', lead.name || 'there');
}

async function sendEmail(email: string, message: string) {
  // In production, integrate with email service (SendGrid, AWS SES, etc.)
  console.log(`Sending email to ${email}: ${message}`);
}

async function sendSMS(phone: string, message: string) {
  // In production, integrate with SMS service (Twilio, etc.)
  console.log(`Sending SMS to ${phone}: ${message}`);
}
