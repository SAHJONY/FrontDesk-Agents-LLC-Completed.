import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type'); // filter by activity type
    const status = searchParams.get('status'); // filter by status

    // Mock sales activities
    const activities = [
      {
        id: 'act_001',
        type: 'new_customer',
        customerName: 'Acme Healthcare',
        customerEmail: 'contact@acmehealthcare.com',
        amount: 5000,
        plan: 'Growth',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'completed',
        details: 'Signed annual contract',
        rep: 'AI Sales Agent',
      },
      {
        id: 'act_002',
        type: 'upgrade',
        customerName: 'Smith Legal Partners',
        customerEmail: 'admin@smithlegal.com',
        amount: 2000,
        plan: 'Professional → Growth',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'completed',
        details: 'Upgraded to Growth plan',
        rep: 'AI Sales Agent',
      },
      {
        id: 'act_003',
        type: 'renewal',
        customerName: 'Downtown Dental',
        customerEmail: 'office@downtowndental.com',
        amount: 3000,
        plan: 'Professional',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        status: 'completed',
        details: 'Annual renewal',
        rep: 'Auto-renewal',
      },
      {
        id: 'act_004',
        type: 'new_customer',
        customerName: 'Property Plus Management',
        customerEmail: 'info@propertyplus.com',
        amount: 7500,
        plan: 'Enterprise',
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        status: 'pending',
        details: 'Contract sent, awaiting signature',
        rep: 'AI Sales Agent',
      },
      {
        id: 'act_005',
        type: 'churn',
        customerName: 'Quick Stop Retail',
        customerEmail: 'manager@quickstop.com',
        amount: -1500,
        plan: 'Starter',
        timestamp: new Date(Date.now() - 28800000).toISOString(),
        status: 'completed',
        details: 'Cancelled subscription - budget constraints',
        rep: 'System',
      },
      {
        id: 'act_006',
        type: 'new_customer',
        customerName: 'Elite Fitness Center',
        customerEmail: 'admin@elitefitness.com',
        amount: 3500,
        plan: 'Professional',
        timestamp: new Date(Date.now() - 36000000).toISOString(),
        status: 'completed',
        details: 'Monthly subscription started',
        rep: 'AI Sales Agent',
      },
      {
        id: 'act_007',
        type: 'upgrade',
        customerName: 'Riverside Hotel',
        customerEmail: 'reservations@riversidehotel.com',
        amount: 3000,
        plan: 'Starter → Professional',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        status: 'completed',
        details: 'Added 2 additional locations',
        rep: 'AI Sales Agent',
      },
      {
        id: 'act_008',
        type: 'renewal',
        customerName: 'Tech Solutions Inc',
        customerEmail: 'billing@techsolutions.com',
        amount: 6000,
        plan: 'Growth',
        timestamp: new Date(Date.now() - 50400000).toISOString(),
        status: 'completed',
        details: 'Quarterly renewal',
        rep: 'Auto-renewal',
      },
      {
        id: 'act_009',
        type: 'new_customer',
        customerName: 'Green Valley Clinic',
        customerEmail: 'office@greenvalleyclinic.com',
        amount: 4000,
        plan: 'Professional',
        timestamp: new Date(Date.now() - 57600000).toISOString(),
        status: 'completed',
        details: 'Annual contract signed',
        rep: 'AI Sales Agent',
      },
      {
        id: 'act_010',
        type: 'upgrade',
        customerName: 'Metro Law Firm',
        customerEmail: 'contact@metrolaw.com',
        amount: 2500,
        plan: 'Professional → Growth',
        timestamp: new Date(Date.now() - 64800000).toISOString(),
        status: 'completed',
        details: 'Expanded to 3 offices',
        rep: 'AI Sales Agent',
      },
    ];

    // Apply filters
    let filteredActivities = activities;
    
    if (type) {
      filteredActivities = filteredActivities.filter(a => a.type === type);
    }
    
    if (status) {
      filteredActivities = filteredActivities.filter(a => a.status === status);
    }

    // Apply limit
    filteredActivities = filteredActivities.slice(0, limit);

    // Calculate summary stats
    const summary = {
      total: activities.length,
      completed: activities.filter(a => a.status === 'completed').length,
      pending: activities.filter(a => a.status === 'pending').length,
      totalValue: activities.reduce((sum, a) => sum + a.amount, 0),
      byType: {
        new_customer: activities.filter(a => a.type === 'new_customer').length,
        upgrade: activities.filter(a => a.type === 'upgrade').length,
        renewal: activities.filter(a => a.type === 'renewal').length,
        churn: activities.filter(a => a.type === 'churn').length,
      },
    };

    return NextResponse.json({ 
      activities: filteredActivities,
      summary,
      total: filteredActivities.length,
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, customerName, customerEmail, amount, plan, details } = body;

    // Create new activity
    const activity = {
      id: `act_${Date.now()}`,
      type,
      customerName,
      customerEmail,
      amount,
      plan,
      timestamp: new Date().toISOString(),
      status: 'pending',
      details: details || '',
      rep: 'Manual Entry',
    };

    console.log('Sales activity created:', activity);

    // In production, this would:
    // 1. Save to database
    // 2. Update related metrics
    // 3. Trigger notifications
    // 4. Update customer record

    return NextResponse.json({ 
      success: true,
      activity,
      message: 'Activity recorded successfully'
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
