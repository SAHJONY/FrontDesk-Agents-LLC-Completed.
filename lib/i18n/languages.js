// lib/i18n/languages.js

/**
 * Mock de un sistema centralizado de traducción (i18n) para FrontDesk Agents.
 * En producción, esto se gestionaría a través de un servicio de traducción externo.
 */

export const translations = {
    // English (Default)
    en: {
        app_name: "FrontDesk Agents",
        welcome_message: "Operational Overview",
        subtitle: "Real-time system health and performance monitoring",
        status_operational: "All Systems Operational",
        last_update: "Last Updated",
        kpi_revenue: "Monthly Revenue",
        kpi_calls: "Active Calls",
        kpi_accuracy: "AI Accuracy",
        kpi_response: "Response Time",
        mgmt_centers: "Management Centers",
        system_health: "System Health",
        activity_stream: "Live Activity Stream",
        view_all: "View All",
        configure_now: "Configure Now",
        currency_context: "this month",
    },
    
    // Spanish (Target: MX)
    es: {
        app_name: "FrontDesk Agents",
        welcome_message: "Vista Operacional",
        subtitle: "Monitoreo en tiempo real de la salud y rendimiento del sistema",
        status_operational: "Todos los Sistemas Operativos",
        last_update: "Última Actualización",
        kpi_revenue: "Ingresos Mensuales",
        kpi_calls: "Llamadas Activas",
        kpi_accuracy: "Precisión de la IA",
        kpi_response: "Tiempo de Respuesta",
        mgmt_centers: "Centros de Gestión",
        system_health: "Salud del Sistema",
        activity_stream: "Flujo de Actividad en Vivo",
        view_all: "Ver Todo",
        configure_now: "Configurar Ahora",
        currency_context: "este mes",
    },
};

/**
 * Función central para obtener la cadena traducida.
 * @param {string} key - La clave de la cadena a traducir (e.g., 'welcome_message').
 * @param {string} lang - El idioma deseado ('en' o 'es').
 * @returns {string} La cadena traducida.
 */
export const getTranslation = (key, lang) => {
    return translations[lang] && translations[lang][key] ? translations[lang][key] : translations['en'][key];
};

