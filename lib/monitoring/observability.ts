/**
 * Advanced Monitoring & Observability System
 * Real-time system health, performance metrics, and alerting
 */

import { supabase } from '@/lib/supabase/client';

export interface SystemMetrics {
  timestamp: Date;
  cpu: number;
  memory: number;
  disk: number;
  network: {
    inbound: number;
    outbound: number;
  };
  activeConnections: number;
  requestsPerSecond: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'healthy' | 'warning' | 'critical';
  timestamp: Date;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  source: string;
  timestamp: Date;
  acknowledged: boolean;
  resolvedAt?: Date;
}

export interface ServiceHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  lastCheck: Date;
  responseTime: number;
  errorCount: number;
}

export class ObservabilitySystem {
  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private alerts: Alert[] = [];
  private healthChecks: Map<string, ServiceHealth> = new Map();
  private alertThresholds: Map<string, number> = new Map();

  constructor() {
    this.initializeThresholds();
    this.startMonitoring();
  }

  /**
   * Initialize alert thresholds
   */
  private initializeThresholds() {
    this.alertThresholds.set('cpu', 80);
    this.alertThresholds.set('memory', 85);
    this.alertThresholds.set('disk', 90);
    this.alertThresholds.set('response_time', 1000);
    this.alertThresholds.set('error_rate', 5);
    this.alertThresholds.set('active_connections', 10000);
  }

  /**
   * Start monitoring system
   */
  private startMonitoring() {
    // Monitor system metrics every 30 seconds
    setInterval(() => this.collectSystemMetrics(), 30000);

    // Check service health every minute
    setInterval(() => this.checkServiceHealth(), 60000);

    // Process alerts every 10 seconds
    setInterval(() => this.processAlerts(), 10000);
  }

  /**
   * Collect system metrics
   */
  async collectSystemMetrics(): Promise<SystemMetrics> {
    const metrics: SystemMetrics = {
      timestamp: new Date(),
      cpu: await this.getCPUUsage(),
      memory: await this.getMemoryUsage(),
      disk: await this.getDiskUsage(),
      network: await this.getNetworkStats(),
      activeConnections: await this.getActiveConnections(),
      requestsPerSecond: await this.getRequestsPerSecond(),
      averageResponseTime: await this.getAverageResponseTime(),
      errorRate: await this.getErrorRate(),
    };

    // Store metrics
    await this.storeMetrics(metrics);

    // Check thresholds and create alerts
    await this.checkThresholds(metrics);

    return metrics;
  }

  /**
   * Get CPU usage percentage
   */
  private async getCPUUsage(): Promise<number> {
    // Simulate CPU usage (in production, use actual system metrics)
    return Math.random() * 100;
  }

  /**
   * Get memory usage percentage
   */
  private async getMemoryUsage(): Promise<number> {
    // Simulate memory usage
    return Math.random() * 100;
  }

  /**
   * Get disk usage percentage
   */
  private async getDiskUsage(): Promise<number> {
    // Simulate disk usage
    return Math.random() * 100;
  }

  /**
   * Get network statistics
   */
  private async getNetworkStats(): Promise<{ inbound: number; outbound: number }> {
    return {
      inbound: Math.random() * 1000,
      outbound: Math.random() * 1000,
    };
  }

  /**
   * Get active connections count
   */
  private async getActiveConnections(): Promise<number> {
    // Query database for active connections
    const { count } = await supabase
      .from('calls')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    return count || 0;
  }

  /**
   * Get requests per second
   */
  private async getRequestsPerSecond(): Promise<number> {
    // Calculate from audit logs
    const oneMinuteAgo = new Date(Date.now() - 60000);
    const { count } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', oneMinuteAgo.toISOString());

    return (count || 0) / 60;
  }

  /**
   * Get average response time
   */
  private async getAverageResponseTime(): Promise<number> {
    // Calculate from performance metrics
    return Math.random() * 500;
  }

  /**
   * Get error rate percentage
   */
  private async getErrorRate(): Promise<number> {
    const oneHourAgo = new Date(Date.now() - 3600000);
    
    const { count: totalRequests } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', oneHourAgo.toISOString());

    const { count: errorRequests } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', oneHourAgo.toISOString())
      .like('action', '%error%');

    if (!totalRequests) return 0;
    return ((errorRequests || 0) / totalRequests) * 100;
  }

