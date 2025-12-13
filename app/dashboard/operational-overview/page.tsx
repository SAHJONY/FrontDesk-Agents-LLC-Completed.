// app/dashboard/operational-overview/page.tsx

// ...
// Convertir el objeto de métricas en un array iterable para el renderizado
// ¡Añadimos 'automationSuccess' a la lista de claves!
const metricKeys = ['calls', 'conversion', 'satisfaction', 'error', 'automationSuccess'] as const;

// ...

// Dentro de la función 'OperationalOverview', modifica el renderizado:

    // ... (Mantener la lógica de manejo de errores, empty state y loading) ...

    return (
        <div className="space-y-6 p-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                <LanguageSelector /> 
            </header>

            {/* Mantenemos el mismo grid, ahora con 5 elementos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"> 
                {isLoading ? (
                    // El esqueleto se renderiza 5 veces
                    metricKeys.map(key => <MetricSkeleton key={key} />)
                ) : (
                    // Muestra las 5 métricas una vez cargadas
                    metrics && metricKeys.map((key) => {
                        const metric = metrics[key];
                        const label = getMetricLabel(t, key);
                        
                        return (
                            <div 
                                key={key} 
                                className={
                                    // Resaltamos la métrica de automatización con un color premium
                                    key === 'automationSuccess' 
                                        ? "bg-indigo-50 p-6 rounded-xl shadow-lg border-2 border-indigo-200"
                                        : "bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                                }
                            >
                                <p className="text-sm font-medium text-gray-500">{label}</p>
                                <div className="mt-1 flex justify-between items-center">
                                    <span className="text-4xl font-extrabold text-gray-900">
                                        {metric.value}
                                    </span>
                                    <TrendIcon 
                                        trend={metric.trend} 
                                        unit={metric.unit} 
                                        direction={metric.direction} 
                                    />
                                </div>
                                {key === 'automationSuccess' && (
                                    <p className="mt-2 text-xs text-indigo-700 font-semibold">
                                        Premium Feature ROI
                                    </p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
            
            {/* ... (Resto del componente para Charts - mantener) ... */}
        </div>
    );
}
