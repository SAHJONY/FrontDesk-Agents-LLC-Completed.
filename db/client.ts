// db/client.ts

// ----------------------------------------------------
// 1. Tipos de Datos (Interface para la tabla integrations_control)
// ----------------------------------------------------

// Define la estructura exacta de la fila que consulta el backend
export interface IntegrationControl {
  id: string; // UUID
  provider: string; // 'bland_ai', 'twilio', etc.
  active: boolean; // El Flag/Gate ON/OFF del CEO
  mode: 'sandbox' | 'live'; // El modo de operación
  daily_limit: number; // Límite de facturación duro (minutos/unidades)
  metadata: {
    liveAgentId?: string; // Por ejemplo, el ID de agente de Bland.ai en Live
    sandboxAgentId?: string; // ID de agente de Bland.ai en Sandbox
    [key: string]: any; // Permite otros campos
  };
  activated_by: string;
  activated_at: Date;
}

// ----------------------------------------------------
// 2. Simulación de Cliente de DB (Adaptar a tu ORM: Prisma, Knex, etc.)
// ----------------------------------------------------

// En un entorno real, 'db' sería tu cliente inicializado (p. ej., new PrismaClient())

const mockDbState: IntegrationControl[] = [
    // Datos de ejemplo: Bland.ai está registrada, pero INACTIVA.
    {
        id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
        provider: 'bland_ai',
        active: false, // <-- CLAVE: Inactivo por defecto
        mode: 'sandbox',
        daily_limit: 100,
        metadata: {
            liveAgentId: 'ag_live_xyz789',
            sandboxAgentId: 'ag_sandbox_abc123'
        },
        activated_by: 'ceo@company.com',
        activated_at: new Date(),
    }
];

// Simulamos la consulta a la base de datos
export const db = {
    integrations_control: {
        findUnique: async ({ where }: { where: { provider: string } }): Promise<IntegrationControl | null> => {
            // Reemplazar con la lógica real de tu ORM/DB
            return mockDbState.find(i => i.provider === where.provider) || null;
        }
        // ... otras operaciones como update (para el CEO Dashboard)
    }
    // ... otros modelos
};
