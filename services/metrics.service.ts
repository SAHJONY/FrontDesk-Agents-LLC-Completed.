// services/metrics.service.ts - Añadir métrica de automatización
// ... (Mantener todas las interfaces y funciones anteriores) ...

// Actualizar OperationalMetrics para incluir la nueva métrica
export interface OperationalMetrics {
    calls: MetricData;
    conversion: MetricData;
    satisfaction: MetricData;
    error: MetricData;
    // NUEVA MÉTRICA: Eficiencia de la Automatización
    automationSuccess: MetricData; 
}

// Actualizar la función fetchOperationalMetrics
export const fetchOperationalMetrics = (): Promise<OperationalMetrics> => {
    // --- Datos de Simulación Premium ---
    const simulatedData: OperationalMetrics = {
        // ... (Métricas anteriores: calls, conversion, satisfaction, error) ...
        calls: { value: "2,560", trend: 12.5, unit: "%", direction: 'up', },
        conversion: { value: "18.1%", trend: 2.1, unit: "%", direction: 'up', },
        satisfaction: { value: "97%", trend: -0.1, unit: "%", direction: 'down', },
        error: { value: "0.5%", trend: -0.2, unit: "%", direction: 'up', },
        
        // NUEVA DATA: Métrica que el cliente premium valora
        automationSuccess: { 
            value: "85%", 
            trend: 1.5, 
            unit: "%", 
            direction: 'up',
        }, 
    };
    // ... (Resto de la función)
};
