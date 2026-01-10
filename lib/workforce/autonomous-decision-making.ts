/**
 * Autonomous Decision-Making and Escalation Framework
 * Intelligent decision-making without human intervention
 */

import type { WorkforceAgent, CommunicationTask } from './autonomous-communication-workforce';
import { reinforcementLearningSystem } from './reinforcement-learning';

interface DecisionContext {
  task: CommunicationTask;
  agent: WorkforceAgent;
  systemState: {
    activeAgents: number;
    queueLength: number;
    averageResponseTime: number;
    systemLoad: number;
  };
  customerContext?: {
    lifetimeValue: number;
    satisfactionHistory: number[];
    priorityLevel: string;
    previousIssues: any[];
  };
}

interface Decision {
  action: 'proceed' | 'escalate' | 'defer' | 'delegate' | 'abort';
  confidence: number; // 0-1
  reasoning: string;
  alternativeActions?: Array<{ action: string; confidence: number }>;
  escalationTarget?: string;
  estimatedOutcome: {
    successProbability: number;
    expectedSatisfaction: number;
    estimatedDuration: number;
  };
}

interface EscalationRule {
  id: string;
  name: string;
  condition: (context: DecisionContext) => boolean;
  priority: number;
  action: string;
  target: 'human_agent' | 'senior_agent' | 'manager' | 'specialist';
  reason: string;
}

interface AutomationMetrics {
  totalDecisions: number;
  autonomousDecisions: number;
  escalations: number;
  autonomyRate: number; // percentage handled without escalation
  decisionAccuracy: number;
  averageConfidence: number;
  escalationReasons: Record<string, number>;
}

class AutonomousDecisionMaking {
  private decisions: Decision[] = [];
  private escalationRules: EscalationRule[] = [];
  private decisionHistory: Array<{ context: DecisionContext; decision: Decision; outcome: any }> = [];

  constructor() {
    this.initializeEscalationRules();
  }

  /**
   * Initialize escalation rules
   */
  private initializeEscalationRules(): void {
    this.escalationRules = [
      {
        id: 'rule_legal_issue',
        name: 'Legal Issue Detection',
        condition: (ctx) => this.detectLegalIssue(ctx),
        priority: 10,
        action: 'escalate_immediately',
        target: 'specialist',
        reason: 'Legal matter requires specialist attention',
      },
      {
        id: 'rule_high_value_customer',
        name: 'High-Value Customer',
        condition: (ctx) => ctx.customerContext && ctx.customerContext.lifetimeValue > 10000,
        priority: 8,
        action: 'escalate_to_senior',
        target: 'senior_agent',
        reason: 'High-value customer requires senior attention',
      },
      {
        id: 'rule_repeated_issue',
        name: 'Repeated Issue',
        condition: (ctx) =>
          ctx.customerContext &&
          ctx.customerContext.previousIssues &&
          ctx.customerContext.previousIssues.length > 2,
        priority: 7,
        action: 'escalate_to_manager',
        target: 'manager',
        reason: 'Customer has repeated issues, manager intervention needed',
      },
      {
        id: 'rule_negative_sentiment',
        name: 'Very Negative Sentiment',
        condition: (ctx) => this.detectNegativeSentiment(ctx),
        priority: 6,
        action: 'escalate_to_human',
        target: 'human_agent',
        reason: 'Very negative sentiment detected, human touch needed',
      },
      {
        id: 'rule_complex_request',
        name: 'Complex Request',
        condition: (ctx) => this.isComplexRequest(ctx),
        priority: 5,
        action: 'delegate_to_specialist',
        target: 'specialist',
        reason: 'Request complexity exceeds autonomous capability',
      },
      {
        id: 'rule_low_confidence',
        name: 'Low Confidence',
        condition: (ctx) => ctx.agent.performance.successRate < 0.7,
        priority: 4,
        action: 'escalate_to_senior',
        target: 'senior_agent',
        reason: 'Agent confidence too low for autonomous handling',
      },
    ];
  }

  /**
   * Make autonomous decision
   */
  async makeDecision(context: DecisionContext): Promise<Decision> {
    // Check escalation rules first
    const escalationRule = this.checkEscalationRules(context);

    if (escalationRule) {
      const decision: Decision = {
        action: 'escalate',
        confidence: 0.95,
        reasoning: escalationRule.reason,
        escalationTarget: escalationRule.target,
        estimatedOutcome: {
          successProbability: 0.9,
          expectedSatisfaction: 4.5,
          estimatedDuration: 600000, // 10 minutes
        },
      };

      this.decisions.push(decision);
      return decision;
    }

    // Use RL to make decision
    const rlDecision = await this.makeRLDecision(context);

    // Validate decision
    const validatedDecision = this.validateDecision(rlDecision, context);

    this.decisions.push(validatedDecision);
    return validatedDecision;
  }

