import { NextResponse } from 'next/server';
import {
  initializeAIWorkforce,
  getWorkforceStatus,
  processIncomingEmail,
  executeSalesWorkflow,
  supremeCommander,
  Division,
  MissionPriority,
} from '@/lib/ai-agents';

/**
 * GET /api/ai/workforce
 * Get AI workforce status
 */
export async function GET(request: Request) {
  try {
    const status = getWorkforceStatus();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      workforce: status,
    });
  } catch (error) {
    console.error('Error getting workforce status:', error);
    return NextResponse.json(
      { error: 'Failed to get workforce status' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ai/workforce
 * Execute AI workforce operations
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'initialize':
        const initResult = await initializeAIWorkforce();
        return NextResponse.json({
          success: true,
          message: 'AI Workforce initialized',
          result: initResult,
        });

      case 'process_email':
        if (!data.from || !data.subject || !data.body) {
          return NextResponse.json(
            { error: 'Missing required fields: from, subject, body' },
            { status: 400 }
          );
        }
        const emailResult = await processIncomingEmail(data);
        return NextResponse.json({
          success: true,
          result: emailResult,
        });

      case 'execute_sales_workflow':
        if (!data.company || !data.contact) {
          return NextResponse.json(
            { error: 'Missing required fields: company, contact' },
            { status: 400 }
          );
        }
        const salesResult = await executeSalesWorkflow(data);
        return NextResponse.json({
          success: true,
          result: salesResult,
        });

      case 'create_mission':
        if (!data.division || !data.type) {
          return NextResponse.json(
            { error: 'Missing required fields: division, type' },
            { status: 400 }
          );
        }
        const mission = await supremeCommander.createMission(
          data.division as Division,
          data.type,
          data.missionData || {},
          data.priority || MissionPriority.MEDIUM
        );
        return NextResponse.json({
          success: true,
          mission: {
            id: mission.id,
            division: mission.division,
            type: mission.type,
            status: mission.status,
            priority: mission.priority,
          },
        });

      case 'get_mission':
        if (!data.missionId) {
          return NextResponse.json(
            { error: 'Missing required field: missionId' },
            { status: 400 }
          );
        }
        const missionData = supremeCommander.getMission(data.missionId);
        if (!missionData) {
          return NextResponse.json(
            { error: 'Mission not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({
          success: true,
          mission: missionData,
        });

      case 'get_division_performance':
        if (!data.division) {
          return NextResponse.json(
            { error: 'Missing required field: division' },
            { status: 400 }
          );
        }
        const performance = supremeCommander.getDivisionPerformance(
          data.division as Division
        );
        return NextResponse.json({
          success: true,
          performance,
        });

      case 'get_system_status':
        const systemStatus = supremeCommander.getSystemStatus();
        return NextResponse.json({
          success: true,
          status: systemStatus,
        });

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in AI workforce operation:', error);
    return NextResponse.json(
      {
        error: 'Failed to execute operation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
