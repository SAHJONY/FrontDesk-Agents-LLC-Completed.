/**
 * Monitoring & Observability API
 */

import { NextRequest, NextResponse } from 'next/server';
import { observabilitySystem } from '@/lib/monitoring/observability';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'status') {
      const status = await observabilitySystem.getSystemStatus();
      return NextResponse.json({ success: true, data: status });
    }

    if (action === 'metrics') {
      const timeRange = searchParams.get('timeRange') || '1h';
      const metrics = await observabilitySystem.getPerformanceMetrics(timeRange);
      return NextResponse.json({ success: true, data: metrics });
    }

    if (action === 'alerts') {
      const severity = searchParams.get('severity') || undefined;
      const acknowledged = searchParams.get('acknowledged') === 'true';
      const alerts = await observabilitySystem.getAlerts({ severity, acknowledged });
      return NextResponse.json({ success: true, data: alerts });
    }

    if (action === 'health') {
      const services = observabilitySystem.getServiceHealth();
      return NextResponse.json({ success: true, data: services });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'acknowledge_alert') {
      const { alertId } = body;
      await observabilitySystem.acknowledgeAlert(alertId);
      return NextResponse.json({ success: true });
    }

    if (action === 'resolve_alert') {
      const { alertId } = body;
      await observabilitySystem.resolveAlert(alertId);
      return NextResponse.json({ success: true });
    }

    if (action === 'update_threshold') {
      const { metric, threshold } = body;
      observabilitySystem.updateThreshold(metric, threshold);
      return NextResponse.json({ success: true });
    }

    if (action === 'export_metrics') {
      const { startDate, endDate } = body;
      const metrics = await observabilitySystem.exportMetrics(
        new Date(startDate),
        new Date(endDate)
      );
      return NextResponse.json({ success: true, data: metrics });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
