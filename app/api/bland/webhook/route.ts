import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Webhook handler for Bland.AI call events
 * Receives real-time updates about call status, recordings, and analytics
 */
export async function POST(request: Request) {
  try {
    const event = await request.json();

    console.log('📞 Bland.AI Webhook Event:', event.event_type);

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Handle different event types
    switch (event.event_type) {
      case 'call_started':
        await handleCallStarted(event, supabase);
        break;

      case 'call_ended':
        await handleCallEnded(event, supabase);
        break;

      case 'call_analyzed':
        await handleCallAnalyzed(event, supabase);
        break;

      case 'recording_available':
        await handleRecordingAvailable(event, supabase);
        break;

      default:
        console.log('Unknown event type:', event.event_type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleCallStarted(event: any, supabase: any) {
  console.log(`📞 Call started: ${event.call_id}`);

  try {
    // Create call record in database
    const { data, error } = await supabase.from('calls').insert({
      call_id: event.call_id,
      phone_number: event.to || event.from,
      direction: event.direction || 'outbound',
      status: 'in_progress',
      started_at: new Date().toISOString(),
      agent_name: event.agent_name || 'AI Agent',
      metadata: event.metadata || {},
    });

    if (error) {
      console.error('Error creating call record:', error);
    } else {
      console.log('✅ Call record created');
    }

    // Update real-time metrics
    await updateMetrics(supabase, 'call_started');
  } catch (error) {
    console.error('Error in handleCallStarted:', error);
  }
}

async function handleCallEnded(event: any, supabase: any) {
  console.log(`📞 Call ended: ${event.call_id}`);
  console.log(`   Duration: ${event.duration}s`);
  console.log(`   Status: ${event.status}`);
  console.log(`   Disposition: ${event.disposition}`);

  try {
    // Update call record with end details
    const { data, error } = await supabase
      .from('calls')
      .update({
        status: 'completed',
        ended_at: new Date().toISOString(),
        duration: event.duration || 0,
        disposition: event.disposition || 'unknown',
        call_status: event.status || 'completed',
        summary: event.summary || '',
        transcript: event.transcript || '',
        recording_url: event.recording_url || null,
      })
      .eq('call_id', event.call_id);

    if (error) {
      console.error('Error updating call record:', error);
    } else {
      console.log('✅ Call record updated');
    }

    // Calculate billing based on duration
    await calculateBilling(event, supabase);

    // Update agent performance metrics
    await updateAgentPerformance(event, supabase);

    // Update real-time metrics
    await updateMetrics(supabase, 'call_ended', event);
  } catch (error) {
    console.error('Error in handleCallEnded:', error);
  }
}

async function handleCallAnalyzed(event: any, supabase: any) {
  console.log(`🔍 Call analyzed: ${event.call_id}`);

  try {
    // Store AI analysis in database
    const { data, error} = await supabase.from('call_analytics').insert({
      call_id: event.call_id,
      summary: event.summary || '',
      sentiment: event.sentiment || 'neutral',
      keywords: event.keywords || [],
      action_items: event.action_items || [],
      customer_intent: event.customer_intent || 'unknown',
      lead_quality: event.lead_quality || 'unknown',
      conversion_probability: event.conversion_probability || 0,
      analyzed_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error storing analytics:', error);
    } else {
      console.log('✅ Analytics stored');
    }

    // Trigger follow-up actions based on analysis
    await triggerFollowUpActions(event, supabase);

    // Update conversion tracking
    await updateConversionTracking(event, supabase);
  } catch (error) {
    console.error('Error in handleCallAnalyzed:', error);
  }
}

async function handleRecordingAvailable(event: any, supabase: any) {
  console.log(`🎙️  Recording available: ${event.call_id}`);
  console.log(`   URL: ${event.recording_url}`);

  try {
    // Update call record with recording URL
    const { data, error } = await supabase
      .from('calls')
      .update({
        recording_url: event.recording_url,
        recording_available: true,
      })
      .eq('call_id', event.call_id);

    if (error) {
      console.error('Error updating recording URL:', error);
    } else {
      console.log('✅ Recording URL updated');
    }

    // Optionally: Download and store recording in Supabase Storage
    // await downloadAndStoreRecording(event.recording_url, event.call_id, supabase);

    // Trigger transcription if needed
    if (event.transcript_url) {
      await storeTranscript(event.call_id, event.transcript_url, supabase);
    }
  } catch (error) {
    console.error('Error in handleRecordingAvailable:', error);
  }
}

/**
 * Calculate billing based on call duration
 */
async function calculateBilling(event: any, supabase: any) {
  try {
    const duration = event.duration || 0;
    const costPerMinute = 0.10; // $0.10 per minute
    const minutes = Math.ceil(duration / 60);
    const cost = minutes * costPerMinute;

    // Get user/tenant from call metadata
    const userId = event.metadata?.user_id || event.metadata?.tenant_id;

    if (userId) {
      // Record billing entry
      await supabase.from('billing_usage').insert({
        user_id: userId,
        call_id: event.call_id,
        duration_seconds: duration,
        duration_minutes: minutes,
        cost_usd: cost,
        billed_at: new Date().toISOString(),
      });

      console.log(`💰 Billing calculated: ${minutes} min × $${costPerMinute} = $${cost.toFixed(2)}`);
    }
  } catch (error) {
    console.error('Error calculating billing:', error);
  }
}

/**
 * Update agent performance metrics
 */
async function updateAgentPerformance(event: any, supabase: any) {
  try {
    const agentName = event.agent_name || 'AI Agent';
    const duration = event.duration || 0;
    const disposition = event.disposition || 'unknown';

    // Determine if call was successful
    const isSuccessful =
      disposition === 'qualified' ||
      disposition === 'appointment_set' ||
      disposition === 'converted';

    // Update or insert agent performance
    const { data: existing } = await supabase
      .from('agent_performance')
      .select('*')
      .eq('agent_name', agentName)
      .single();

    if (existing) {
      // Update existing record
      await supabase
        .from('agent_performance')
        .update({
          total_calls: existing.total_calls + 1,
          successful_calls: existing.successful_calls + (isSuccessful ? 1 : 0),
          total_duration: existing.total_duration + duration,
          conversion_rate:
            ((existing.successful_calls + (isSuccessful ? 1 : 0)) /
              (existing.total_calls + 1)) *
            100,
          avg_duration: (existing.total_duration + duration) / (existing.total_calls + 1),
          last_call_at: new Date().toISOString(),
        })
        .eq('agent_name', agentName);
    } else {
      // Create new record
      await supabase.from('agent_performance').insert({
        agent_name: agentName,
        total_calls: 1,
        successful_calls: isSuccessful ? 1 : 0,
        total_duration: duration,
        conversion_rate: isSuccessful ? 100 : 0,
        avg_duration: duration,
        last_call_at: new Date().toISOString(),
      });
    }

    console.log(`📊 Agent performance updated: ${agentName}`);
  } catch (error) {
    console.error('Error updating agent performance:', error);
  }
}

/**
 * Trigger follow-up actions based on call analysis
 */
async function triggerFollowUpActions(event: any, supabase: any) {
  try {
    const actionItems = event.action_items || [];
    const leadQuality = event.lead_quality || 'unknown';

    // If high-quality lead, schedule immediate follow-up
    if (leadQuality === 'hot' || leadQuality === 'qualified') {
      await supabase.from('follow_up_tasks').insert({
        call_id: event.call_id,
        task_type: 'follow_up_call',
        priority: 'high',
        scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        action_items: actionItems,
        created_at: new Date().toISOString(),
      });

      console.log('📅 Follow-up task scheduled for hot lead');
    }

    // If action items exist, create tasks
    for (const item of actionItems) {
      await supabase.from('action_items').insert({
        call_id: event.call_id,
        description: item,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error triggering follow-up actions:', error);
  }
}

/**
 * Update conversion tracking
 */
async function updateConversionTracking(event: any, supabase: any) {
  try {
    const conversionProbability = event.conversion_probability || 0;
    const leadQuality = event.lead_quality || 'unknown';

    // Track conversion funnel
    await supabase.from('conversion_funnel').insert({
      call_id: event.call_id,
      stage: 'call_completed',
      lead_quality: leadQuality,
      conversion_probability: conversionProbability,
      timestamp: new Date().toISOString(),
    });

    console.log(`📈 Conversion tracking updated: ${leadQuality} (${conversionProbability}% probability)`);
  } catch (error) {
    console.error('Error updating conversion tracking:', error);
  }
}

/**
 * Store transcript
 */
async function storeTranscript(callId: string, transcriptUrl: string, supabase: any) {
  try {
    // Fetch transcript
    const response = await fetch(transcriptUrl);
    const transcript = await response.text();

    // Store in database
    await supabase
      .from('calls')
      .update({
        transcript: transcript,
        transcript_url: transcriptUrl,
      })
      .eq('call_id', callId);

    console.log('✅ Transcript stored');
  } catch (error) {
    console.error('Error storing transcript:', error);
  }
}

/**
 * Update real-time metrics
 */
async function updateMetrics(supabase: any, eventType: string, event?: any) {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Get or create today's metrics
    const { data: existing } = await supabase
      .from('daily_metrics')
      .select('*')
      .eq('date', today)
      .single();

    if (existing) {
      const updates: any = {
        updated_at: new Date().toISOString(),
      };

      if (eventType === 'call_started') {
        updates.total_calls = existing.total_calls + 1;
        updates.active_calls = existing.active_calls + 1;
      } else if (eventType === 'call_ended') {
        updates.active_calls = Math.max(0, existing.active_calls - 1);
        updates.completed_calls = existing.completed_calls + 1;
        updates.total_duration = existing.total_duration + (event?.duration || 0);
      }

      await supabase.from('daily_metrics').update(updates).eq('date', today);
    } else {
      // Create new metrics record
      await supabase.from('daily_metrics').insert({
        date: today,
        total_calls: eventType === 'call_started' ? 1 : 0,
        active_calls: eventType === 'call_started' ? 1 : 0,
        completed_calls: eventType === 'call_ended' ? 1 : 0,
        total_duration: event?.duration || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error updating metrics:', error);
  }
}
