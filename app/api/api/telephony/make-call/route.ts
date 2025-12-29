import { NextResponse } from 'next/server';
import { blandAIConfig } from '@/Telephony/blandai-config';
import { agenticOrchestrator } from '@/lib/ai/orchestrator';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * FRONTDESK AGENTS: AUTONOMOUS CALL INITIATION
 * * This route executes the outbound agentic workforce logic.
 * * Optimized for the Western Corridor Primary Operational Zone (pdx1).
 */

export async function POST(req: Request) {
  try {
    const { phoneNumber, tenantId, leadName, goal } = await req.json();

    // 1. Fetch Tenant Data for Market Equity Calculation [cite: 2025-12-24]
    const { data: tenant, error: tenantError } = await supabaseAdmin
      .from('tenants')
      .select('tier, regional_multiplier')
      .eq('id', tenantId)
      .single();

    if (tenantError || !tenant) {
      return NextResponse.json({ error: 'Tenant unauthorized' }, { status: 401 });
    }

    // 2. Determine RL Strategy via Agentic Orchestrator
    const strategy = await agenticOrchestrator.determineStrategy(
      tenant.tier, 
      tenant.regional_multiplier
    );

    // 3. Inject Autonomous Workforce via Bland.AI
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_AI_API_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: `You are a ${tenant.tier} level FrontDesk Agent. Your goal is: ${goal}. 
               Address the lead as ${leadName}. Use a professional, high-conversion tone.`,
        model: strategy.model,
        voice: blandAIConfig.voices[tenant.tier as keyof typeof blandAIConfig.voices] || 'maya',
        interruption_threshold: strategy.tierSettings.interruption_threshold,
        temperature: strategy.tierSettings.temperature,
        metadata: {
          tenantId: tenantId,
          tier: tenant.tier,
          multiplier: tenant.regional_multiplier,
          pdx1_build_id: "2025-12-29-LATEST"
        }
      })
    });

    const result = await response.json();

    // 4. Log Autonomous Trigger
    await supabaseAdmin.from('call_logs').insert({
      tenant_id: tenantId,
      call_id: result.call_id,
      status: 'initiated',
      tier_applied: tenant.tier
    });

    return NextResponse.json({ 
      success: true, 
      callId: result.call_id,
      strategy_applied: strategy.priority > 0.8 ? 'MAX_YIELD' : 'STANDARD'
    });

  } catch (error: any) {
    console.error('FrontDesk Agents Execution Error:', error.message);
    return NextResponse.json({ error: 'Autonomous Node Failure' }, { status: 500 });
  }
                                                                    }
