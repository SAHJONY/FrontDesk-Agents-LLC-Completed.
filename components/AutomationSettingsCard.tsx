// components/AutomationSettingsCard.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { fetchAutomationConfig, updateAutomationConfig, AutomationConfig } from '@/services/automation.service';
import { Switch } from '@headlessui/react'; // Requiere la librería @headlessui/react

// Helper para Tailwind
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const AutomationSettingsCard = () => {
    const [config, setConfig] = useState<AutomationConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchAutomationConfig().then(data => {
            setConfig(data);
            setIsLoading(false);
        });
    }, []);

    const handleToggleBooking = async () => {
        if (!config) return;

        const newConfig = { ...config, isBookingEnabled: !config.isBookingEnabled };
        setConfig(newConfig); // Optimistic UI update

        setIsSaving(true);
        try {
            await updateAutomationConfig(newConfig);
            // Mostrar una notificación de éxito aquí
            console.log("Configuración guardada con éxito.");
        } catch (error) {
            console.error("Error al guardar la configuración:", error);
            setConfig(config); // Revertir en caso de error
        } finally {
            setIsSaving(false);
        }
    };
    
    if (isLoading) {
        return <div className="p-6 bg-white rounded-xl shadow-lg animate-pulse h-40">Cargando Configuración...</div>;
    }

    if (!config) return null;

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Booking Automation
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                Permite a nuestro agente LLM reservar citas directamente en tu CRM (Actual: {config.bookingCrm}).
            </p>

            <div className="mt-6 flex items-center justify-between">
                <span className="flex-grow flex flex-col">
                    <span className="text-base font-medium text-gray-900">
                        {config.isBookingEnabled ? "Activado" : "Desactivado"}
                    </span>
                    <span className="text-sm text-gray-500">
                        {config.isBookingEnabled 
                            ? "El agente intentará reservar citas en cada llamada relevante." 
                            : "El agente solo toma mensajes y no usa la integración de booking."
                        }
                    </span>
                </span>
                <Switch
                    checked={config.isBookingEnabled}
                    onChange={handleToggleBooking}
                    disabled={isSaving}
                    className={classNames(
                        config.isBookingEnabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                    )}
                >
                    <span
                        aria-hidden="true"
                        className={classNames(
                            config.isBookingEnabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                    />
                </Switch>
            </div>
            {isSaving && <p className="mt-4 text-sm text-indigo-600">Guardando cambios...</p>}
        </div>
    );
};
