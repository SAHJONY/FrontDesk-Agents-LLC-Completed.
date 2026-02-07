import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from "@/lib/supabase";
import { Resend } from 'resend';

const resend = (process.env.RESEND_API_KEY) ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * EXECUTIVE REPORTING ORCHESTRATOR
 * Compiles weekly telemetry and dispatches automated PDF/HTML manifests.
 */
export async function GET(req: Request) {
  // Security handshake for Cron triggers
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized Infrastructure Access', { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  try {
    // 1. Fetch Global Tenant List for Reporting
    const { data: tenants } = await supabase
      .from('tenants')
      .select('id, owner_email, tier_label, stripe_customer_id')
      .eq('status', 'active');

    if (!tenants) return NextResponse.json({ processed: 0 });

    const reportResults = await Promise.all(
      tenants.map(async (tenant: any) => {
        // 2. Aggregate weekly KPIs for this specific tenant
        const { data: stats } = await supabase.rpc('get_weekly_tenant_stats', {
          t_id: tenant.id
        });

        if (!resend) {
          console.warn("Resend API key missing, skipping email dispatch.");
          return { success: false, message: "Resend missing" };
        }

        // 3. Dispatch Professional Executive Summary
        return resend.emails.send({
          from: 'FrontDesk Intelligence <reports@frontdesk-agents.com>',
          to: tenant.owner_email,
          subject: `[PRO] Weekly Operations Manifest: ${new Date().toLocaleDateString()}`,
          html: `
            <div style="font-family: sans-serif; background: #000; color: #fff; padding: 40px; border-radius: 20px;">
              <h1 style="text-transform: uppercase; font-style: italic; letter-spacing: -1px;">Operations Report</h1>
              <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">Node: ${tenant.tier_label}</p>
              <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
              <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 20px;">
                <div>
                  <p style="color: #444; font-size: 10px; font-weight: bold; text-transform: uppercase;">Calls Processed</p>
                  <h2 style="margin: 0;">${stats?.total_calls || 0}</h2>
                </div>
                <div>
                  <p style="color: #444; font-size: 10px; font-weight: bold; text-transform: uppercase;">Revenue Influenced</p>
                  <h2 style="margin: 0; color: #00ffcc;">$${stats?.revenue || 0}</h2>
                </div>
              </div>
              <p style="margin-top: 30px; font-size: 12px; color: #888;">
                Log in to your Control Node for granular session replays and neural logs.
              </p>
            </div>
          `
        });
      })
    );

    return NextResponse.json({ 
      status: 'Reports Dispatched', 
      count: reportResults.length 
    });
  } catch (error: any) {
    console.error('❌ [REPORTING_CRITICAL_FAILURE]:', error.message);
    return NextResponse.json({ error: 'Reporting pipeline interrupted' }, { status: 500 });
  }
}