  /**
   * Check if any escalation rules apply
   */
  private checkEscalationRules(context: DecisionContext): EscalationRule | null {
    // Sort by priority (highest first)
    const sortedRules = [...this.escalationRules].sort((a, b) => b.priority - a.priority);

    for (const rule of sortedRules) {
      if (rule.condition(context)) {
        return rule;
      }
    }

    return null;
  }

  /**
   * Make decision using reinforcement learning
   */
  private async makeRLDecision(context: DecisionContext): Promise<Decision> {
    const { task, agent, systemState } = context;

    // Extract RL state
    const state = {
      agentLoad: agent.currentTask ? 1.0 : 0.0,
      taskPriority: this.normalizePriority(task.priority),
      customerSentiment: 0.0,
      timeOfDay: new Date().getHours(),
      taskComplexity: 0.5,
      agentExperience: Math.min(1, agent.performance.tasksCompleted / 1000),
    };

    // Get available actions
    const availableActions = [
      { type: 'assign' as const, targetAgent: agent.id },
      { type: 'escalate' as const },
      { type: 'defer' as const },
    ];

    // Select action using RL
    const selectedAction = reinforcementLearningSystem.selectAction(state, availableActions);

    // Calculate confidence
    const confidence = this.calculateConfidence(agent, task);

    // Estimate outcome
    const estimatedOutcome = this.estimateOutcome(agent, task);

    return {
      action: selectedAction.type === 'assign' ? 'proceed' : selectedAction.type,
      confidence,
      reasoning: `RL-based decision: ${selectedAction.type}`,
      estimatedOutcome,
    };
  }

  /**
   * Validate decision
   */
  private validateDecision(decision: Decision, context: DecisionContext): Decision {
    // Override if confidence is too low
    if (decision.confidence < 0.5 && decision.action === 'proceed') {
      return {
        ...decision,
        action: 'escalate',
        reasoning: 'Confidence too low, escalating for safety',
        escalationTarget: 'human_agent',
      };
    }

    // Override if system is overloaded
    if (context.systemState.systemLoad > 0.9 && decision.action === 'defer') {
      return {
        ...decision,
        action: 'escalate',
        reasoning: 'System overloaded, escalating to prevent queue buildup',
        escalationTarget: 'human_agent',
      };
    }

    return decision;
  }

  /**
   * Calculate decision confidence
   */
  private calculateConfidence(agent: WorkforceAgent, task: CommunicationTask): number {
    let confidence = 0.5; // base confidence

    // Factor in agent success rate
    confidence += agent.performance.successRate * 0.3;

    // Factor in agent experience
    const experienceBonus = Math.min(0.2, agent.performance.tasksCompleted / 5000);
    confidence += experienceBonus;

    // Reduce confidence for high priority tasks
    if (task.priority === 'critical') confidence -= 0.1;
    if (task.priority === 'high') confidence -= 0.05;

    return Math.max(0, Math.min(1, confidence));
  }

  /**
   * Estimate task outcome
   */
  private estimateOutcome(agent: WorkforceAgent, task: CommunicationTask): {
    successProbability: number;
    expectedSatisfaction: number;
    estimatedDuration: number;
  } {
    const successProbability = agent.performance.successRate;
    const expectedSatisfaction = agent.performance.customerSatisfaction;
    const estimatedDuration = agent.performance.averageResponseTime || 300000; // 5 minutes default

    return {
      successProbability,
      expectedSatisfaction,
      estimatedDuration,
    };
  }

  /**
   * Detect legal issues
   */
  private detectLegalIssue(context: DecisionContext): boolean {
    const legalKeywords = [
      'lawsuit',
      'lawyer',
      'attorney',
      'legal action',
      'sue',
      'court',
      'subpoena',
      'compliance violation',
    ];

    const taskPayload = JSON.stringify(context.task.payload).toLowerCase();

    return legalKeywords.some(keyword => taskPayload.includes(keyword));
  }

