// services/metrics.service.ts

// Definición de tipos (Schema Real Simplificado)
export interface MetricData {
    value: string; // Valor principal (e.g., "1,200", "15.2%")
    trend: number; // Cambio en el último período (e.g., 5, -0.5)
    unit: string;  // Unidad del trend (e.g., "+", "%")
    direction: 'up' | 'down'; // Dirección del ícono de tendencia
}

export interface OperationalMetrics {
    calls: MetricData;
    conversion: MetricData;
    satisfaction: MetricData;
    error: MetricData;
}

/**
 * Simula la obtención de métricas operacionales desde un backend.
 * En producción, esta función usaría 'fetch' para acceder a /api/metrics.
 */
export const fetchOperationalMetrics = (): Promise<OperationalMetrics> => {
    // --- Datos de Simulación Premium ---
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
    };
    // ------------------------------------

    // Simula una latencia de red para demostrar los 'Loading Skeletons' (1 segundo)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(simulatedData);
        }, 1000); 
    });
};
