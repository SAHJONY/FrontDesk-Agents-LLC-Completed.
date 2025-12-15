// ./components/Settings/ConsentEnforcement.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const ConsentEnforcement: React.FC = () => {
  // 1. STATE DEFINITIONS
  const [consent, setConsent] = useState<'NoConsentProvided' | 'Granted' | 'Revoked'>(
    'NoConsentProvided'
  );
  const [isSaved, setIsSaved] = useState(false);

  // 2. EFFECTS
  useEffect(() => {
    // Simulación de carga de consentimiento desde backend / audit log
    // En producción aquí leerías desde tu Immutable Audit Log
    setConsent('NoConsentProvided');
  }, []);

  // 3. HANDLERS
  const handleSave = () => {
    // Simulación de persistencia
    console.log('[ConsentEnforcement] Consent status saved:', consent);
    setIsSaved(true);

    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center mb-4">
        <ShieldCheckIcon className="w-6 h-6 text-[var(--color-gold)] mr-2" />
        <h3 className="text-lg font-semibold text-white">
          Consent Enforcement (TCPA / GDPR)
        </h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Define cómo el sistema debe actuar cuando no existe consentimiento explícito
        del cliente final.
      </p>

      <select
        value={consent}
        onChange={(e) => setConsent(e.target.value as any)}
        className="w-full rounded-md bg-[var(--color-navy-dark)] border border-gray-700 text-white p-2 mb-4"
      >
        <option value="NoConsentProvided">No consent provided</option>
        <option value="Granted">Consent granted</option>
        <option value="Revoked">Consent revoked</option>
      </select>

      <button
        onClick={handleSave}
        className="btn-premium w-full"
      >
        Save Consent Policy
      </button>

      {isSaved && (
        <p className="text-xs text-green-400 mt-3">
          Policy saved and enforced in real time.
        </p>
      )}
    </div>
  );
};

export default ConsentEnforcement;