  /**
   * Detect negative sentiment
   */
  private detectNegativeSentiment(context: DecisionContext): boolean {
    if (context.task.result?.sentiment) {
      return ['very_negative', 'negative'].includes(context.task.result.sentiment);
    }

    // Check for negative keywords
    const negativeKeywords = [
      'terrible',
      'worst',
      'horrible',
      'awful',
      'disgusting',
      'unacceptable',
      'furious',
      'angry',
    ];

    const taskPayload = JSON.stringify(context.task.payload).toLowerCase();

    return negativeKeywords.some(keyword => taskPayload.includes(keyword));
  }

  /**
   * Check if request is complex
   */
  private isComplexRequest(context: DecisionContext): boolean {
    const { task } = context;

    // Complex if multiple actions required
    if (task.payload.actions && task.payload.actions.length > 3) {
      return true;
    }

    // Complex if involves integrations
    if (task.payload.requiresIntegration) {
      return true;
    }

    // Complex if long conversation history
    if (context.task.context?.conversationHistory && context.task.context.conversationHistory.length > 10) {
      return true;
    }

    return false;
  }

  /**
   * Normalize priority to 0-1 scale
   */
  private normalizePriority(priority: string): number {
    const priorityMap: Record<string, number> = {
      critical: 1.0,
      high: 0.75,
      medium: 0.5,
      low: 0.25,
    };

    return priorityMap[priority] || 0.5;
  }

  /**
   * Record decision outcome
   */
  recordOutcome(decision: Decision, context: DecisionContext, outcome: any): void {
    this.decisionHistory.push({
      context,
      decision,
      outcome,
    });

    // Learn from outcome
    this.learnFromOutcome(decision, outcome);
  }

  /**
   * Learn from decision outcome
   */
  private learnFromOutcome(decision: Decision, outcome: any): void {
    // If decision was correct, increase confidence in similar situations
    // If decision was incorrect, adjust decision-making parameters

    const success = outcome.success || outcome.status === 'completed';

    if (!success && decision.action === 'proceed') {
      // Should have escalated
      console.log('Learning: Should have escalated this case');
    }

    if (success && decision.action === 'escalate') {
      // Could have handled autonomously
      console.log('Learning: Could have handled autonomously');
    }
  }

  /**
   * Get automation metrics
   */
  getMetrics(): AutomationMetrics {
    const totalDecisions = this.decisions.length;

    if (totalDecisions === 0) {
      return {
        totalDecisions: 0,
        autonomousDecisions: 0,
        escalations: 0,
        autonomyRate: 0,
        decisionAccuracy: 0,
        averageConfidence: 0,
        escalationReasons: {},
      };
    }

    const autonomousDecisions = this.decisions.filter(d => d.action === 'proceed').length;
    const escalations = this.decisions.filter(d => d.action === 'escalate').length;

    const autonomyRate = (autonomousDecisions / totalDecisions) * 100;

    const averageConfidence =
      this.decisions.reduce((sum, d) => sum + d.confidence, 0) / totalDecisions;

    // Calculate accuracy from decision history
    const successfulDecisions = this.decisionHistory.filter(
      h => h.outcome.success || h.outcome.status === 'completed'
    ).length;
    const decisionAccuracy =
      this.decisionHistory.length > 0 ? successfulDecisions / this.decisionHistory.length : 0;

    // Count escalation reasons
    const escalationReasons: Record<string, number> = {};
    this.decisions
      .filter(d => d.action === 'escalate')
      .forEach(d => {
        const reason = d.reasoning || 'unknown';
        escalationReasons[reason] = (escalationReasons[reason] || 0) + 1;
      });

    return {
      totalDecisions,
      autonomousDecisions,
      escalations,
      autonomyRate,
      decisionAccuracy,
      averageConfidence,
      escalationReasons,
    };
  }

  /**
   * Add custom escalation rule
   */
  addEscalationRule(rule: EscalationRule): void {
    this.escalationRules.push(rule);
  }

  /**
   * Get all escalation rules
   */
  getEscalationRules(): EscalationRule[] {
    return this.escalationRules;
  }

  /**
   * Get decision history
   */
  getDecisionHistory(limit: number = 100): Array<{ context: DecisionContext; decision: Decision; outcome: any }> {
    return this.decisionHistory.slice(-limit);
  }
}

// Export singleton instance
export const autonomousDecisionMaking = new AutonomousDecisionMaking();
export type { DecisionContext, Decision, EscalationRule, AutomationMetrics };
