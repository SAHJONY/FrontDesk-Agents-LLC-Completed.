/**
 * Reinforcement Learning Optimizer for Sales Performance
 * Constrained RL for optimizing safe variables only
 */

import type { ExperimentPlan } from './autonomous-sales-workforce';

interface SalesRLState {
  campaign_id: string;
  geo: string;
  industry: string;
  time_of_day: number; // 0-23
  day_of_week: number; // 0-6
  subject_variant: string;
  cta_variant: string;
  send_time_window: string;
  segment: string;
  historical_performance: {
    reply_rate: number;
    positive_reply_rate: number;
    demo_book_rate: number;
  };
}

interface SalesRLAction {
  variable: 'subject' | 'timing' | 'cta' | 'segment' | 'landing';
  variant: string;
  confidence: number;
}

interface SalesRLReward {
  reply_rate: number;
  positive_reply_rate: number;
  demo_book_rate: number;
  demo_show_rate: number;
  demo_to_paid_rate: number;
  // Guardrail metrics (must remain healthy)
  bounce_rate: number;
  complaint_rate: number;
  negative_reply_rate: number;
  opt_out_rate: number;
  // Composite reward
  total_reward: number;
  guardrails_satisfied: boolean;
}

interface ExperimentResult {
  experiment_id: string;
  variable: string;
  variants: Array<{
    variant: string;
    samples: number;
    metrics: {
      reply_rate: number;
      positive_reply_rate: number;
      demo_book_rate: number;
      bounce_rate: number;
      complaint_rate: number;
    };
    reward: number;
  }>;
  winner: string;
  confidence: number;
  recommendation: string;
}

interface GuardrailThresholds {
  max_bounce_rate: number; // 3%
  max_complaint_rate: number; // 0.1%
  max_negative_reply_rate: number; // 10%
  max_opt_out_rate: number; // 2%
}

class SalesRLOptimizer {
  private experiments: Map<string, ExperimentPlan> = new Map();
  private results: Map<string, ExperimentResult> = new Map();
  private qTable: Map<string, Map<string, number>> = new Map();
  private learningRate: number = 0.1;
  private discountFactor: number = 0.95;
  private explorationRate: number = 0.15;

  private guardrails: GuardrailThresholds = {
    max_bounce_rate: 0.03, // 3%
    max_complaint_rate: 0.001, // 0.1%
    max_negative_reply_rate: 0.10, // 10%
    max_opt_out_rate: 0.02, // 2%
  };

  /**
   * Create experiment plan
   */
  createExperiment(params: {
    campaign_id: string;
    variable: 'subject' | 'timing' | 'cta' | 'segment' | 'landing';
    variants: string[];
    allocation?: number[];
  }): ExperimentPlan {
    const experiment: ExperimentPlan = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      variable: params.variable,
      variants: params.variants,
      allocation: params.allocation || params.variants.map(() => 1 / params.variants.length),
      reward_metrics: [
        'reply_rate',
        'positive_reply_rate',
        'demo_book_rate',
        'demo_show_rate',
        'demo_to_paid_rate',
      ],
      guardrails: this.guardrails,
      stop_rules: [
        'pause if bounce_rate > 3%',
        'pause if complaint_rate > 0.1%',
        'pause if negative_reply_spike detected',
      ],
    };

    this.experiments.set(experiment.id, experiment);

