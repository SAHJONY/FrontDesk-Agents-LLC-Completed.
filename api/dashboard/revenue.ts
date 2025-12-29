// FrontDesk Agents: Global Revenue Workforce
// API Route: Dashboard Revenue Data
// Path: /api/dashboard/revenue

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth/jwt-verify';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyJWT(token);
    const tenantId = req.query.tenant_id as string || decoded.tenant_id;
    const days = parseInt(req.query.days as string) || 30;

    if (tenantId !== decoded.tenant_id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: revenueEvents, error } = await supabase
      .from('revenue_events')
      .select('recovered_amount, success_fee_amount, recorded_at')
      .eq('tenant_id', tenantId)
      .gte('recorded_at', startDate.toISOString())
      .order('recorded_at', { ascending: true });

    if (error) {
      throw error;
    }

    // Group by date
    const revenueByDate: Record<string, { revenue: number; successFees: number }> = {};

    revenueEvents.forEach((event) => {
      const date = new Date(event.recorded_at).toISOString().split('T')[0];
      if (!revenueByDate[date]) {
        revenueByDate[date] = { revenue: 0, successFees: 0 };
      }
      revenueByDate[date].revenue += event.recovered_amount;
      revenueByDate[date].successFees += event.success_fee_amount;
    });

    const data = Object.entries(revenueByDate).map(([date, values]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.round(values.revenue),
      successFees: Math.round(values.successFees),
    }));

    const total = revenueEvents.reduce((sum, event) => sum + event.recovered_amount, 0);

    return res.status(200).json({
      data,
      total: Math.round(total),
    });
  } catch (error: any) {
    console.error('Revenue fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
}
