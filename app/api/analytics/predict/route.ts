/**
 * Predictive Analytics API
 */

import { NextRequest, NextResponse } from 'next/server';
import { predictiveSystem } from '@/lib/analytics/predictive-system';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, customerId } = body;

    if (action === 'predict') {
      const { metric, timeframe, historicalDays } = body;
      const prediction = await predictiveSystem.predict({
        customerId,
        metric,
        timeframe,
        historicalDays,
      });
      return NextResponse.json({ success: true, data: prediction });
    }

    if (action === 'detect_anomaly') {
      const { metric, value } = body;
      const anomaly = await predictiveSystem.detectAnomalies(customerId, metric, value);
      return NextResponse.json({ success: true, data: anomaly });
    }

    if (action === 'recommendations') {
      const recommendations = await predictiveSystem.generateRecommendations(customerId);
      return NextResponse.json({ success: true, data: recommendations });
    }

    if (action === 'forecast_revenue') {
      const { months } = body;
      const forecast = await predictiveSystem.forecastRevenue(customerId, months);
      return NextResponse.json({ success: true, data: forecast });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
