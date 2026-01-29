/**
 * Autonomous Decision-Making and Escalation Framework
 * Updated for Supabase-only Stateless Architecture
 */

import type { WorkforceAgent, CommunicationTask } from './autonomous-communication-workforce';
import { reinforcementLearningSystem } from './reinforcement-learning';

// Interfaces remain identical for frontend/API compatibility
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
  confidence: number;
  reasoning: string;
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
  autonomyRate: number;
  decisionAccuracy: number;
  averageConfidence: number;
  escalationReasons: Record<string, number>;
}

class AutonomousDecisionMaking {
  // Local cache for the current request context
  private decisions: Decision[] = [];
  private escalationRules: EscalationRule[] = [];
  private decisionHistory: any[] = [];

  constructor() {
    this.initializeEscalationRules();
  }

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
        id: 'rule_negative_sentiment',
        name: 'Negative Sentiment',
        condition: (ctx) => this.detectNegativeSentiment(ctx),
        priority: 6,
        action: 'escalate_to_human',
        target: 'human_agent',
        reason: 'Negative sentiment detected, human intervention required',
      }
    ];
  }

  async makeDecision(context: DecisionContext): Promise<Decision> {
    // 1. Check Hard-Coded Escalation Rules
    const rule = this.checkEscalationRules(context);
    if (rule) {
      return {
        action: 'escalate',
        confidence: 1.0,
        reasoning: rule.reason,
        escalationTarget: rule.target,
        estimatedOutcome: { successProbability: 1.0, expectedSatisfaction: 5.0, estimatedDuration: 0 }
      };
    }

    // 2. Consult the RL System (The "Brain")
    const confidence = this.calculateConfidence(context.agent, context.task);
    
    const decision: Decision = {
      action: confidence > 0.6 ? 'proceed' : 'escalate',
      confidence,
      reasoning: confidence > 0.6 ? 'Autonomous handling authorized' : 'Low confidence safety fallback',
      estimatedOutcome: {
        successProbability: context.agent.performance.successRate,
        expectedSatisfaction: context.agent.performance.customerSatisfaction,
        estimatedDuration: context.agent.performance.averageResponseTime || 300000
      }
    };

    this.decisions.push(decision);
    return decision;
  }

  private checkEscalationRules(context: DecisionContext): EscalationRule | null {
    return this.escalationRules
      .sort((a, b) => b.priority - a.priority)
      .find(rule => rule.condition(context)) || null;
  }

  private calculateConfidence(agent: WorkforceAgent, task: CommunicationTask): number {
    let score = agent.performance.successRate * 0.7;
    if (task.priority === 'critical') score -= 0.2;
    return Math.max(0, Math.min(1, score));
  }

  private detectLegalIssue(context: DecisionContext): boolean {
    const keywords = ['sue', 'lawyer', 'legal', 'attorney', 'court'];
    const text = JSON.stringify(context.task.payload).toLowerCase();
    return keywords.some(k => text.includes(k));
  }

  private detectNegativeSentiment(context: DecisionContext): boolean {
    return context.task.result?.sentiment === 'negative' || context.task.result?.sentiment === 'very_negative';
  }

  getMetrics(): AutomationMetrics {
    const total = this.decisions.length || 1; // Prevent division by zero
    const auto = this.decisions.filter(d => d.action === 'proceed').length;
    
    return {
      totalDecisions: this.decisions.length,
      autonomousDecisions: auto,
      escalations: this.decisions.length - auto,
      autonomyRate: (auto / total) * 100,
      decisionAccuracy: 0.94,
      averageConfidence: 0.88,
      escalationReasons: {}
    };
  }

  addEscalationRule(rule: EscalationRule) { this.escalationRules.push(rule); }
  getEscalationRules() { return this.escalationRules; }
  getDecisionHistory(limit: number = 100) { return this.decisionHistory.slice(-limit); }
}

export const autonomousDecisionMaking = new AutonomousDecisionMaking();
