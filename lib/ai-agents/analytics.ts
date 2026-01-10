/**
 * Advanced Analytics & Reporting System
 * Provides deep insights into AI workforce performance
 */

import { supremeCommander, Division } from './supreme-commander';
import { emailOperationsDivision } from './divisions/email-operations';
import { customerAcquisitionDivision } from './divisions/customer-acquisition';
import { selfHealingSystem } from './self-healing';

export interface PerformanceMetrics {
  timeframe: string;
  totalMissions: number;
  successRate: number;
  avgResponseTime: number;
  throughput: number;
  efficiency: number;
}

export interface DivisionAnalytics {
  division: Division;
  performance: PerformanceMetrics;
  topAgents: string[];
  bottlenecks: string[];
  recommendations: string[];
}

export interface PredictiveInsight {
  type: 'trend' | 'anomaly' | 'forecast' | 'recommendation';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  suggestedActions?: string[];
}

export class AnalyticsEngine {
  /**
   * Generate executive dashboard
   */
  generateExecutiveDashboard(): any {
    const systemStatus = supremeCommander.getSystemStatus();
    const emailStats = emailOperationsDivision.getStats();
    const salesStats = customerAcquisitionDivision.getStats();
    const healthStatus = selfHealingSystem.getHealthStatus();
    const healingMetrics = selfHealingSystem.getMetrics();

    return {
      timestamp: new Date().toISOString(),
      
      // High-level KPIs
      kpis: {
        systemUptime: this.formatUptime(systemStatus.uptime),
        totalMissions: systemStatus.totalMissions,
        successRate: this.calculateSuccessRate(systemStatus),
        autonomyLevel: this.calculateAutonomyLevel(emailStats, salesStats),
        systemHealth: healthStatus.overall,
      },

      // Division performance
      divisions: systemStatus.divisions.map((div) => ({
        name: div.division,
        status: 'OPERATIONAL',
        efficiency: `${div.efficiency}%`,
        successRate: `${div.successRate.toFixed(2)}%`,
        missionsCompleted: div.missionsCompleted,
        trend: this.calculateTrend(div),
      })),

      // Email operations insights
      emailOperations: {
        totalProcessed: emailStats.totalProcessed,
        classificationAccuracy: `${(emailStats.averageConfidence * 100).toFixed(2)}%`,
        autonomousResolutions: emailStats.autonomousResolutions,
        autonomyRate: `${emailStats.autonomyRate.toFixed(2)}%`,
      },

      // Sales performance
      salesPerformance: {
        totalLeads: salesStats.totalLeads,
        qualifiedLeads: salesStats.qualifiedLeads,
        hotLeads: salesStats.hotLeads,
        qualificationRate: `${salesStats.qualificationRate.toFixed(2)}%`,
        conversionRate: `${salesStats.conversionRate.toFixed(2)}%`,
      },

      // System health
      systemHealth: {
        overall: healthStatus.overall,
        componentsHealthy: healthStatus.components.filter((c) => c.status === 'healthy').length,
        totalComponents: healthStatus.components.length,
        unresolvedIncidents: healthStatus.unresolvedIncidents,
        autoResolutionRate: `${healingMetrics.autoResolutionRate.toFixed(2)}%`,
      },

      // Predictive insights
      insights: this.generatePredictiveInsights(systemStatus, emailStats, salesStats),
    };
  }

  /**
   * Generate detailed division analytics
   */
  generateDivisionAnalytics(division: Division): DivisionAnalytics {
    const performance = supremeCommander.getDivisionPerformance(division);

    if (!performance) {
      throw new Error(`Division not found: ${division}`);
    }

    return {
      division,
      performance: {
        timeframe: 'Last 24 hours',
        totalMissions: performance.missionsCompleted + performance.missionsFailed,
        successRate: performance.successRate,
        avgResponseTime: performance.averageResponseTime,
        throughput: performance.missionsCompleted,
        efficiency: performance.efficiency,
      },
      topAgents: this.identifyTopAgents(division),
      bottlenecks: this.identifyBottlenecks(performance),
      recommendations: this.generateRecommendations(performance),
    };
  }

