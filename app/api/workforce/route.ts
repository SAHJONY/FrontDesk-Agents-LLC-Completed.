/**
 * Autonomous Communication Workforce API
 */

import { NextRequest, NextResponse } from 'next/server';
import { autonomousCommunicationWorkforce } from '@/lib/workforce/autonomous-communication-workforce';
import { reinforcementLearningSystem } from '@/lib/workforce/reinforcement-learning';
import { autonomousDecisionMaking } from '@/lib/workforce/autonomous-decision-making';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'metrics') {
      const workforceMetrics = autonomousCommunicationWorkforce.getMetrics();
      const learningMetrics = reinforcementLearningSystem.getLearningMetrics();
      const automationMetrics = autonomousDecisionMaking.getMetrics();

      return NextResponse.json({
        success: true,
        data: {
          workforce: workforceMetrics,
          learning: learningMetrics,
          automation: automationMetrics,
        },
      });
    }

    if (action === 'agents') {
      const agents = autonomousCommunicationWorkforce.getAgents();

      return NextResponse.json({
        success: true,
        data: agents,
      });
    }

    if (action === 'agent') {
      const agentId = searchParams.get('agentId');
      if (!agentId) {
        return NextResponse.json({ error: 'Missing agentId' }, { status: 400 });
      }

      const agent = autonomousCommunicationWorkforce.getAgent(agentId);
      if (!agent) {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: agent,
      });
    }

    if (action === 'queue') {
      const queue = autonomousCommunicationWorkforce.getTaskQueue();

      return NextResponse.json({
        success: true,
        data: queue,
      });
    }

    if (action === 'completed_tasks') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
      const tasks = autonomousCommunicationWorkforce.getCompletedTasks(limit);

      return NextResponse.json({
        success: true,
        data: tasks,
      });
    }

    if (action === 'learning_episodes') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
      const episodes = reinforcementLearningSystem.getEpisodes(limit);

      return NextResponse.json({
        success: true,
        data: episodes,
      });
    }

    if (action === 'q_table') {
      const qTable = reinforcementLearningSystem.exportQTable();

      return NextResponse.json({
        success: true,
        data: qTable,
      });
    }

    if (action === 'escalation_rules') {
      const rules = autonomousDecisionMaking.getEscalationRules();

      return NextResponse.json({
        success: true,
        data: rules,
      });
    }

    if (action === 'decision_history') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
      const history = autonomousDecisionMaking.getDecisionHistory(limit);

      return NextResponse.json({
        success: true,
        data: history,
      });
    }

    if (action === 'optimize') {
      const agents = autonomousCommunicationWorkforce.getAgents();
      const optimization = await reinforcementLearningSystem.optimizeWorkforce(agents);

      return NextResponse.json({
        success: true,
        data: optimization,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Workforce API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
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

      const task = await autonomousCommunicationWorkforce.processCommunication({
        type,
        priority,
        channel,
        payload,
        context: context || {},
      });

      return NextResponse.json({
        success: true,
        data: task,
      });
    }

    if (action === 'add_escalation_rule') {
      const { rule } = body;

      if (!rule) {
        return NextResponse.json({ error: 'Missing rule parameter' }, { status: 400 });
      }

      autonomousDecisionMaking.addEscalationRule(rule);

      return NextResponse.json({
        success: true,
        message: 'Escalation rule added successfully',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Workforce API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
