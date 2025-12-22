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
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() } } }
  );

  // 2. Intelligence Gathering: Last 24 Hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*, call_results(*)')
    .gte('created_at', oneDayAgo);

  if (error) {
    console.error('[MEDIC ERROR]', error.message);
    return NextResponse.json({ error: error.message });
  }

  // Calculate Performance Metrics
  const totalCalls = leads?.length || 0;
  const hotLeads = leads?.filter(l => l.call_results?.[0]?.sentiment_score === 'Hot 🔥').length || 0;
  const conversions = ((hotLeads / (totalCalls || 1)) * 100).toFixed(1);

  // 3. Dispatch the High-Ticket ROI Report
  const { data: mailData, error: mailError } = await resend.emails.send({
    from: 'FrontDesk AI CEO <reports@frontdeskagents.com>',
    to: [process.env.ADMIN_EMAIL as string],
    subject: `[SYSTEM AUDIT] ${new Date().toLocaleDateString()} - Neural Grid Performance`,
    html: `
      <div style="font-family: 'Inter', sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 20px;">
        <h1 style="color: #06b6d4; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Daily Neural Audit</h1>
        <p style="color: #64748b; font-size: 12px; margin-bottom: 30px;">SOVEREIGN OS v4.2.0 • PORTLAND CORE</p>
        
        <div style="display: grid; gap: 20px; margin-bottom: 30px;">
          <div style="background: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #1e293b;">
            <span style="color: #94a3b8; font-size: 10px; font-weight: bold; text-transform: uppercase;">Total Throughput</span>
            <h2 style="margin: 5px 0; font-size: 32px; color: #fff;">${totalCalls} <span style="font-size: 14px; color: #475569;">Entities Handled</span></h2>
          </div>
          
          <div style="background: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #1e293b;">
            <span style="color: #10b981; font-size: 10px; font-weight: bold; text-transform: uppercase;">Efficiency Rating</span>
            <h2 style="margin: 5px 0; font-size: 32px; color: #10b981;">${conversions}% <span style="font-size: 14px; color: #475569;">Conversion</span></h2>
          </div>
        </div>

        <h3 style="color: #fff; font-size: 14px; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">Operational Summary</h3>
        <ul style="list-style: none; padding: 0;">
          ${leads?.slice(0, 5).map(l => `
            <li style="padding: 15px 0; border-bottom: 1px solid #0f172a; font-size: 13px;">
              <strong style="color: #cbd5e1;">${l.full_name}</strong> - 
              <span style="color: #64748b;">${l.call_results?.[0]?.status || 'Processed'}</span>
            </li>
          `).join('')}
        </ul>

        <p style="margin-top: 40px; font-size: 11px; color: #475569; text-align: center;">
          This audit was conducted by the <strong>Medic Agent</strong>. Log into the Command Center for full packet inspection.
        </p>
      </div>
    `
  });

  if (mailError) return NextResponse.json({ error: mailError });

  return NextResponse.json({ 
    success: true, 
    metrics: { totalCalls, hotLeads, conversions } 
  });
}
