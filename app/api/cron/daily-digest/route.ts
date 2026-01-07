import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Owner email for daily digests
const OWNER_EMAIL = 'frontdeskllc@outlook.com';
const OWNER_NAME = 'Juan Gonzalez';

export async function GET(request: Request) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Calculate date range (last 24 hours)
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Mock data - Replace with actual database queries
    const stats = {
      totalRevenue: 12450,
      newCustomers: 8,
      activeAgents: 12,
      totalCalls: 247,
      avgConversionRate: 42.5,
      tierBreakdown: {
        basic: { count: 2, revenue: 398 },
        professional: { count: 3, revenue: 1197 },
        growth: { count: 2, revenue: 1598 },
        elite: { count: 1, revenue: 1499 }
      },
      topPerformingAgents: [
        { name: 'Maria Rodriguez', calls: 89, conversions: 61, revenue: 4850 },
        { name: 'Alex Chen', calls: 72, conversions: 30, revenue: 3200 },
        { name: 'Sarah Williams', calls: 56, conversions: 28, revenue: 2400 }
      ],
      alerts: [
        'Growth tier agent "Maria Rodriguez" achieved 68% conversion rate (target: 40%)',
        'Basic tier customer "Acme Corp" approaching call limit (92/100 calls used)'
      ]
    };

    // Generate HTML email
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Revenue Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 3px solid #06b6d4;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      margin: 0;
      color: #0f172a;
      font-size: 24px;
    }
    .date {
      color: #64748b;
      font-size: 14px;
      margin-top: 5px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: #f8fafc;
      border-radius: 6px;
      padding: 15px;
      border-left: 3px solid #06b6d4;
    }
    .stat-label {
      font-size: 12px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: #0f172a;
    }
    .stat-change {
      font-size: 12px;
      color: #10b981;
      margin-top: 5px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
    }
    .tier-row {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background: #f8fafc;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .agent-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: #f8fafc;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .agent-name {
      font-weight: 600;
      color: #0f172a;
    }
    .agent-stats {
      font-size: 14px;
      color: #64748b;
    }
    .alert {
      background: #fef3c7;
      border-left: 3px solid #f59e0b;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 8px;
      font-size: 14px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }
    .cta-button {
      display: inline-block;
      background: #06b6d4;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎖️ Daily Revenue Report</h1>
      <div class="date">${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Revenue</div>
        <div class="stat-value">$${stats.totalRevenue.toLocaleString()}</div>
        <div class="stat-change">+18% vs yesterday</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">New Customers</div>
        <div class="stat-value">${stats.newCustomers}</div>
        <div class="stat-change">+3 vs yesterday</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Active Agents</div>
        <div class="stat-value">${stats.activeAgents}</div>
        <div class="stat-change">All systems operational</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Calls</div>
        <div class="stat-value">${stats.totalCalls}</div>
        <div class="stat-change">+24% vs yesterday</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Tier Performance</div>
      ${Object.entries(stats.tierBreakdown).map(([tier, data]) => `
        <div class="tier-row">
          <span><strong>${tier.charAt(0).toUpperCase() + tier.slice(1)}</strong> (${data.count} customers)</span>
          <span><strong>$${data.revenue}</strong></span>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section-title">Top Performing Agents</div>
      ${stats.topPerformingAgents.map(agent => `
        <div class="agent-row">
          <div>
            <div class="agent-name">${agent.name}</div>
            <div class="agent-stats">${agent.calls} calls • ${agent.conversions} conversions • ${Math.round((agent.conversions / agent.calls) * 100)}% rate</div>
          </div>
          <div><strong>$${agent.revenue.toLocaleString()}</strong></div>
        </div>
      `).join('')}
    </div>

    ${stats.alerts.length > 0 ? `
      <div class="section">
        <div class="section-title">⚠️ Alerts & Opportunities</div>
        ${stats.alerts.map(alert => `<div class="alert">${alert}</div>`).join('')}
      </div>
    ` : ''}

    <div style="text-align: center;">
      <a href="https://front-desk-agents-llc-completed.vercel.app/dashboard" class="cta-button">
        View Full Dashboard
      </a>
    </div>

    <div class="footer">
      <p><strong>FrontDesk Agents</strong> - AI-Powered Revenue Workforce</p>
      <p>This is an automated daily digest. You're receiving this because you're the platform owner.</p>
      <p>Questions? Reply to this email or call +1 (678) 346-6284</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email
    const result = await resend.emails.send({
      from: 'Workforce Intelligence <intelligence@frontdeskagents.com>',
      to: OWNER_EMAIL,
      subject: `Daily Revenue Report - $${stats.totalRevenue.toLocaleString()} | ${now.toLocaleDateString()}`,
      html: emailHtml
    });

    return NextResponse.json({
      success: true,
      emailId: result.data?.id,
      stats: {
        revenue: stats.totalRevenue,
        customers: stats.newCustomers,
        agents: stats.activeAgents,
        calls: stats.totalCalls
      }
    });

  } catch (error) {
    console.error('Daily digest error:', error);
    return NextResponse.json(
      { error: 'Failed to send daily digest', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Allow manual trigger for testing
export async function POST(request: Request) {
  return GET(request);
}
