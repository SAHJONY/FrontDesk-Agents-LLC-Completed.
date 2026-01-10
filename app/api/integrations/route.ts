/**
 * Integration Hub API
 * Connect to 100+ external services
 */

import { NextRequest, NextResponse } from 'next/server';
import { integrationHub } from '@/lib/integrations/integration-hub';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const action = searchParams.get('action');

    if (action === 'providers') {
      const providers = integrationHub.getAvailableProviders();
      return NextResponse.json({ success: true, data: providers });
    }

    if (action === 'list' && customerId) {
      const integrations = await integrationHub.getIntegrations(customerId);
      return NextResponse.json({ success: true, data: integrations });
    }

    return NextResponse.json({ error: 'Invalid action or missing parameters' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, customerId } = body;

    if (action === 'connect') {
      const { provider, credentials } = body;
      const integration = await integrationHub.connect(customerId, provider, credentials);
      return NextResponse.json({ success: true, data: integration });
    }

    if (action === 'disconnect') {
      const { integrationId } = body;
      await integrationHub.disconnect(integrationId);
      return NextResponse.json({ success: true });
    }

    if (action === 'execute') {
      const { integrationId, actionName, params } = body;
      const result = await integrationHub.executeAction(integrationId, actionName, params);
      return NextResponse.json({ success: true, data: result });
    }

    if (action === 'sync') {
      const { integrationId } = body;
      await integrationHub.syncIntegration(integrationId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
