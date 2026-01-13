import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock automation rules
    const rules = [
      {
        id: 'rule_001',
        name: 'Auto Follow-Up Non-Responders',
        trigger: 'No response after 3 days',
        action: 'Send follow-up email',
        enabled: true,
        executionCount: 245,
        successRate: 98.5,
        lastExecuted: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'rule_002',
        name: 'Escalate Hot Leads',
        trigger: 'Lead score > 90 and responded',
        action: 'Notify sales team + Schedule call',
        enabled: true,
        executionCount: 12,
        successRate: 100,
        lastExecuted: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'rule_003',
        name: 'Pause Cold Leads',
        trigger: 'No response after 3 attempts',
        action: 'Mark as cold + Stop outreach',
        enabled: true,
        executionCount: 48,
        successRate: 100,
        lastExecuted: new Date(Date.now() - 14400000).toISOString(),
      },
      {
        id: 'rule_004',
        name: 'Multi-Channel Engagement',
        trigger: 'Email opened but no response',
        action: 'Send SMS follow-up',
        enabled: true,
        executionCount: 67,
        successRate: 95.5,
        lastExecuted: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: 'rule_005',
        name: 'Track Conversions',
        trigger: 'Lead status changed to converted',
        action: 'Update metrics + Send to CRM',
        enabled: true,
        executionCount: 5,
        successRate: 100,
        lastExecuted: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    return NextResponse.json({ 
      rules,
      total: rules.length,
      active: rules.filter(r => r.enabled).length,
      totalExecutions: rules.reduce((sum, r) => sum + r.executionCount, 0),
    });
  } catch (error) {
    console.error('Error fetching rules:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, trigger, action, conditions } = body;

    // Validate required fields
    if (!name || !trigger || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: name, trigger, action' },
        { status: 400 }
      );
    }

    // Create new automation rule
    const rule = {
      id: `rule_${Date.now()}`,
      name,
      trigger,
      action,
      conditions: conditions || {},
      enabled: true,
      executionCount: 0,
      successRate: 0,
      createdAt: new Date().toISOString(),
      lastExecuted: null,
    };

    console.log('Automation rule created:', rule);

    // In production, this would:
    // 1. Save to database
    // 2. Register with automation engine
    // 3. Start monitoring for trigger conditions

    return NextResponse.json({ 
      success: true,
      rule,
      message: 'Automation rule created successfully'
    });
  } catch (error) {
    console.error('Error creating rule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { ruleId, enabled, name, trigger, action } = body;

    if (!ruleId) {
      return NextResponse.json(
        { error: 'Missing required field: ruleId' },
        { status: 400 }
      );
    }

    console.log(`Updating rule ${ruleId}`);

    // In production, this would update the rule in the database
    
    return NextResponse.json({ 
      success: true,
      message: 'Rule updated successfully'
    });
  } catch (error) {
    console.error('Error updating rule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ruleId = searchParams.get('ruleId');

    if (!ruleId) {
      return NextResponse.json(
        { error: 'Missing required parameter: ruleId' },
        { status: 400 }
      );
    }

    console.log(`Deleting rule ${ruleId}`);

    // In production, this would:
    // 1. Disable the rule
    // 2. Remove from automation engine
    // 3. Archive in database

    return NextResponse.json({ 
      success: true,
      message: 'Rule deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting rule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
