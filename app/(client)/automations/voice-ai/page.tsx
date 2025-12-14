// ./app/(client)/automations/voice-ai/page.tsx (Fragmento de actualización)

// ... imports existentes

import ConsentEnforcement from '@/components/Settings/ConsentEnforcement'; // <-- NUEVA IMPORTACIÓN

export default function VoiceAIConfigurationPage() {
  // ... (Estados y funciones existentes)

  return (
    <div className="p-8 md:p-12 w-full">
      {/* ... (Header y texto de la página) ... */}

      {/* --- INTEGRACIÓN CRÍTICA DE CUMPLIMIENTO --- */}
      <div className="mb-10">
          <ConsentEnforcement />
      </div>
      
      {/* --- 1. Deployment Script Section --- */}
      {/* ... (El resto del código de script y customización) ... */}
      
    </div>
  );
}
