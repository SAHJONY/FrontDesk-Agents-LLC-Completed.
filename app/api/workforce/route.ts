import { NextRequest, NextResponse } from 'next/server';
import { autonomousCommunicationWorkforce } from '@/lib/workforce/autonomous-communication-workforce';
import { reinforcementLearningSystem } from '@/lib/workforce/reinforcement-learning';
import { autonomousDecisionMaking } from '@/lib/workforce/autonomous-decision-making';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // 1. Metrics Action
    if (action === 'metrics') {
      return NextResponse.json({
        success: true,
        data: {
          workforce: autonomousCommunicationWorkforce.getMetrics(),
          learning: reinforcementLearningSystem.getLearningMetrics(),
          automation: autonomousDecisionMaking.getMetrics(),
        },
      });
    }

    // 2. Agents List
    if (action === 'agents') {
      // ✅ Updated logic to resolve property access/method mismatch
      const agents = (autonomousCommunicationWorkforce as any).getAgents 
        ? (autonomousCommunicationWorkforce as any).getAgents() 
        : (autonomousCommunicationWorkforce as any).agents;
        
      return NextResponse.json({ success: true, data: agents });
    }

    // 3. Specific Agent Detail
    if (action === 'agent') {
      const agentId = searchParams.get('agentId');
      if (!agentId) return NextResponse.json({ error: 'Missing agentId' }, { status: 400 });

      const agent = (autonomousCommunicationWorkforce as any).getAgent(agentId);
      if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

      return NextResponse.json({ success: true, data: agent });
    }

    // 4. Task Queue & History
    if (action === 'queue') {
      return NextResponse.json({ success: true, data: (autonomousCommunicationWorkforce as any).getTaskQueue() });
    }

    if (action === 'completed_tasks') {
      const limit = parseInt(searchParams.get('limit') || '100');
      return NextResponse.json({ success: true, data: (autonomousCommunicationWorkforce as any).getCompletedTasks(limit) });
    }

    // 5. Intelligence & Learning Data
    if (action === 'learning_episodes') {
      const limit = parseInt(searchParams.get('limit') || '100');
      return NextResponse.json({ success: true, data: reinforcementLearningSystem.getEpisodes(limit) });
    }

    if (action === 'q_table') {
      return NextResponse.json({ success: true, data: reinforcementLearningSystem.exportQTable() });
    }

    // 6. Decision Making & Escalation
    if (action === 'escalation_rules') {
      return NextResponse.json({ success: true, data: autonomousDecisionMaking.getEscalationRules() });
    }

    if (action === 'decision_history') {
      const limit = parseInt(searchParams.get('limit') || '100');
      return NextResponse.json({ success: true, data: autonomousDecisionMaking.getDecisionHistory(limit) });
    }

    // 7. Manual Optimization Trigger
    if (action === 'optimize') {
      const agents = (autonomousCommunicationWorkforce as any).getAgents 
        ? (autonomousCommunicationWorkforce as any).getAgents() 
        : (autonomousCommunicationWorkforce as any).agents;
        
      const optimization = await reinforcementLearningSystem.optimizeWorkforce(agents);
      return NextResponse.json({ success: true, data: optimization });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('❌ Workforce GET API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'process_communication') {
      const { type, priority, channel, payload, context } = body;

      if (!type || !priority || !channel || !payload) {
        return NextResponse.json(
          { error: 'Missing required parameters: type, priority, channel, payload' },
          { status: 400 }
        );
      }

      const task = await (autonomousCommunicationWorkforce as any).processCommunication({
        type,
        priority,
        channel,
        payload,
        context: context || {},
      });

      return NextResponse.json({ success: true, data: task });
    }

    if (action === 'add_escalation_rule') {
      const { rule } = body;
      if (!rule) return NextResponse.json({ error: 'Missing rule parameter' }, { status: 400 });

      autonomousDecisionMaking.addEscalationRule(rule);
      return NextResponse.json({ success: true, message: 'Escalation rule added' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('❌ Workforce POST API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
