import { MetricData } from '../types/metrics';

// Métricas operativas del dashboard premium
export interface OperationalMetrics {
  calls: MetricData;
  conversion: MetricData;
  satisfaction: MetricData;
  error: MetricData;

  // NUEVA MÉTRICA PREMIUM
  automationSuccess: MetricData;
}

// Simulación de datos (hasta conectar API real)
export const fetchOperationalMetrics = (): Promise<OperationalMetrics> => {
  const simulatedData: OperationalMetrics = {
    calls: {
      value: "2,560",
      trend: 12.5,
      unit: "%",
      direction: 'up',
    },
    conversion: {
      value: "18.1%",
      trend: 2.1,
      unit: "%",
      direction: 'up',
    },
    satisfaction: {
      value: "97%",
      trend: -0.1,
      unit: "%",
      direction: 'down',
    },
    error: {
      value: "0.5%",
      trend: -0.2,
      unit: "%",
      direction: 'up',
    },
    automationSuccess: {
      value: "85%",
      trend: 1.5,
      unit: "%",
      direction: 'up',
    },
  };

  return Promise.resolve(simulatedData);
};
