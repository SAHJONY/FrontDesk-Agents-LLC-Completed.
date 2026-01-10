/**
 * Auto-Scaling Infrastructure API
 */

import { NextRequest, NextResponse } from 'next/server';
import { autoScalingSystem } from '@/lib/infrastructure/auto-scaling';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'status') {
      const status = autoScalingSystem.getStatus();
      return NextResponse.json({ success: true, data: status });
    }

    if (action === 'instances') {
      const instances = autoScalingSystem.getInstances();
      return NextResponse.json({ success: true, data: instances });
    }

    if (action === 'history') {
      const startDate = searchParams.get('startDate');
      const endDate = searchParams.get('endDate');
      
      if (!startDate || !endDate) {
        return NextResponse.json({ error: 'Missing date parameters' }, { status: 400 });
      }

      const history = await autoScalingSystem.getScalingHistory(
        new Date(startDate),
        new Date(endDate)
      );
      return NextResponse.json({ success: true, data: history });
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

    if (action === 'manual_scale') {
      const { direction, count } = body;
      await autoScalingSystem.manualScale(direction, count);
      return NextResponse.json({ success: true });
    }

    if (action === 'update_config') {
      const { config } = body;
      autoScalingSystem.updateConfig(config);
      return NextResponse.json({ success: true });
    }

    if (action === 'update_load_balancer') {
      const { config } = body;
      autoScalingSystem.updateLoadBalancerConfig(config);
      return NextResponse.json({ success: true });
    }

    if (action === 'route_request') {
      const instance = await autoScalingSystem.routeRequest();
      return NextResponse.json({ success: true, data: instance });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
