/**
 * Reinforcement Learning Training and Optimization System
 * Continuous learning and improvement for autonomous workforce
 */

import type { WorkforceAgent, CommunicationTask } from './autonomous-communication-workforce';

interface RLState {
  agentLoad: number; // 0-1
  taskPriority: number; // 0-1
  customerSentiment: number; // -1 to 1
  timeOfDay: number; // 0-23
  taskComplexity: number; // 0-1
  agentExperience: number; // 0-1
}

interface RLAction {
  type: 'assign' | 'escalate' | 'defer' | 'delegate';
  targetAgent?: string;
  priority?: number;
  reason?: string;
}

interface RLReward {
  taskSuccess: number; // 0-1
  responseTime: number; // normalized
  customerSatisfaction: number; // 0-1
  resourceEfficiency: number; // 0-1
  totalReward: number;
}

interface TrainingEpisode {
  id: string;
  agentId: string;
  state: RLState;
  action: RLAction;
  reward: RLReward;
  nextState: RLState;
  timestamp: Date;
}

interface LearningMetrics {
  totalEpisodes: number;
  averageReward: number;
  rewardTrend: number[];
  convergenceRate: number;
  explorationRate: number;
  optimalPolicyAccuracy: number;
}

class ReinforcementLearningSystem {
  private episodes: TrainingEpisode[] = [];
  private qTable: Map<string, Map<string, number>> = new Map();
  private learningRate: number = 0.1;
  private discountFactor: number = 0.95;
  private explorationRate: number = 0.2;
  private minExplorationRate: number = 0.01;
  private explorationDecay: number = 0.995;

