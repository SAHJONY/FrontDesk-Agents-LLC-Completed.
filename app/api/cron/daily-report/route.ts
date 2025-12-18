import { createServerClient } from '@supabase/ssr'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: Request) {
  // 1. Security Check: Only Vercel Cron or authorized users can trigger this
  const authHeader = req.headers.get('Authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  // 2. Initialize Supabase with Service Role (Bypasses RLS to gather all logs)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [] } }
  )

  // 3. Fetch logs from the last 24 hours
  const yesterday = new Date()
  yesterday.setHours(yesterday.getHours() - 24)
  
  const { data: logs, error } = await supabase
    .from('call_logs')
    .select('*')
    .gte('created_at', yesterday.toISOString())

  if (error) {
    console.error('Database Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!logs || logs.length === 0) {
    return NextResponse.json({ message: 'No calls recorded in the last 24h' })
  }

  // 4. Aggregate Data for the Report
  const count = logs.length
  const totalDurationSeconds = logs.reduce((acc, log) => acc + (log.duration || 0), 0)
  const totalDurationMinutes = Math.round(totalDurationSeconds / 60)
  const hoursSaved = ((count * 6) / 60).toFixed(1) // Assuming 6 mins saved per call (handling + notes)

  // 5. Build the Email HTML
  // In a real scenario, you'd loop through unique clients, but for now, we'll send to your admin
  const { data, error: emailError } = await resend.emails.send({
    from: 'Alex | FrontDesk Agents <reports@frontdeskagents.com>',
    to: process.env.ADMIN_EMAIL!, // Set this in your Vercel Env Vars
    subject: `📊 Daily Receptionist Report - ${new Date().toLocaleDateString()}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px;">
        <h2 style="color: #1e293b; text-transform: uppercase; font-style: italic;">FrontDesk Agents Report</h2>
        <p style="color: #64748b;">Your AI Agent <strong>Alex</strong> successfully managed the front desk today.</p>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; font-size: 14px; color: #475569;">AT A GLANCE</h3>
          <ul style="list-style: none; padding: 0;">
            <li>📞 <strong>Calls Handled:</strong> ${count}</li>
            <li>⏱️ <strong>Talk Time:</strong> ${totalDurationMinutes} mins</li>
            <li>✨ <strong>Labor Saved:</strong> ${hoursSaved} hours</li>
          </ul>
        </div>

        <h3 style="font-size: 14px; color: #475569;">LATEST SUMMARIES</h3>
        ${logs.slice(0, 5).map(log => `
          <div style="margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
            <p style="margin: 0; font-size: 13px; color: #1e293b;"><strong>Caller:</strong> ${log.phone_number}</p>
            <p style="margin: 5px 0 0; font-size: 13px; color: #64748b;">${log.summary || 'No summary available.'}</p>
          </div>
        `).join('')}

        <p style="font-size: 11px; color: #94a3b8; margin-top: 30px;">
          Access your full dashboard at ${process.env.NEXT_PUBLIC_SITE_URL}/admin/waitlist
        </p>
      </div>
    `
  })

  if (emailError) {
    return NextResponse.json({ error: emailError }, { status: 500 })
  }

  return NextResponse.json({ success: true, emailId: data?.id })
}
