import { createServerClient } from '@supabase/ssr'
import { Resend } from 'resend' // Recommended for Next.js

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: Request) {
  // Only allow authorized cron triggers (check for a secret header)
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [] } }
  )

  // 1. Fetch calls from today
  const today = new Date().toISOString().split('T')[0]
  const { data: logs } = await supabase
    .from('call_logs')
    .select('*')
    .gte('created_at', today)

  if (!logs || logs.length === 0) return Response.json({ message: 'No calls today' })

  // 2. Aggregate Data
  const count = logs.length
  const totalDuration = logs.reduce((acc, log) => acc + (log.duration || 0), 0)
  const hoursSaved = ((count * 5) / 60).toFixed(1) // Assuming 5 mins saved per call

  // 3. Send the Email
  await resend.emails.send({
    from: 'Alex <reports@frontdeskagents.com>',
    to: 'client@business.com',
    subject: `📊 Daily Receptionist Report - ${today}`,
    html: `
      <h1>Daily Summary</h1>
      <p>Your AI Agent <strong>Alex</strong> was busy today!</p>
      <ul>
        <li>Calls Handled: ${count}</li>
        <li>Time Saved: ${hoursSaved} hours</li>
      </ul>
      <h3>Top Transcripts</h3>
      ${logs.slice(0, 3).map(log => `<p><strong>${log.phone_number}:</strong> ${log.summary}</p>`).join('')}
    `
  })

  return Response.json({ success: true })
}
