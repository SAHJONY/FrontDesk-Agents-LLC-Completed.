export type MetricDirection = 'up' | 'down' | 'neutral';

export interface MetricData {
  value: string;      // ← CLAVE: string
  trend: number;
  unit?: string;
  direction: MetricDirection;
}
