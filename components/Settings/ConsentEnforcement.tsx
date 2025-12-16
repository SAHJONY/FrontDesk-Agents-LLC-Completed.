// ./components/Settings/ConsentEnforcement.tsx
'use client';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch'; 

export default function ConsentEnforcement() {
    const [isEnabled, setIsEnabled] = useState(true);

    return (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div>
                <h4 className="font-semibold text-gray-900">Aplicación del Consentimiento de Voz (GDPR)</h4>
                <p className="text-sm text-gray-500">Obligar a todos los usuarios a aceptar los términos de la política de voz antes de la grabación.</p>
            </div>
            <Switch 
                checked={isEnabled} 
                onCheckedChange={setIsEnabled} 
            />
        </div>
    );
}
