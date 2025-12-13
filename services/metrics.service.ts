// services/metrics.service.ts - ACTUALIZADO con Series de Tiempo

// ... (mantener MetricData, OperationalMetrics) ...

// NUEVA DEFINICIÓN: Estructura de datos para un punto en el tiempo
export interface TimeSeriesPoint {
    timeLabel: string; // Etiqueta del eje X (ej: 'Mon', '2025-11-20')
    callsHandled: number;
    bookingsMade: number;
    // Puedes añadir más métricas aquí si es necesario
}

/**
 * NUEVA FUNCIÓN: Simula la obtención de datos en series de tiempo para gráficos.
 */
export const fetchTimeSeriesMetrics = (): Promise<TimeSeriesPoint[]> => {
    // --- Datos de Simulación Premium para Gráficos (últimos 7 días) ---
    const simulatedTimeSeries: TimeSeriesPoint[] = [
        { timeLabel: 'Lun', callsHandled: 150, bookingsMade: 22 },
        { timeLabel: 'Mar', callsHandled: 185, bookingsMade: 30 },
        { timeLabel: 'Mié', callsHandled: 160, bookingsMade: 25 },
        { timeLabel: 'Jue', callsHandled: 210, bookingsMade: 35 },
        { timeLabel: 'Vie', callsHandled: 245, bookingsMade: 42 },
        { timeLabel: 'Sáb', callsHandled: 190, bookingsMade: 31 },
        { timeLabel: 'Dom', callsHandled: 140, bookingsMade: 20 },
    ];
    // ------------------------------------

    // Simula una latencia de red para demostrar la carga
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(simulatedTimeSeries);
        }, 1200); 
    });
};


// NOTA: Recuerda mantener la función fetchOperationalMetrics anterior
// junto con esta nueva función en el mismo archivo.
