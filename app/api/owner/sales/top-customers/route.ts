import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'mrr'; // mrr, ltv, signupDate
    const status = searchParams.get('status'); // active, at_risk, churned

    // Mock top customers data
    const customers = [
      {
        id: 'cust_001',
        name: 'Acme Healthcare Network',
        email: 'billing@acmehealthcare.com',
        plan: 'Enterprise',
        tier: 'enterprise',
        mrr: 2500,
        ltv: 75000,
        signupDate: '2024-03-15',
        status: 'active',
        locations: 5,
        callVolume: 1250,
        satisfaction: 98,
        lastContact: new Date(Date.now() - 86400000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-03-15',
        renewalProbability: 95,
      },
      {
        id: 'cust_002',
        name: 'Metropolitan Law Group',
        email: 'admin@metrolaw.com',
        plan: 'Growth',
        tier: 'growth',
        mrr: 1800,
        ltv: 32400,
        signupDate: '2024-06-20',
        status: 'active',
        locations: 3,
        callVolume: 850,
        satisfaction: 96,
        lastContact: new Date(Date.now() - 172800000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-06-20',
        renewalProbability: 92,
      },
      {
        id: 'cust_003',
        name: 'Property Plus Management',
        email: 'info@propertyplus.com',
        plan: 'Growth',
        tier: 'growth',
        mrr: 1600,
        ltv: 28800,
        signupDate: '2024-07-10',
        status: 'active',
        locations: 4,
        callVolume: 920,
        satisfaction: 94,
        lastContact: new Date(Date.now() - 259200000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-07-10',
        renewalProbability: 88,
      },
      {
        id: 'cust_004',
        name: 'Elite Dental Associates',
        email: 'office@elitedental.com',
        plan: 'Professional',
        tier: 'professional',
        mrr: 1200,
        ltv: 21600,
        signupDate: '2024-05-05',
        status: 'active',
        locations: 2,
        callVolume: 680,
        satisfaction: 97,
        lastContact: new Date(Date.now() - 345600000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-05-05',
        renewalProbability: 94,
      },
      {
        id: 'cust_005',
        name: 'Riverside Hospitality',
        email: 'reservations@riversidehotels.com',
        plan: 'Professional',
        tier: 'professional',
        mrr: 1100,
        ltv: 19800,
        signupDate: '2024-08-12',
        status: 'active',
        locations: 2,
        callVolume: 750,
        satisfaction: 95,
        lastContact: new Date(Date.now() - 432000000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-08-12',
        renewalProbability: 90,
      },
      {
        id: 'cust_006',
        name: 'Tech Solutions Inc',
        email: 'billing@techsolutions.com',
        plan: 'Growth',
        tier: 'growth',
        mrr: 1500,
        ltv: 27000,
        signupDate: '2024-04-22',
        status: 'active',
        locations: 3,
        callVolume: 820,
        satisfaction: 93,
        lastContact: new Date(Date.now() - 518400000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-04-22',
        renewalProbability: 87,
      },
      {
        id: 'cust_007',
        name: 'Green Valley Medical',
        email: 'office@greenvalleymed.com',
        plan: 'Professional',
        tier: 'professional',
        mrr: 900,
        ltv: 16200,
        signupDate: '2024-09-08',
        status: 'at_risk',
        locations: 1,
        callVolume: 420,
        satisfaction: 78,
        lastContact: new Date(Date.now() - 604800000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-09-08',
        renewalProbability: 65,
        riskFactors: ['Low usage', 'Support tickets', 'Payment delays'],
      },
      {
        id: 'cust_008',
        name: 'Downtown Fitness Center',
        email: 'admin@downtownfitness.com',
        plan: 'Starter',
        tier: 'starter',
        mrr: 500,
        ltv: 9000,
        signupDate: '2024-10-15',
        status: 'active',
        locations: 1,
        callVolume: 280,
        satisfaction: 91,
        lastContact: new Date(Date.now() - 691200000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-10-15',
        renewalProbability: 85,
      },
      {
        id: 'cust_009',
        name: 'Sunrise Real Estate',
        email: 'contact@sunrisere.com',
        plan: 'Professional',
        tier: 'professional',
        mrr: 1000,
        ltv: 18000,
        signupDate: '2024-06-30',
        status: 'active',
        locations: 2,
        callVolume: 620,
        satisfaction: 96,
        lastContact: new Date(Date.now() - 777600000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-06-30',
        renewalProbability: 93,
      },
      {
        id: 'cust_010',
        name: 'Pacific Legal Services',
        email: 'info@pacificlegal.com',
        plan: 'Growth',
        tier: 'growth',
        mrr: 1400,
        ltv: 25200,
        signupDate: '2024-05-18',
        status: 'active',
        locations: 3,
        callVolume: 780,
        satisfaction: 94,
        lastContact: new Date(Date.now() - 864000000).toISOString(),
        accountManager: 'AI Sales Agent',
        contractEnd: '2026-05-18',
        renewalProbability: 89,
      },
    ];

    // Apply filters
    let filteredCustomers = customers;
    
    if (status) {
      filteredCustomers = filteredCustomers.filter(c => c.status === status);
    }

    // Sort customers
    filteredCustomers.sort((a, b) => {
      if (sortBy === 'mrr') return b.mrr - a.mrr;
      if (sortBy === 'ltv') return b.ltv - a.ltv;
      if (sortBy === 'signupDate') return new Date(b.signupDate).getTime() - new Date(a.signupDate).getTime();
      return 0;
    });

    // Apply limit
    filteredCustomers = filteredCustomers.slice(0, limit);

    // Calculate summary stats
    const summary = {
      total: customers.length,
      active: customers.filter(c => c.status === 'active').length,
      at_risk: customers.filter(c => c.status === 'at_risk').length,
      churned: customers.filter(c => c.status === 'churned').length,
      totalMRR: customers.reduce((sum, c) => sum + c.mrr, 0),
      totalLTV: customers.reduce((sum, c) => sum + c.ltv, 0),
      avgSatisfaction: Math.round(customers.reduce((sum, c) => sum + c.satisfaction, 0) / customers.length),
      avgRenewalProbability: Math.round(customers.reduce((sum, c) => sum + c.renewalProbability, 0) / customers.length),
    };

    return NextResponse.json({ 
      customers: filteredCustomers,
      summary,
      total: filteredCustomers.length,
    });
  } catch (error) {
    console.error('Error fetching top customers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, action, notes } = body;

    // Perform action on customer (e.g., mark at risk, schedule call, etc.)
    console.log(`Performing action "${action}" on customer ${customerId}`);
    console.log('Notes:', notes);

    // In production, this would:
    // 1. Update customer record
    // 2. Create activity log
    // 3. Trigger notifications
    // 4. Update risk scores

    return NextResponse.json({ 
      success: true,
      message: `Action "${action}" completed successfully`
    });
  } catch (error) {
    console.error('Error performing customer action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
