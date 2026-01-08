/**
 * Auto-Scaling Infrastructure System
 * Handle millions of concurrent calls with intelligent load balancing
 */

import { supabase } from '@/lib/supabase/client';

export interface ScalingConfig {
  minInstances: number;
  maxInstances: number;
  targetCPU: number;
  targetMemory: number;
  scaleUpThreshold: number;
  scaleDownThreshold: number;
  cooldownPeriod: number;
}

export interface Instance {
  id: string;
  type: string;
  status: 'starting' | 'running' | 'stopping' | 'stopped';
  cpu: number;
  memory: number;
  activeConnections: number;
  startedAt: Date;
  region: string;
  health: 'healthy' | 'unhealthy';
}

export interface LoadBalancerConfig {
  algorithm: 'round-robin' | 'least-connections' | 'weighted' | 'ip-hash';
  healthCheckInterval: number;
  healthCheckTimeout: number;
  sessionAffinity: boolean;
}

export interface ScalingEvent {
  id: string;
  type: 'scale-up' | 'scale-down';
  reason: string;
  instancesBefore: number;
  instancesAfter: number;
  timestamp: Date;
  duration: number;
}

export class AutoScalingSystem {
  private instances: Map<string, Instance> = new Map();
  private config: ScalingConfig;
  private loadBalancerConfig: LoadBalancerConfig;
  private scalingEvents: ScalingEvent[] = [];
  private lastScalingAction: Date = new Date();

  constructor() {
    this.config = {
      minInstances: 2,
      maxInstances: 100,
      targetCPU: 70,
      targetMemory: 75,
      scaleUpThreshold: 80,
      scaleDownThreshold: 30,
      cooldownPeriod: 300000, // 5 minutes
    };

    this.loadBalancerConfig = {
      algorithm: 'least-connections',
      healthCheckInterval: 30000,
      healthCheckTimeout: 5000,
      sessionAffinity: true,
    };

    this.initialize();
  }

  /**
   * Initialize auto-scaling system
   */
  private async initialize() {
    // Start with minimum instances
    for (let i = 0; i < this.config.minInstances; i++) {
      await this.startInstance(`us-east-1`);
    }

    // Start monitoring
    this.startMonitoring();
  }

  /**
   * Start monitoring and auto-scaling
   */
  private startMonitoring() {
    // Check scaling needs every 30 seconds
    setInterval(() => this.checkScalingNeeds(), 30000);

    // Health check every 30 seconds
    setInterval(() => this.performHealthChecks(), 30000);

    // Clean up stopped instances every 5 minutes
    setInterval(() => this.cleanupInstances(), 300000);
  }

  /**
   * Check if scaling is needed
   */
  private async checkScalingNeeds() {
    const metrics = await this.getAggregatedMetrics();
    const now = new Date();
    const timeSinceLastScaling = now.getTime() - this.lastScalingAction.getTime();

    // Respect cooldown period
    if (timeSinceLastScaling < this.config.cooldownPeriod) {
      return;
    }

    const runningInstances = Array.from(this.instances.values()).filter(
      i => i.status === 'running'
    );

    // Check if we need to scale up
    if (
      metrics.avgCPU > this.config.scaleUpThreshold ||
      metrics.avgMemory > this.config.scaleUpThreshold ||
      metrics.totalConnections / runningInstances.length > 1000
    ) {
      await this.scaleUp(
        `High resource usage: CPU ${metrics.avgCPU}%, Memory ${metrics.avgMemory}%`
      );
    }

    // Check if we can scale down
    else if (
      metrics.avgCPU < this.config.scaleDownThreshold &&
      metrics.avgMemory < this.config.scaleDownThreshold &&
      runningInstances.length > this.config.minInstances
    ) {
      await this.scaleDown(
        `Low resource usage: CPU ${metrics.avgCPU}%, Memory ${metrics.avgMemory}%`
      );
    }
  }

  /**
   * Get aggregated metrics across all instances
   */
  private async getAggregatedMetrics(): Promise<{
    avgCPU: number;
    avgMemory: number;
    totalConnections: number;
    healthyInstances: number;
  }> {
    const runningInstances = Array.from(this.instances.values()).filter(
      i => i.status === 'running'
    );

    if (runningInstances.length === 0) {
      return { avgCPU: 0, avgMemory: 0, totalConnections: 0, healthyInstances: 0 };
    }

    const totalCPU = runningInstances.reduce((sum, i) => sum + i.cpu, 0);
    const totalMemory = runningInstances.reduce((sum, i) => sum + i.memory, 0);
    const totalConnections = runningInstances.reduce((sum, i) => sum + i.activeConnections, 0);
    const healthyInstances = runningInstances.filter(i => i.health === 'healthy').length;

    return {
      avgCPU: totalCPU / runningInstances.length,
      avgMemory: totalMemory / runningInstances.length,
      totalConnections,
      healthyInstances,
    };
  }

