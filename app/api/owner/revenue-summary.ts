import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface Closing {
  status: string;
  assignment_fee: string | number;
}

interface RevenueSummary {
  paid: number;
  pending: number;
}

export async function GET(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: closings, error } = await supabase
      .from('closings')
      .select('status, assignment_fee');

    if (error) throw error;

    const summary: RevenueSummary = (closings as Closing[]).reduce(
      (acc: RevenueSummary, curr: Closing) => {
        if (curr.status === 'FUNDED') {
          acc.paid += Number(curr.assignment_fee);
        }
        if (curr.status === 'PENDING') {
          acc.pending += Number(curr.assignment_fee);
        }
        return acc;
      },
      { paid: 0, pending: 0 }
    );

    return NextResponse.json({
      success: true,
      data: {
        totalPaid: summary.paid,
        totalPending: summary.pending,
        totalRevenue: summary.paid + summary.pending,
      },
    });
  } catch (error) {
    console.error('Revenue summary error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch revenue summary',
      },
      { status: 500 }
    );
  }
}
