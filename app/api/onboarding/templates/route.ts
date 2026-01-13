/**
 * Template Deployment API
 */

import { NextRequest, NextResponse } from 'next/server';
import { templateDeploymentSystem } from '@/lib/onboarding/template-deployment';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'list') {
      const templates = templateDeploymentSystem.getAvailableTemplates();
      return NextResponse.json({ success: true, data: templates });
    }

    if (action === 'popular') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 5;
      const templates = templateDeploymentSystem.getPopularTemplates(limit);
      return NextResponse.json({ success: true, data: templates });
    }

    if (action === 'by_industry') {
      const industry = searchParams.get('industry');
      if (!industry) {
        return NextResponse.json({ error: 'Missing industry parameter' }, { status: 400 });
      }
      const templates = templateDeploymentSystem.getTemplatesByIndustry(industry);
      return NextResponse.json({ success: true, data: templates });
    }

    if (action === 'get') {
      const templateId = searchParams.get('templateId');
      if (!templateId) {
        return NextResponse.json({ error: 'Missing templateId parameter' }, { status: 400 });
      }
      const template = templateDeploymentSystem.getTemplate(templateId);
      if (!template) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: template });
    }

    if (action === 'deployment_status') {
      const deploymentId = searchParams.get('deploymentId');
      if (!deploymentId) {
        return NextResponse.json({ error: 'Missing deploymentId parameter' }, { status: 400 });
      }
      const status = await templateDeploymentSystem.getDeploymentStatus(deploymentId);
      return NextResponse.json({ success: true, data: status });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Template API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'deploy') {
      const { customerId, templateId, customization } = body;

      if (!customerId || !templateId) {
        return NextResponse.json(
          { error: 'Missing required parameters: customerId, templateId' },
          { status: 400 }
        );
      }

      const result = await templateDeploymentSystem.deployTemplate({
        customerId,
        templateId,
        customization,
      });

      return NextResponse.json({ success: true, data: result });
    }

    if (action === 'quick_deploy') {
      const { customerId, industry, businessName } = body;

      if (!customerId || !industry || !businessName) {
        return NextResponse.json(
          { error: 'Missing required parameters: customerId, industry, businessName' },
          { status: 400 }
        );
      }

      const result = await templateDeploymentSystem.quickDeploy(customerId, industry, businessName);

      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Template deployment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