  /**
   * Scale up by adding instances
   */
  private async scaleUp(reason: string) {
    const startTime = Date.now();
    const runningInstances = Array.from(this.instances.values()).filter(
      i => i.status === 'running'
    ).length;

    // Calculate how many instances to add
    const instancesToAdd = Math.min(
      Math.ceil(runningInstances * 0.5), // Add 50% more
      this.config.maxInstances - runningInstances
    );

    if (instancesToAdd === 0) {
      console.log('Already at max instances');
      return;
    }

    console.log(`Scaling up: Adding ${instancesToAdd} instances. Reason: ${reason}`);

    // Start new instances
    const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'];
    for (let i = 0; i < instancesToAdd; i++) {
      const region = regions[i % regions.length];
      await this.startInstance(region);
    }

    // Record scaling event
    const event: ScalingEvent = {
      id: `scale_${Date.now()}`,
      type: 'scale-up',
      reason,
      instancesBefore: runningInstances,
      instancesAfter: runningInstances + instancesToAdd,
      timestamp: new Date(),
      duration: Date.now() - startTime,
    };

    this.scalingEvents.push(event);
    this.lastScalingAction = new Date();

    await this.logScalingEvent(event);
  }

  /**
   * Scale down by removing instances
   */
  private async scaleDown(reason: string) {
    const startTime = Date.now();
    const runningInstances = Array.from(this.instances.values()).filter(
      i => i.status === 'running'
    );

    // Calculate how many instances to remove
    const instancesToRemove = Math.min(
      Math.floor(runningInstances.length * 0.25), // Remove 25%
      runningInstances.length - this.config.minInstances
    );

    if (instancesToRemove === 0) {
      return;
    }

    console.log(`Scaling down: Removing ${instancesToRemove} instances. Reason: ${reason}`);

    // Sort instances by active connections (remove least busy first)
    const sortedInstances = runningInstances.sort(
      (a, b) => a.activeConnections - b.activeConnections
    );

    // Stop instances
    for (let i = 0; i < instancesToRemove; i++) {
      await this.stopInstance(sortedInstances[i].id);
    }

    // Record scaling event
    const event: ScalingEvent = {
      id: `scale_${Date.now()}`,
      type: 'scale-down',
      reason,
      instancesBefore: runningInstances.length,
      instancesAfter: runningInstances.length - instancesToRemove,
      timestamp: new Date(),
      duration: Date.now() - startTime,
    };

    this.scalingEvents.push(event);
    this.lastScalingAction = new Date();

    await this.logScalingEvent(event);
  }