  /**
   * Train agent on completed task
   */
  async trainAgent(
    agent: WorkforceAgent,
    task: CommunicationTask,
    success: boolean
  ): Promise<void> {
    // Extract state from task context
    const state = this.extractState(agent, task);

    // Determine action taken
    const action = this.extractAction(task);

    // Calculate reward
    const reward = this.calculateReward(task, success);

    // Get next state (current agent state after task)
    const nextState = this.extractCurrentState(agent);

    // Create training episode
    const episode: TrainingEpisode = {
      id: `episode_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agentId: agent.id,
      state,
      action,
      reward,
      nextState,
      timestamp: new Date(),
    };

    // Store episode
    this.episodes.push(episode);

    // Update Q-table (Q-learning)
    await this.updateQTable(state, action, reward, nextState);

    // Update agent's RL model
    this.updateAgentModel(agent, episode);

    // Decay exploration rate
    this.explorationRate = Math.max(
      this.minExplorationRate,
      this.explorationRate * this.explorationDecay
    );
  }

  /**
   * Extract state from task and agent
   */
  private extractState(agent: WorkforceAgent, task: CommunicationTask): RLState {
    const agentLoad = agent.currentTask ? 1.0 : 0.0;
    
    const priorityMap = { critical: 1.0, high: 0.75, medium: 0.5, low: 0.25 };
    const taskPriority = priorityMap[task.priority];

    const customerSentiment = this.extractSentiment(task);
    
    const timeOfDay = new Date().getHours();
    
    const taskComplexity = this.calculateTaskComplexity(task);
    
    const agentExperience = agent.performance.tasksCompleted / 1000; // normalized

    return {
      agentLoad,
      taskPriority,
      customerSentiment,
      timeOfDay,
      taskComplexity,
      agentExperience: Math.min(1, agentExperience),
    };
  }

  /**
   * Extract current state of agent
   */
  private extractCurrentState(agent: WorkforceAgent): RLState {
    return {
      agentLoad: agent.currentTask ? 1.0 : 0.0,
      taskPriority: 0.5,
      customerSentiment: 0.0,
      timeOfDay: new Date().getHours(),
      taskComplexity: 0.5,
      agentExperience: Math.min(1, agent.performance.tasksCompleted / 1000),
    };
  }

  /**
   * Extract action from task
   */
  private extractAction(task: CommunicationTask): RLAction {
    return {
      type: 'assign',
      targetAgent: task.assignedAgent,
    };
  }

  /**
   * Calculate reward for task completion
   */
  private calculateReward(task: CommunicationTask, success: boolean): RLReward {
    // Task success component (0-1)
    const taskSuccess = success ? 1.0 : 0.0;

    // Response time component (faster is better)
    const maxResponseTime = 600000; // 10 minutes
    const responseTime = task.duration || maxResponseTime;
    const responseTimeReward = Math.max(0, 1 - responseTime / maxResponseTime);

    // Customer satisfaction component (0-1)
    const customerSatisfaction = task.result?.customerSatisfaction 
      ? (task.result.customerSatisfaction / 5.0)
      : 0.5;

    // Resource efficiency component
    const resourceEfficiency = this.calculateResourceEfficiency(task);

    // Weighted total reward
    const totalReward =
      taskSuccess * 0.4 +
      responseTimeReward * 0.2 +
      customerSatisfaction * 0.3 +
      resourceEfficiency * 0.1;

    return {
      taskSuccess,
      responseTime: responseTimeReward,
      customerSatisfaction,
      resourceEfficiency,
      totalReward,
    };
  }

  /**
   * Update Q-table using Q-learning algorithm
   */
  private async updateQTable(
    state: RLState,
    action: RLAction,
    reward: RLReward,
    nextState: RLState
  ): Promise<void> {
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
      this.learningRate * (reward.totalReward + this.discountFactor * maxNextQ - currentQ);

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
   * Select best action for state using epsilon-greedy policy
   */
  selectAction(state: RLState, availableActions: RLAction[]): RLAction {
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
   * Get best action for state based on Q-table
   */
  private getBestAction(state: RLState, availableActions: RLAction[]): RLAction {
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
   * Convert state to string key
   */
  private stateToKey(state: RLState): string {
    // Discretize continuous values for Q-table
    const discretize = (value: number, bins: number = 10): number => {
      return Math.floor(value * bins) / bins;
    };

    return JSON.stringify({
      agentLoad: discretize(state.agentLoad, 2),
      taskPriority: discretize(state.taskPriority, 4),
      customerSentiment: discretize((state.customerSentiment + 1) / 2, 3),
      timeOfDay: Math.floor(state.timeOfDay / 6), // 4 time blocks
      taskComplexity: discretize(state.taskComplexity, 3),
      agentExperience: discretize(state.agentExperience, 5),
    });
  }

  /**
   * Convert action to string key
   */
  private actionToKey(action: RLAction): string {
    return `${action.type}_${action.targetAgent || 'none'}`;
  }

  /**
   * Update agent's RL model
   */
  private updateAgentModel(agent: WorkforceAgent, episode: TrainingEpisode): void {
    agent.rlModel.rewardHistory.push(episode.reward.totalReward);
    agent.rlModel.episodeCount++;

    // Update learning progress
    const recentRewards = agent.rlModel.rewardHistory.slice(-100);
    const averageReward = recentRewards.reduce((sum, r) => sum + r, 0) / recentRewards.length;
    agent.performance.learningProgress = Math.max(0, Math.min(1, (averageReward + 1) / 2));
  }

  /**
   * Extract sentiment from task
   */
  private extractSentiment(task: CommunicationTask): number {
    if (task.result?.sentiment) {
      const sentimentMap: Record<string, number> = {
        very_positive: 1.0,
        positive: 0.5,
        neutral: 0.0,
        negative: -0.5,
        very_negative: -1.0,
      };
      return sentimentMap[task.result.sentiment] || 0.0;
    }
    return 0.0;
  }

  /**
   * Calculate task complexity
   */
  private calculateTaskComplexity(task: CommunicationTask): number {
    let complexity = 0.5; // base complexity

    // Increase complexity based on factors
    if (task.priority === 'critical') complexity += 0.2;
    if (task.context?.conversationHistory && task.context.conversationHistory.length > 5) {
      complexity += 0.2;
    }
    if (task.type === 'inbound_call' || task.type === 'webhook') complexity += 0.1;

    return Math.min(1.0, complexity);
  }

  /**
   * Calculate resource efficiency
   */
  private calculateResourceEfficiency(task: CommunicationTask): number {
    // Lower duration = higher efficiency
    const maxDuration = 600000; // 10 minutes
    const duration = task.duration || maxDuration;
    return Math.max(0, 1 - duration / maxDuration);
  }

  /**
   * Get learning metrics
   */
  getLearningMetrics(): LearningMetrics {
    const totalEpisodes = this.episodes.length;

    if (totalEpisodes === 0) {
      return {
        totalEpisodes: 0,
        averageReward: 0,
        rewardTrend: [],
        convergenceRate: 0,
        explorationRate: this.explorationRate,
        optimalPolicyAccuracy: 0,
      };
    }

    // Calculate average reward
    const averageReward =
      this.episodes.reduce((sum, ep) => sum + ep.reward.totalReward, 0) / totalEpisodes;

    // Calculate reward trend (last 100 episodes)
    const recentEpisodes = this.episodes.slice(-100);
    const rewardTrend = recentEpisodes.map(ep => ep.reward.totalReward);

    // Calculate convergence rate (improvement over time)
    const firstHalf = this.episodes.slice(0, Math.floor(totalEpisodes / 2));
    const secondHalf = this.episodes.slice(Math.floor(totalEpisodes / 2));

    const firstHalfAvg =
      firstHalf.reduce((sum, ep) => sum + ep.reward.totalReward, 0) / firstHalf.length;
    const secondHalfAvg =
      secondHalf.reduce((sum, ep) => sum + ep.reward.totalReward, 0) / secondHalf.length;

    const convergenceRate = secondHalfAvg - firstHalfAvg;

    // Estimate optimal policy accuracy
    const optimalPolicyAccuracy = Math.min(1.0, averageReward);

    return {
      totalEpisodes,
      averageReward,
      rewardTrend,
      convergenceRate,
      explorationRate: this.explorationRate,
      optimalPolicyAccuracy,
    };
  }

  /**
   * Get training episodes
   */
  getEpisodes(limit: number = 100): TrainingEpisode[] {
    return this.episodes.slice(-limit);
  }

  /**
   * Export Q-table for analysis
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

  /**
   * Optimize workforce based on learning
   */
  async optimizeWorkforce(agents: WorkforceAgent[]): Promise<{
    recommendations: string[];
    improvements: any[];
  }> {
    const recommendations: string[] = [];
    const improvements: any[] = [];

    // Analyze agent performance
    for (const agent of agents) {
      const recentRewards = agent.rlModel.rewardHistory.slice(-50);
      const avgReward = recentRewards.reduce((sum, r) => sum + r, 0) / recentRewards.length;

      if (avgReward < 0.5) {
        recommendations.push(
          `Agent ${agent.name} needs additional training (avg reward: ${avgReward.toFixed(2)})`
        );
        improvements.push({
          agentId: agent.id,
          action: 'additional_training',
          reason: 'low_performance',
        });
      }

      if (agent.performance.successRate < 0.8) {
        recommendations.push(
          `Agent ${agent.name} has low success rate: ${(agent.performance.successRate * 100).toFixed(1)}%`
        );
        improvements.push({
          agentId: agent.id,
          action: 'performance_review',
          reason: 'low_success_rate',
        });
      }
    }

    // Analyze overall system performance
    const metrics = this.getLearningMetrics();

    if (metrics.convergenceRate < 0) {
      recommendations.push('System performance is declining, consider retraining');
    }

    if (metrics.explorationRate < 0.05) {
      recommendations.push('Exploration rate is very low, system may be stuck in local optimum');
    }

    return { recommendations, improvements };
  }
}

// Export singleton instance
export const reinforcementLearningSystem = new ReinforcementLearningSystem();
export type { RLState, RLAction, RLReward, TrainingEpisode, LearningMetrics };