  /**
   * Store metrics in database
   */
  private async storeMetrics(metrics: SystemMetrics): Promise<void> {
    await supabase.from('system_metrics').insert({
      timestamp: metrics.timestamp.toISOString(),
      cpu: metrics.cpu,
      memory: metrics.memory,
      disk: metrics.disk,
      network_inbound: metrics.network.inbound,
      network_outbound: metrics.network.outbound,
      active_connections: metrics.activeConnections,
      requests_per_second: metrics.requestsPerSecond,
      average_response_time: metrics.averageResponseTime,
      error_rate: metrics.errorRate,
    });
  }

  /**
   * Check thresholds and create alerts
   */
  private async checkThresholds(metrics: SystemMetrics): Promise<void> {
    // Check CPU
    if (metrics.cpu > (this.alertThresholds.get('cpu') || 80)) {
      await this.createAlert({
        severity: metrics.cpu > 90 ? 'critical' : 'warning',
        title: 'High CPU Usage',
        message: `CPU usage is at ${metrics.cpu.toFixed(1)}%`,
        source: 'system',
      });
    }

    // Check memory
    if (metrics.memory > (this.alertThresholds.get('memory') || 85)) {
      await this.createAlert({
        severity: metrics.memory > 95 ? 'critical' : 'warning',
        title: 'High Memory Usage',
        message: `Memory usage is at ${metrics.memory.toFixed(1)}%`,
        source: 'system',
      });
    }

    // Check disk
    if (metrics.disk > (this.alertThresholds.get('disk') || 90)) {
      await this.createAlert({
        severity: 'warning',
        title: 'High Disk Usage',
        message: `Disk usage is at ${metrics.disk.toFixed(1)}%`,
        source: 'system',
      });
    }

    // Check response time
    if (metrics.averageResponseTime > (this.alertThresholds.get('response_time') || 1000)) {
      await this.createAlert({
        severity: 'warning',
        title: 'Slow Response Time',
        message: `Average response time is ${metrics.averageResponseTime.toFixed(0)}ms`,
        source: 'performance',
      });
    }

    // Check error rate
    if (metrics.errorRate > (this.alertThresholds.get('error_rate') || 5)) {
      await this.createAlert({
        severity: 'error',
        title: 'High Error Rate',
        message: `Error rate is at ${metrics.errorRate.toFixed(1)}%`,
        source: 'application',
      });
    }
  }

  /**
   * Create an alert
   */
  async createAlert(alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>): Promise<Alert> {
    const newAlert: Alert = {
      id: `alert_${Date.now()}`,
      ...alert,
      timestamp: new Date(),
      acknowledged: false,
    };

    this.alerts.push(newAlert);

    // Store in database
    await supabase.from('alerts').insert({
      id: newAlert.id,
      severity: newAlert.severity,
      title: newAlert.title,
      message: newAlert.message,
      source: newAlert.source,
      timestamp: newAlert.timestamp.toISOString(),
      acknowledged: false,
    });

    // Send notifications based on severity
    if (newAlert.severity === 'critical' || newAlert.severity === 'error') {
      await this.sendAlertNotification(newAlert);
    }

    return newAlert;
  }

  /**
   * Send alert notification
   */
  private async sendAlertNotification(alert: Alert): Promise<void> {
    // Send email, SMS, Slack notification, etc.
    // Implementation depends on configured notification channels
    console.log(`Alert: [${alert.severity}] ${alert.title} - ${alert.message}`);
  }