  /**
   * Generate predictive insights using AI
   */
  private generatePredictiveInsights(
    systemStatus: any,
    emailStats: any,
    salesStats: any
  ): PredictiveInsight[] {
    const insights: PredictiveInsight[] = [];

    // Trend analysis
    if (systemStatus.completedMissions > 100) {
      insights.push({
        type: 'trend',
        severity: 'info',
        title: 'High Mission Volume Detected',
        description: `System has processed ${systemStatus.completedMissions} missions. Performance is stable.`,
        confidence: 0.95,
        actionable: false,
      });
    }

    // Email operations insights
    if (emailStats.autonomyRate > 80) {
      insights.push({
        type: 'trend',
        severity: 'info',
        title: 'Excellent Email Autonomy',
        description: `${emailStats.autonomyRate.toFixed(2)}% of emails are being handled autonomously without human intervention.`,
        confidence: 0.98,
        actionable: false,
      });
    } else if (emailStats.autonomyRate < 50) {
      insights.push({
        type: 'recommendation',
        severity: 'warning',
        title: 'Low Email Autonomy Rate',
        description: `Only ${emailStats.autonomyRate.toFixed(2)}% of emails are handled autonomously. Consider improving AI training.`,
        confidence: 0.85,
        actionable: true,
        suggestedActions: [
          'Review and update email response templates',
          'Analyze failed autonomous resolutions',
          'Retrain sentiment analysis model',
        ],
      });
    }

    // Sales insights
    if (salesStats.hotLeads > 10) {
      insights.push({
        type: 'recommendation',
        severity: 'warning',
        title: 'High Volume of Hot Leads',
        description: `${salesStats.hotLeads} hot leads require immediate attention. Consider scaling sales team.`,
        confidence: 0.92,
        actionable: true,
        suggestedActions: [
          'Assign hot leads to top-performing agents',
          'Schedule immediate follow-up calls',
          'Prepare personalized demo materials',
        ],
      });
    }

    if (salesStats.conversionRate < 20 && salesStats.qualifiedLeads > 20) {
      insights.push({
        type: 'anomaly',
        severity: 'critical',
        title: 'Low Conversion Rate Detected',
        description: `Conversion rate is ${salesStats.conversionRate.toFixed(2)}% despite ${salesStats.qualifiedLeads} qualified leads. Investigation needed.`,
        confidence: 0.88,
        actionable: true,
        suggestedActions: [
          'Review sales process and identify friction points',
          'Analyze lost opportunities',
          'Improve lead qualification criteria',
          'Enhance follow-up sequences',
        ],
      });
    }

    // Capacity forecasting
    const missionRate = systemStatus.completedMissions / (systemStatus.uptime / 3600000); // per hour
    if (missionRate > 50) {
      insights.push({
        type: 'forecast',
        severity: 'warning',
        title: 'High System Load Forecasted',
        description: `Current mission rate is ${missionRate.toFixed(2)}/hour. System may need scaling within 24 hours.`,
        confidence: 0.78,
        actionable: true,
        suggestedActions: [
          'Prepare to scale up agent capacity',
          'Review system resource allocation',
          'Enable auto-scaling if not already active',
        ],
      });
    }

    return insights;
  }

  /**
   * Calculate overall success rate
   */
  private calculateSuccessRate(systemStatus: any): string {
    if (systemStatus.totalMissions === 0) return '0%';
    return `${((systemStatus.completedMissions / systemStatus.totalMissions) * 100).toFixed(2)}%`;
  }

  /**
   * Calculate autonomy level
   */
  private calculateAutonomyLevel(emailStats: any, salesStats: any): string {
    const emailAutonomy = emailStats.autonomyRate || 0;
    const salesAutonomy = salesStats.qualificationRate || 0;
    const avgAutonomy = (emailAutonomy + salesAutonomy) / 2;
    return `${avgAutonomy.toFixed(2)}%`;
  }

  /**
   * Format uptime
   */
  private formatUptime(uptime: number): string {
    const seconds = Math.floor(uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  /**
   * Calculate trend
   */
  private calculateTrend(division: any): 'up' | 'down' | 'stable' {
    // Simplified trend calculation
    if (division.successRate > 90) return 'up';
    if (division.successRate < 70) return 'down';
    return 'stable';
  }

  /**
   * Identify top agents
   */
  private identifyTopAgents(division: Division): string[] {
    // In production, this would query actual agent performance data
    return ['Agent Alpha', 'Agent Beta', 'Agent Gamma'];
  }

  /**
   * Identify bottlenecks
   */
  private identifyBottlenecks(performance: any): string[] {
    const bottlenecks: string[] = [];

    if (performance.averageResponseTime > 5000) {
      bottlenecks.push('High response time detected');
    }

    if (performance.successRate < 80) {
      bottlenecks.push('Below-target success rate');
    }

    if (performance.efficiency < 70) {
      bottlenecks.push('Low efficiency score');
    }

    return bottlenecks.length > 0 ? bottlenecks : ['No bottlenecks detected'];
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(performance: any): string[] {
    const recommendations: string[] = [];

    if (performance.successRate < 90) {
      recommendations.push('Implement additional agent training');
      recommendations.push('Review and optimize mission routing logic');
    }

    if (performance.averageResponseTime > 3000) {
      recommendations.push('Optimize database queries');
      recommendations.push('Consider caching frequently accessed data');
    }

    if (performance.efficiency < 80) {
      recommendations.push('Analyze and eliminate redundant processes');
      recommendations.push('Increase automation level');
    }

    if (recommendations.length === 0) {
      recommendations.push('Performance is excellent - maintain current operations');
    }

    return recommendations;
  }

  /**
   * Generate custom report
   */
  generateCustomReport(params: {
    divisions?: Division[];
    timeframe?: string;
    metrics?: string[];
  }): any {
    const dashboard = this.generateExecutiveDashboard();

    return {
      reportId: `REPORT-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      timeframe: params.timeframe || 'Last 24 hours',
      requestedDivisions: params.divisions || Object.values(Division),
      requestedMetrics: params.metrics || ['all'],
      data: dashboard,
      summary: {
        overallHealth: dashboard.systemHealth.overall,
        totalMissions: dashboard.kpis.totalMissions,
        successRate: dashboard.kpis.successRate,
        topInsight: dashboard.insights[0] || null,
      },
    };
  }
}

// Export singleton instance
export const analyticsEngine = new AnalyticsEngine();
