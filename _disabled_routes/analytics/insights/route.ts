import { NextResponse } from 'next/server';
import { analyticsEngine } from '@/lib/ai-agents/analytics';
import { Division } from '@/lib/ai-agents';

/**
 * GET /api/analytics/insights
 * Get AI-powered analytics and predictive insights
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'executive';
    const division = searchParams.get('division') as Division | null;

    let data: any;

    switch (type) {
      case 'executive':
        data = analyticsEngine.generateExecutiveDashboard();
        break;

      case 'division':
        if (!division) {
          return NextResponse.json(
            { error: 'Division parameter required for division analytics' },
            { status: 400 }
          );
        }
        data = analyticsEngine.generateDivisionAnalytics(division);
        break;

      case 'custom':
        const divisions = searchParams.get('divisions')?.split(',') as Division[] | undefined;
        const timeframe = searchParams.get('timeframe') || undefined;
        const metrics = searchParams.get('metrics')?.split(',') || undefined;

        data = analyticsEngine.generateCustomReport({
          divisions,
          timeframe,
          metrics,
        });
        break;

      default:
        return NextResponse.json({ error: `Unknown analytics type: ${type}` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      type,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate analytics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics/insights
 * Request custom analytics report
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { divisions, timeframe, metrics, format } = body;

    const report = analyticsEngine.generateCustomReport({
      divisions,
      timeframe,
      metrics,
    });

    // If PDF format requested, generate PDF (future enhancement)
    if (format === 'pdf') {
      return NextResponse.json(
        { error: 'PDF export not yet implemented' },
        { status: 501 }
      );
    }

    return NextResponse.json({
      success: true,
      report,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating custom report:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate report',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
