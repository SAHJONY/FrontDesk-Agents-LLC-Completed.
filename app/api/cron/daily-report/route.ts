import { Resend } from 'resend';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // 1. Verify Security Protocol (Vercel Cron Secret)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized - Signature Mismatch', { status: 401 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, // Use Service Role for background aggregation
    { cookies: { getAll() { return cookieStore.getAll() } } }
  );

  // 2. Intelligence Gathering: Last 24 Hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  
  // Fetch Leads AND join with the Business Node (Client) info
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*, business_nodes(*), call_results(*)')
    .gte('created_at', oneDayAgo);

  if (error) {
    console.error('[MEDIC ERROR]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 3. Aggregate Data by Business (Node)
  const nodeReports = leads?.reduce((acc: any, lead: any) => {
    const nodeId = lead.business_id;
    if (!nodeId) return acc;
    
    if (!acc[nodeId]) {
      acc[nodeId] = {
        nodeName: lead.business_nodes?.name || 'Unknown Client',
        ownerEmail: lead.business_nodes?.owner_email,
        totalCalls: 0,
        hotLeads: 0,
        recentLeads: []
      };
    }
    
    acc[nodeId].totalCalls++;
    if (lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' || lead.status === 'booked') {
      acc[nodeId].hotLeads++;
    }
    if (acc[nodeId].recentLeads.length < 5) {
      acc[nodeId].recentLeads.push(lead);
    }
    return acc;
  }, {});

  // 4. Dispatch Individual Client ROI Reports & Build Master CEO Audit
  let globalTotalCalls = 0;
  let globalHotLeads = 0;

  for (const nodeId in nodeReports) {
    const report = nodeReports[nodeId];
    globalTotalCalls += report.totalCalls;
    globalHotLeads += report.hotLeads;

    const conversionRate = ((report.hotLeads / report.totalCalls) * 100).toFixed(1);
    const revenueGuarded = report.hotLeads * 250; // Sovereign Logic: $250 avg ticket

    // Send individual report to the Business Owner
    if (report.ownerEmail) {
      await resend.emails.send({
        from: 'FrontDesk AI <reports@frontdeskagents.com>',
        to: [report.ownerEmail],
        subject: `🛡️ Daily Revenue Report: ${report.nodeName}`,
        html: generateNeuralEmail(report.nodeName, report.totalCalls, conversionRate, revenueGuarded, report.recentLeads)
      });
    }
  }

  // 5. Final Dispatch: Global CEO Audit (Your View)
  const globalConversions = ((globalHotLeads / (globalTotalCalls || 1)) * 100).toFixed(1);
  
  await resend.emails.send({
    from: 'Sovereign OS <system@frontdeskagents.com>',
    to: [process.env.ADMIN_EMAIL as string],
    subject: `[SYSTEM AUDIT] ${new Date().toLocaleDateString()} - Global Neural Grid`,
    html: generateNeuralEmail('Global Fleet', globalTotalCalls, globalConversions, (globalHotLeads * 250), [])
  });

  return NextResponse.json({ success: true, processedNodes: Object.keys(nodeReports || {}).length });
}

// Helper function to maintain the High-Ticket "Sovereign" aesthetic
function generateNeuralEmail(targetName: string, total: number, rate: string, revenue: number, sampleLeads: any[]) {
  return `
    <div style="font-family: 'Inter', sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 20px;">
      <h1 style="color: #06b6d4; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Neural Audit: ${targetName}</h1>
      <p style="color: #64748b; font-size: 10px; margin-bottom: 30px;">SOVEREIGN OS v4.2.0 • PERFORMANCE PACKET</p>
      
      <div style="display: grid; gap: 20px; margin-bottom: 30px;">
        <div style="background: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #1e293b; margin-bottom: 10px;">
          <span style="color: #94a3b8; font-size: 10px; font-weight: bold; text-transform: uppercase;">Total Throughput</span>
          <h2 style="margin: 5px 0; font-size: 32px; color: #fff;">${total}</h2>
        </div>
        <div style="background: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #10b981; margin-bottom: 10px;">
          <span style="color: #10b981; font-size: 10px; font-weight: bold; text-transform: uppercase;">Revenue Guarded</span>
          <h2 style="margin: 5px 0; font-size: 32px; color: #10b981;">$${revenue}</h2>
        </div>
      </div>

      <h3 style="color: #fff; font-size: 14px; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">Operational Summary</h3>
      <ul style="list-style: none; padding: 0;">
        ${sampleLeads.map(l => `
          <li style="padding: 10px 0; border-bottom: 1px solid #0f172a; font-size: 13px;">
            <strong style="color: #cbd5e1;">${l.full_name}</strong> - <span style="color: #64748b;">${l.status}</span>
          </li>
        `).join('')}
      </ul>
      <p style="margin-top: 40px; font-size: 11px; color: #475569; text-align: center;">Secure communication from FrontDesk Agents.</p>
    </div>
  `;
}
