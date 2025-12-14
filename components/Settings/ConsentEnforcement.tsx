// ./components/Settings/ConsentEnforcement.tsx (NUEVO COMPONENTE DE HARDENING)

'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
// Importamos la simulación de DB para actualizar el campo
import { db } from '@/lib/db-simulation'; 

const CLIENT_KEY = 'FDDG-SARAV1-93A2X-57B'; // Simulación de clave

const ConsentEnforcement: React.FC = () => {
  const [consent, setConsent] = useState('NoConsentProvided');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Cargar el estado actual del consentimiento al inicio
    const client = db.client.findUnique(CLIENT_KEY);
    if (client) setConsent(client.leadConsentType);
  }, []);

  const handleSave = () => {
    // Actualizar la simulación de DB
    db.client.update(CLIENT_KEY, { leadConsentType: consent as any });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const isCompliant = consent === 'ExplicitWritten';

  return (
    <div className="glass-card p-6 border-l-4" style={{ borderColor: isCompliant ? 'var(--color-green-light)' : 'var(--color-red-light)' }}>
      <h3 className="text-xl font-bold text-white flex items-center mb-4">
        <ShieldCheckIcon className="w-6 h-6 mr-2 text-[var(--color-gold)]" />
        TCPA & Consentimiento Legal
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Debe declarar cómo obtuvo el permiso para contactar a sus clientes por voz. Para campañas salientes, **Consentimiento Escrito Explícito** es altamente recomendado.
      </p>

      <select
        value={consent}
        onChange={(e) => setConsent(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-red-500 focus:border-red-500"
      >
        <option value="ExplicitWritten">1. Consentimiento Escrito Explícito (Requerido para la mayoría de las llamadas)</option>
        <option value="Verbal">2. Consentimiento Verbal (Bajo ciertas regulaciones)</option>
        <option value="NoConsentProvided">3. No Declarado / Riesgo Alto (Bloquea campañas salientes)</option>
      </select>
      
      <div className="mt-4 flex items-center justify-between">
        <div className={`text-sm flex items-center ${isCompliant ? 'text-green-400' : 'text-red-400'}`}>
            {isCompliant ? (
                <CheckIcon className="w-5 h-5 mr-1" />
            ) : (
                <ExclamationTriangleIcon className="w-5 h-5 mr-1" />
            )}
            Estado de Riesgo: **{isCompliant ? 'Bajo (TCPA OK)' : 'ALTO RIESGO LEGAL'}**
        </div>
        <button 
          onClick={handleSave} 
          className={`btn-primary py-2 px-6 ${isSaved ? 'bg-green-600' : ''}`}
        >
          {isSaved ? 'Guardado' : 'Guardar Configuración'}
        </button>
      </div>
    </div>
  );
};

export default ConsentEnforcement;
