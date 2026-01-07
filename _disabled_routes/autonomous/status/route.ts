import { NextResponse } from 'next/server';
import { orchestrator } from '@/lib/autonomous/orchestrator';
import { selfHealing } from '@/lib/autonomous/self-healing';

/**
 * Get autonomous system status
 */
export async function GET(request: Request) {
  try {
    const orchestratorStatus = orchestrator.getStatus();
    const healthStatus = selfHealing.getHealthStatus();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      orchestrator: orchestratorStatus,
      health: healthStatus,
      summary: {
        isOperational: orchestratorStatus.isRunning && healthStatus.overall !== 'critical',
        totalAgents: orchestratorStatus.totalAgents,
        activeAgents: orchestratorStatus.activeAgents,
        systemHealth: healthStatus.overall,
        unresolvedIncidents: healthStatus.unresolvedIncidents
      }
    });
  } catch (error) {
    console.error('Error getting autonomous status:', error);
    return NextResponse.json(
      { error: 'Failed to get system status' },
      { status: 500 }
    );
  }
}

/**
 * Start autonomous system
 */
export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === 'start') {
      await orchestrator.start();
      selfHealing.start();
      
      return NextResponse.json({
        success: true,
        message: 'Autonomous system started successfully'
      });
    }

    if (action === 'stop') {
      orchestrator.stop();
      selfHealing.stop();
      
      return NextResponse.json({
        success: true,
        message: 'Autonomous system stopped'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error controlling autonomous system:', error);
    return NextResponse.json(
      { error: 'Failed to control system' },
      { status: 500 }
    );
  }
}
