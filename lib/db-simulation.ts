// ./lib/db-simulation.ts (Fragmento de actualización)

interface ClientConfig {
  clientKey: string;
  email: string;
  plan: PlanTier;
  crmType: 'HubSpot' | 'Salesforce' | 'Custom API' | 'None';
  crmEndpoint?: string;
  
  // --- NUEVO CAMPO CRÍTICO DE CUMPLIMIENTO ---
  leadConsentType: 'ExplicitWritten' | 'Verbal' | 'NoConsentProvided'; 
}

// Actualizamos el cliente de ejemplo para simular un consentimiento:
let CLIENTS: ClientConfig[] = [
  { 
    clientKey: 'FDDG-SARAV1-93A2X-57B', 
    email: 'client@example.com', 
    plan: 'Premium', 
    crmType: 'HubSpot', 
    crmEndpoint: 'https://api.hubspot.com/...',
    leadConsentType: 'ExplicitWritten' // Asumimos el estándar más alto
  },
];

// ... (El resto de las estructuras y funciones de db se mantienen)