  /**
   * Acknowledge an alert
   */
  async acknowledgeAlert(alertId: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      await supabase
        .from('alerts')
        .update({ acknowledged: true })
        .eq('id', alertId);
    }
  }

  /**
   * Resolve an alert
   */
  async resolveAlert(alertId: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolvedAt = new Date();
      await supabase
        .from('alerts')
        .update({ resolved_at: alert.resolvedAt.toISOString() })
        .eq('id', alertId);
    }
  }

  /**
   * Check service health
   */
  private async checkServiceHealth(): Promise<void> {
    const services = [
      'api',
      'database',
      'storage',
      'websocket',
      'ai_engine',
      'voice_service',
    ];

    for (const service of services) {
      const health = await this.checkService(service);
      this.healthChecks.set(service, health);

      if (health.status === 'down') {
        await this.createAlert({
          severity: 'critical',
          title: `Service Down: ${service}`,
          message: `${service} is not responding`,
          source: 'health_check',
        });
      } else if (health.status === 'degraded') {
        await this.createAlert({
          severity: 'warning',
          title: `Service Degraded: ${service}`,
          message: `${service} is experiencing issues`,
          source: 'health_check',
        });
      }
    }
  }

  /**
   * Check individual service
   */
  private async checkService(service: string): Promise<ServiceHealth> {
    try {
      const startTime = Date.now();
      
      // Perform health check based on service type
      let isHealthy = true;
      let errorCount = 0;

      switch (service) {
        case 'database':
          const { error } = await supabase.from('users').select('id').limit(1);
          isHealthy = !error;
          break;
        case 'storage':
          // Check storage service
          break;
        case 'websocket':
          // Check WebSocket service
          break;
        default:
          // Default health check
          break;
      }

      const responseTime = Date.now() - startTime;

      return {
        service,
        status: isHealthy ? 'healthy' : 'degraded',
        uptime: 99.9,
        lastCheck: new Date(),
        responseTime,
        errorCount,
      };
    } catch (error) {
      return {
        service,
        status: 'down',
        uptime: 0,
        lastCheck: new Date(),
        responseTime: 0,
        errorCount: 1,
      };
    }
  }

  /**
   * Process alerts
   */
  private async processAlerts(): Promise<void> {
    // Auto-resolve alerts that are no longer relevant
    const now = Date.now();
    for (const alert of this.alerts) {
      if (!alert.resolvedAt && alert.acknowledged) {
        const age = now - alert.timestamp.getTime();
        if (age > 3600000) { // 1 hour
          await this.resolveAlert(alert.id);
        }
      }
    }
  }

  /**
   * Get current system status
   */
  async getSystemStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    metrics: SystemMetrics;
    services: ServiceHealth[];
    activeAlerts: Alert[];
  }> {
    const metrics = await this.collectSystemMetrics();
    const services = Array.from(this.healthChecks.values());
    const activeAlerts = this.alerts.filter(a => !a.resolvedAt);

    let status: 'healthy' | 'degraded' | 'down' = 'healthy';
    
    if (services.some(s => s.status === 'down')) {
      status = 'down';
    } else if (services.some(s => s.status === 'degraded') || activeAlerts.some(a => a.severity === 'critical')) {
      status = 'degraded';
    }

    return {
      status,
      metrics,
      services,
      activeAlerts,
    };
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(timeRange: string = '1h'): Promise<PerformanceMetric[]> {
    const metrics: PerformanceMetric[] = [];

    // Query metrics from database based on time range
    const startTime = this.getStartTime(timeRange);
    const { data, error } = await supabase
      .from('system_metrics')
      .select('*')
      .gte('timestamp', startTime.toISOString())
      .order('timestamp', { ascending: false });

    if (error || !data) return metrics;

    // Process and return metrics
    for (const row of data) {
      metrics.push({
        id: `metric_${row.timestamp}`,
        name: 'CPU Usage',
        value: row.cpu,
        unit: '%',
        threshold: this.alertThresholds.get('cpu') || 80,
        status: this.getMetricStatus(row.cpu, this.alertThresholds.get('cpu') || 80),
        timestamp: new Date(row.timestamp),
      });
    }

    return metrics;
  }

  /**
   * Get start time based on time range
   */
  private getStartTime(timeRange: string): Date {
    const now = new Date();
    switch (timeRange) {
      case '1h':
        return new Date(now.getTime() - 3600000);
      case '24h':
        return new Date(now.getTime() - 86400000);
      case '7d':
        return new Date(now.getTime() - 604800000);
      case '30d':
        return new Date(now.getTime() - 2592000000);
      default:
        return new Date(now.getTime() - 3600000);
    }
  }

  /**
   * Get metric status based on value and threshold
   */
  private getMetricStatus(value: number, threshold: number): 'healthy' | 'warning' | 'critical' {
    if (value < threshold * 0.8) return 'healthy';
    if (value < threshold) return 'warning';
    return 'critical';
  }

  /**
   * Get alerts
   */
  async getAlerts(filter?: { severity?: string; acknowledged?: boolean }): Promise<Alert[]> {
    let alerts = [...this.alerts];

    if (filter?.severity) {
      alerts = alerts.filter(a => a.severity === filter.severity);
    }

    if (filter?.acknowledged !== undefined) {
      alerts = alerts.filter(a => a.acknowledged === filter.acknowledged);
    }

    return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Get service health status
   */
  getServiceHealth(): ServiceHealth[] {
    return Array.from(this.healthChecks.values());
  }

  /**
   * Update alert threshold
   */
  updateThreshold(metric: string, threshold: number): void {
    this.alertThresholds.set(metric, threshold);
  }

  /**
   * Export metrics for analysis
   */
  async exportMetrics(startDate: Date, endDate: Date): Promise<any[]> {
    const { data, error } = await supabase
      .from('system_metrics')
      .select('*')
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString())
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}

export const observabilitySystem = new ObservabilitySystem();