    return experiment;
  }

  /**
   * Run experiment (A/B test)
   */
  async runExperiment(experimentId: string, samples_per_variant: number = 100): Promise<ExperimentResult> {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) {
      throw new Error('Experiment not found');
    }

    // Simulate experiment execution
    const variantResults = experiment.variants.map(variant => {
      // Simulate metrics for this variant
      const reply_rate = this.simulateMetric(0.05, 0.10); // 5-10%
      const positive_reply_rate = reply_rate * this.simulateMetric(0.6, 0.9); // 60-90% of replies
      const demo_book_rate = positive_reply_rate * this.simulateMetric(0.3, 0.5); // 30-50% of positive replies
      const bounce_rate = this.simulateMetric(0.01, 0.02); // 1-2%
      const complaint_rate = this.simulateMetric(0.0001, 0.0005); // 0.01-0.05%

      // Calculate reward
      const reward = this.calculateReward({
        reply_rate,
        positive_reply_rate,
        demo_book_rate,
        demo_show_rate: demo_book_rate * 0.8, // 80% show rate
        demo_to_paid_rate: demo_book_rate * 0.3, // 30% conversion
        bounce_rate,
        complaint_rate,
        negative_reply_rate: reply_rate * 0.1, // 10% negative
        opt_out_rate: 0.01,
        total_reward: 0,
        guardrails_satisfied: true,
      });

      return {
        variant,
        samples: samples_per_variant,
        metrics: {
          reply_rate,
          positive_reply_rate,
          demo_book_rate,
          bounce_rate,
          complaint_rate,
        },
        reward: reward.total_reward,
      };
    });

    // Find winner
    const winner = variantResults.reduce((best, current) =>
      current.reward > best.reward ? current : best
    );

    // Calculate confidence
    const confidence = this.calculateStatisticalSignificance(variantResults);

    const result: ExperimentResult = {
      experiment_id: experimentId,
      variable: experiment.variable,
      variants: variantResults,
      winner: winner.variant,
      confidence,
      recommendation: confidence > 0.95
        ? `Deploy ${winner.variant} (${(confidence * 100).toFixed(1)}% confidence)`
        : `Continue testing - insufficient confidence (${(confidence * 100).toFixed(1)}%)`,
    };

    this.results.set(experimentId, result);

    return result;
  }

  /**
   * Select action using epsilon-greedy policy
   */
  selectAction(state: SalesRLState, availableActions: SalesRLAction[]): SalesRLAction {
    // Exploration vs exploitation
    if (Math.random() < this.explorationRate) {
      // Explore: random action
      return availableActions[Math.floor(Math.random() * availableActions.length)];
    } else {
      // Exploit: best known action
      return this.getBestAction(state, availableActions);
    }
  }

  /**
   * Get best action based on Q-table
   */
  private getBestAction(state: SalesRLState, availableActions: SalesRLAction[]): SalesRLAction {
    const stateKey = this.stateToKey(state);
    const stateActions = this.qTable.get(stateKey);

    if (!stateActions || stateActions.size === 0) {
      // No learned policy, return random action
      return availableActions[Math.floor(Math.random() * availableActions.length)];
    }

    // Find action with highest Q-value
    let bestAction = availableActions[0];
    let bestQValue = -Infinity;

    for (const action of availableActions) {
      const actionKey = this.actionToKey(action);
      const qValue = stateActions.get(actionKey) || 0;

      if (qValue > bestQValue) {
        bestQValue = qValue;
        bestAction = action;
      }
    }

    return bestAction;
  }

  /**
   * Update Q-table with reward
   */
  async updateQTable(
    state: SalesRLState,
    action: SalesRLAction,
    reward: SalesRLReward,
    nextState: SalesRLState
  ): Promise<void> {
    // Check guardrails first
    if (!reward.guardrails_satisfied) {
      console.warn('Guardrails violated - not updating Q-table');
      return;
    }

    const stateKey = this.stateToKey(state);
    const actionKey = this.actionToKey(action);

    // Initialize Q-table entries if not exist
    if (!this.qTable.has(stateKey)) {
      this.qTable.set(stateKey, new Map());
    }

    const stateActions = this.qTable.get(stateKey)!;
    const currentQ = stateActions.get(actionKey) || 0;

    // Get max Q-value for next state
    const nextStateKey = this.stateToKey(nextState);
    const maxNextQ = this.getMaxQValue(nextStateKey);

    // Q-learning update rule
    const newQ =
      currentQ +
      this.learningRate * (reward.total_reward + this.discountFactor * maxNextQ - currentQ);

    stateActions.set(actionKey, newQ);
  }

  /**
   * Get maximum Q-value for a state
   */
  private getMaxQValue(stateKey: string): number {
    const stateActions = this.qTable.get(stateKey);
    if (!stateActions || stateActions.size === 0) {
      return 0;
    }

    return Math.max(...Array.from(stateActions.values()));
  }

  /**
   * Calculate reward with guardrails
   */
  private calculateReward(metrics: SalesRLReward): SalesRLReward {
    // Check guardrails
    const guardrails_satisfied =
      metrics.bounce_rate <= this.guardrails.max_bounce_rate &&
      metrics.complaint_rate <= this.guardrails.max_complaint_rate &&
      metrics.negative_reply_rate <= this.guardrails.max_negative_reply_rate &&
      metrics.opt_out_rate <= this.guardrails.max_opt_out_rate;

    // If guardrails violated, return negative reward
    if (!guardrails_satisfied) {
      return {
        ...metrics,
        total_reward: -1.0,
        guardrails_satisfied: false,
      };
    }

    // Calculate composite reward (weighted)
    const total_reward =
      metrics.reply_rate * 0.2 +
      metrics.positive_reply_rate * 0.25 +
      metrics.demo_book_rate * 0.3 +
      metrics.demo_show_rate * 0.15 +
      metrics.demo_to_paid_rate * 0.1;

    return {
      ...metrics,
      total_reward,
      guardrails_satisfied: true,
    };
  }

  /**
   * Simulate metric value
   */
  private simulateMetric(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  /**
   * Calculate statistical significance
   */
  private calculateStatisticalSignificance(variants: any[]): number {
    // Simplified confidence calculation
    // In production, use proper statistical tests (t-test, chi-square, etc.)
    if (variants.length < 2) return 0;

    const rewards = variants.map(v => v.reward);
    const mean = rewards.reduce((sum, r) => sum + r, 0) / rewards.length;
    const variance = rewards.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / rewards.length;
    const stdDev = Math.sqrt(variance);

    // Higher variance = lower confidence
    const confidence = Math.max(0, Math.min(1, 1 - stdDev / mean));

    return confidence;
  }

  /**
   * Convert state to string key
   */
  private stateToKey(state: SalesRLState): string {
    return JSON.stringify({
      geo: state.geo,
      industry: state.industry,
      time_of_day: Math.floor(state.time_of_day / 6), // 4 time blocks
      day_of_week: state.day_of_week,
      segment: state.segment,
    });
  }

  /**
   * Convert action to string key
   */
  private actionToKey(action: SalesRLAction): string {
    return `${action.variable}_${action.variant}`;
  }

  /**
   * Get optimization recommendations
   */
  async getRecommendations(campaign_id: string): Promise<{
    recommendations: string[];
    experiments_to_run: ExperimentPlan[];
    current_performance: any;
  }> {
    const recommendations: string[] = [];
    const experiments_to_run: ExperimentPlan[] = [];

    // Recommend subject line testing
    recommendations.push('Test 3 subject line variants to optimize open rates');
    experiments_to_run.push(
      this.createExperiment({
        campaign_id,
        variable: 'subject',
        variants: [
          'Question-based subject',
          'Value proposition subject',
          'Personalized subject',
        ],
      })
    );

    // Recommend timing optimization
    recommendations.push('Test send time windows to optimize reply rates');
    experiments_to_run.push(
      this.createExperiment({
        campaign_id,
        variable: 'timing',
        variants: ['Morning (8-10am)', 'Midday (12-2pm)', 'Afternoon (3-5pm)'],
      })
    );

    // Recommend CTA testing
    recommendations.push('Test CTA variants to optimize demo booking');
    experiments_to_run.push(
      this.createExperiment({
        campaign_id,
        variable: 'cta',
        variants: ['Book a demo', 'Schedule a call', 'See it in action'],
      })
    );

    return {
      recommendations,
      experiments_to_run,
      current_performance: {
        reply_rate: 0.06,
        demo_book_rate: 0.02,
        bounce_rate: 0.015,
        complaint_rate: 0.0003,
      },
    };
  }

  /**
   * Check if guardrails are satisfied
   */
  checkGuardrails(metrics: {
    bounce_rate: number;
    complaint_rate: number;
    negative_reply_rate: number;
    opt_out_rate: number;
  }): { satisfied: boolean; violations: string[] } {
    const violations: string[] = [];

    if (metrics.bounce_rate > this.guardrails.max_bounce_rate) {
      violations.push(`Bounce rate ${(metrics.bounce_rate * 100).toFixed(2)}% exceeds ${(this.guardrails.max_bounce_rate * 100).toFixed(2)}%`);
    }

    if (metrics.complaint_rate > this.guardrails.max_complaint_rate) {
      violations.push(`Complaint rate ${(metrics.complaint_rate * 100).toFixed(3)}% exceeds ${(this.guardrails.max_complaint_rate * 100).toFixed(3)}%`);
    }

    if (metrics.negative_reply_rate > this.guardrails.max_negative_reply_rate) {
      violations.push(`Negative reply rate ${(metrics.negative_reply_rate * 100).toFixed(2)}% exceeds ${(this.guardrails.max_negative_reply_rate * 100).toFixed(2)}%`);
    }

    if (metrics.opt_out_rate > this.guardrails.max_opt_out_rate) {
      violations.push(`Opt-out rate ${(metrics.opt_out_rate * 100).toFixed(2)}% exceeds ${(this.guardrails.max_opt_out_rate * 100).toFixed(2)}%`);
    }

    return {
      satisfied: violations.length === 0,
      violations,
    };
  }

  /**
   * Get experiment results
   */
  getExperimentResults(experimentId: string): ExperimentResult | undefined {
    return this.results.get(experimentId);
  }

  /**
   * Get all experiments
   */
  getAllExperiments(): ExperimentPlan[] {
    return Array.from(this.experiments.values());
  }

  /**
   * Export Q-table
   */
  exportQTable(): any {
    const exported: any = {};

    for (const [stateKey, actions] of this.qTable.entries()) {
      exported[stateKey] = {};
      for (const [actionKey, qValue] of actions.entries()) {
        exported[stateKey][actionKey] = qValue;
      }
    }

    return exported;
  }
}

// Export singleton instance
export const salesRLOptimizer = new SalesRLOptimizer();
export type { SalesRLState, SalesRLAction, SalesRLReward, ExperimentResult, GuardrailThresholds };
