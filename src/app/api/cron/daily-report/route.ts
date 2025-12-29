import { NextResponse } from 'next/server';
// FIXED: Using relative paths to resolve Portland (pdx1) webpack errors
import { getDailyStats } from '../../../../services/stats';
import { sendEmailReport } from '../../../../services/notifications';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Security check for Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 1. Fetch data for all active Global Nodes
    const stats = await getDailyStats();

    // 2. Process tiers ($199, $399, $799, $1,499)
    // The report will highlight "Unlimited" usage for Elite tier customers
    for (const customer of stats) {
      const isElite = customer.tier === 'Elite';
      const reportData = {
        date: new Date().toLocaleDateString(),
        revenue: customer.dailyRevenue,
        appointments: customer.appointmentsBooked,
        minutesUsed: isElite ? 'Unlimited (Elite Tier)' : `${customer.minutesUsed} / ${customer.minuteLimit}`,
        roi: ((customer.dailyRevenue / (customer.monthlyPrice / 30)) * 100).toFixed(2)
      };

      // 3. Dispatch the Daily Sales Report
      await sendEmailReport(customer.email, reportData);
    }

    return NextResponse.json({ 
      success: true, 
      processed: stats.length,
      timestamp: new Date().toISOString() 
    });
    
  } catch (error) {
    console.error('Cron Job Failed:', error);
    return NextResponse.json({ success: false, error: 'Report Generation Failed' }, { status: 500 });
  }
}
