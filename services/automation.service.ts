// services/automation.service.ts

export interface AutomationConfig {
    isBookingEnabled: boolean; // ¿El sistema puede reservar citas?
    bookingCrm: 'hubspot' | 'salesforce' | 'none'; // CRM conectado
    defaultAgentScriptId: string; // ID del script usado para las llamadas
    callRoutingFallback: 'voicemail' | 'human_agent'; // Qué hacer si el LLM falla
}

/**
 * Simula la carga de la configuración de automatización del Tenant.
 * En producción, esto sería una llamada a la DB/API del Tenant.
 */
export const fetchAutomationConfig = (): Promise<AutomationConfig> => {
    // Simulación de una configuración ya activa para el demo
    const config: AutomationConfig = {
        isBookingEnabled: true,
        bookingCrm: 'hubspot',
        defaultAgentScriptId: 'SCRIPT-001-Q4',
        callRoutingFallback: 'human_agent',
    };

    return new Promise(resolve => {
        setTimeout(() => resolve(config), 500); 
    });
};

/**
 * Simula la actualización de la configuración.
 */
export const updateAutomationConfig = (config: AutomationConfig): Promise<boolean> => {
    // Lógica para simular una actualización exitosa
    console.log("Simulando actualización de configuración:", config);
    return new Promise(resolve => {
        setTimeout(() => resolve(true), 300); // Retorna true al éxito
    });
};