  /**
   * Start a new instance
   */
  private async startInstance(region: string): Promise<Instance> {
    const instance: Instance = {
      id: `inst_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'voice-agent',
      status: 'starting',
      cpu: 0,
      memory: 0,
      activeConnections: 0,
      startedAt: new Date(),
      region,
      health: 'healthy',
    };

    this.instances.set(instance.id, instance);

    // Simulate instance startup (in production, this would provision actual infrastructure)
    setTimeout(() => {
      instance.status = 'running';
      this.instances.set(instance.id, instance);
      console.log(`Instance ${instance.id} started in ${region}`);
    }, 5000);

    return instance;
  }

  /**
   * Stop an instance
   */
  private async stopInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) return;

    instance.status = 'stopping';
    this.instances.set(instanceId, instance);

    // Gracefully drain connections
    await this.drainConnections(instanceId);

    // Stop instance
    setTimeout(() => {
      instance.status = 'stopped';
      this.instances.set(instanceId, instance);
      console.log(`Instance ${instanceId} stopped`);
    }, 10000);
  }

  /**
   * Drain connections from an instance
   */
  private async drainConnections(instanceId: string): Promise<void> {
    // Implement connection draining logic
    // Redirect new connections to other instances
    // Wait for existing connections to complete
    console.log(`Draining connections from instance ${instanceId}`);
  }

  /**
   * Perform health checks on all instances
   */
  private async performHealthChecks() {
    for (const [id, instance] of this.instances) {
      if (instance.status === 'running') {
        const isHealthy = await this.checkInstanceHealth(instance);
        instance.health = isHealthy ? 'healthy' : 'unhealthy';
        this.instances.set(id, instance);

        if (!isHealthy) {
          console.log(`Instance ${id} is unhealthy, replacing...`);
          await this.replaceInstance(id);
        }
      }
    }
  }

  /**
   * Check health of a single instance
   */
  private async checkInstanceHealth(instance: Instance): Promise<boolean> {
    try {
      // Simulate health check (in production, this would ping the actual instance)
      const isHealthy = Math.random() > 0.05; // 95% success rate
      return isHealthy;
    } catch (error) {
      return false;
    }
  }

  /**
   * Replace an unhealthy instance
   */
  private async replaceInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) return;

    // Start a new instance in the same region
    await this.startInstance(instance.region);

    // Stop the unhealthy instance
    await this.stopInstance(instanceId);
  }

  /**
   * Clean up stopped instances
   */
  private cleanupInstances() {
    for (const [id, instance] of this.instances) {
      if (instance.status === 'stopped') {
        const age = Date.now() - instance.startedAt.getTime();
        if (age > 3600000) { // 1 hour
          this.instances.delete(id);
          console.log(`Cleaned up instance ${id}`);
        }
      }
    }
  }

  /**
   * Route request to best available instance
   */
  async routeRequest(): Promise<Instance | null> {
    const healthyInstances = Array.from(this.instances.values()).filter(
      i => i.status === 'running' && i.health === 'healthy'
    );

    if (healthyInstances.length === 0) {
      return null;
    }

    // Route based on load balancer algorithm
    switch (this.loadBalancerConfig.algorithm) {
      case 'least-connections':
        return this.routeLeastConnections(healthyInstances);
      case 'round-robin':
        return this.routeRoundRobin(healthyInstances);
      case 'weighted':
        return this.routeWeighted(healthyInstances);
      default:
        return healthyInstances[0];
    }
  }

  /**
   * Route to instance with least connections
   */
  private routeLeastConnections(instances: Instance[]): Instance {
    return instances.reduce((min, instance) =>
      instance.activeConnections < min.activeConnections ? instance : min
    );
  }

  /**
   * Route using round-robin
   */
  private routeRoundRobin(instances: Instance[]): Instance {
    // Simple round-robin implementation
    const index = Date.now() % instances.length;
    return instances[index];
  }

  /**
   * Route using weighted algorithm
   */
  private routeWeighted(instances: Instance[]): Instance {
    // Weight based on available capacity
    const weights = instances.map(i => {
      const cpuWeight = (100 - i.cpu) / 100;
      const memoryWeight = (100 - i.memory) / 100;
      const connectionWeight = Math.max(0, 1 - i.activeConnections / 1000);
      return cpuWeight * memoryWeight * connectionWeight;
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < instances.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return instances[i];
      }
    }

    return instances[0];
  }

  /**
   * Log scaling event
   */
  private async logScalingEvent(event: ScalingEvent) {
    await supabase.from('scaling_events').insert({
      id: event.id,
      type: event.type,
      reason: event.reason,
      instances_before: event.instancesBefore,
      instances_after: event.instancesAfter,
      timestamp: event.timestamp.toISOString(),
      duration: event.duration,
    });
  }

  /**
   * Get current scaling status
   */
  getStatus(): {
    totalInstances: number;
    runningInstances: number;
    healthyInstances: number;
    totalConnections: number;
    avgCPU: number;
    avgMemory: number;
    recentEvents: ScalingEvent[];
  } {
    const allInstances = Array.from(this.instances.values());
    const runningInstances = allInstances.filter(i => i.status === 'running');
    const healthyInstances = runningInstances.filter(i => i.health === 'healthy');

    const totalConnections = runningInstances.reduce((sum, i) => sum + i.activeConnections, 0);
    const avgCPU = runningInstances.length > 0
      ? runningInstances.reduce((sum, i) => sum + i.cpu, 0) / runningInstances.length
      : 0;
    const avgMemory = runningInstances.length > 0
      ? runningInstances.reduce((sum, i) => sum + i.memory, 0) / runningInstances.length
      : 0;

    return {
      totalInstances: allInstances.length,
      runningInstances: runningInstances.length,
      healthyInstances: healthyInstances.length,
      totalConnections,
      avgCPU,
      avgMemory,
      recentEvents: this.scalingEvents.slice(-10),
    };
  }

  /**
   * Get all instances
   */
  getInstances(): Instance[] {
    return Array.from(this.instances.values());
  }

  /**
   * Update scaling configuration
   */
  updateConfig(config: Partial<ScalingConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Update load balancer configuration
   */
  updateLoadBalancerConfig(config: Partial<LoadBalancerConfig>) {
    this.loadBalancerConfig = { ...this.loadBalancerConfig, ...config };
  }

  /**
   * Get scaling history
   */
  async getScalingHistory(startDate: Date, endDate: Date): Promise<ScalingEvent[]> {
    const { data, error } = await supabase
      .from('scaling_events')
      .select('*')
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString())
      .order('timestamp', { ascending: false });

    if (error) throw error;

    return (data || []).map((row: any) => ({
      id: row.id,
      type: row.type,
      reason: row.reason,
      instancesBefore: row.instances_before,
      instancesAfter: row.instances_after,
      timestamp: new Date(row.timestamp),
      duration: row.duration,
    }));
  }

  /**
   * Manually trigger scaling
   */
  async manualScale(action: 'up' | 'down', count: number) {
    if (action === 'up') {
      for (let i = 0; i < count; i++) {
        await this.startInstance('us-east-1');
      }
    } else {
      const runningInstances = Array.from(this.instances.values())
        .filter(i => i.status === 'running')
        .sort((a, b) => a.activeConnections - b.activeConnections);

      for (let i = 0; i < Math.min(count, runningInstances.length - this.config.minInstances); i++) {
        await this.stopInstance(runningInstances[i].id);
      }
    }

    this.lastScalingAction = new Date();
  }
}

export const autoScalingSystem = new AutoScalingSystem();
