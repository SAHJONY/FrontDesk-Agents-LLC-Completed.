// app/api/owner/outreach/rules/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    // Mock automation rules
    const rules = [
      {
        id: 'rule_001',
        name: 'Auto-follow-up after no response',
        enabled: true,
        trigger: {
          event: 'no_response',
          afterHours: 48,
        },
        action: {
          type: 'send_followup_email',
          template: 'followup_1',
        },
        scope: {
          campaigns: 'all',
        },
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      {
        id: 'rule_002',
        name: 'Escalate hot leads to call',
        enabled: true,
        trigger: {
          event: 'lead_score_threshold',
          minScore: 85,
        },
        action: {
          type: 'schedule_call_task',
          withinHours: 4,
        },
        scope: {
          campaigns: 'all',
        },
        createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
      {
        id: 'rule_003',
        name: 'Pause outreach on negative reply',
        enabled: true,
        trigger: {
          event: 'negative_reply',
        },
        action: {
          type: 'pause_lead',
          reason: 'Negative reply received',
        },
        scope: {
          campaigns: 'all',
        },
        createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
    ];

    return NextResponse.json({ success: true, rules, count: rules.length });
  } catch (error) {
    console.error('Error fetching rules:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, enabled, trigger, action, scope } = body ?? {};

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }
    if (!trigger || typeof trigger !== 'object') {
      return NextResponse.json({ error: 'trigger is required' }, { status: 400 });
    }
    if (!action || typeof action !== 'object') {
      return NextResponse.json({ error: 'action is required' }, { status: 400 });
    }

    const rule = {
      id: `rule_${Date.now()}`,
      name,
      enabled: typeof enabled === 'boolean' ? enabled : true,
      trigger,
      action,
      scope: scope ?? { campaigns: 'all' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In production: persist rule
    console.log('Rule created:', rule);

    return NextResponse.json({
      success: true,
      rule,
      message: 'Rule created successfully',
    });
  } catch (error) {
    console.error('Error creating rule:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { ruleId, enabled, name, trigger, action, scope } = body ?? {};

    if (!ruleId || typeof ruleId !== 'string') {
      return NextResponse.json({ error: 'ruleId is required' }, { status: 400 });
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };
    if (typeof enabled === 'boolean') updates.enabled = enabled;
    if (typeof name === 'string') updates.name = name;
    if (trigger && typeof trigger === 'object') updates.trigger = trigger;
    if (action && typeof action === 'object') updates.action = action;
    if (scope && typeof scope === 'object') updates.scope = scope;

    // In production: update rule in DB
    console.log('Rule updated:', { ruleId, updates });

    return NextResponse.json({
      success: true,
      ruleId,
      updates,
      message: 'Rule updated successfully',
    });
  } catch (error) {
    console.error('Error updating rule:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
