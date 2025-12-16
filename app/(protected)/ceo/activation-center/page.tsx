// app/(protected)/ceo/activation-center/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch'; // Componente Shadcn Switch
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, Zap, Mail, Phone, Settings } from 'lucide-react'; // Iconos

// Define la interfaz de los datos de la DB
interface SystemActivation {
    system_key: string;
    enabled: boolean;
    activated_by: string;
    activated_at: string; // ISO string
    last_updated: string | null;
}

// Mapa de íconos y nombres amigables
const SystemMap = {
    'bland_ai': { name: 'Bland.ai API (Raw)', icon: Phone, description: 'Acceso directo a la API de voz. Crucial para facturación.' },
    'email': { name: 'Email Outbound (SMTP)', icon: Mail, description: 'Permite el envío de correos (ej. Twilio SendGrid). Desactiva alertas y respuestas.' },
    'voice_ai': { name: 'Voice AI Automations', icon: Zap, description: 'Habilita la lógica de negocio completa de los agentes de voz.' },
    'automations': { name: 'Global Automation Engine', icon: Settings, description: 'Controla todos los flujos de trabajo programados o basados en eventos.' },
};

export default function CEOActivationCenter() {
    const [activations, setActivations] = useState<SystemActivation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchActivations = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/ceo/activation');
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to fetch matrix.');
            }
            const data = await response.json();
            setActivations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActivations();
    }, []);

    const handleToggle = async (system_key: string, enabled: boolean) => {
        // Optimistic UI update
        const originalActivations = activations;
        setActivations(prev => prev.map(a => a.system_key === system_key ? { ...a, enabled: enabled } : a));

        if (!window.confirm(`¿Está SEGURO de ${enabled ? 'ACTIVAR' : 'DESACTIVAR'} el sistema ${system_key}? Esto tiene implicaciones de COSTO/DISPONIBILIDAD.`)) {
             setActivations(originalActivations); // Revertir si se cancela
             return;
        }

        try {
            const response = await fetch('/api/ceo/activation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ system_key, enabled }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || `Failed to update ${system_key}.`);
            }
            fetchActivations(); // Refrescar para obtener el timestamp y activated_by actualizados
        } catch (err) {
            setError(err.message);
            setActivations(originalActivations); // Revertir en caso de fallo real
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500"><Loader2 className="animate-spin inline mr-2" /> Loading Activation Matrix...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600 border border-red-300 rounded-md">Error: {error}</div>;
    }

    return (
        <div className="space-y-6 p-8">
            <h1 className="text-3xl font-bold">CEO System Activation Center</h1>
            <p className="text-gray-500">Control maestro para activar/desactivar todos los sistemas de terceros y subsistemas de la aplicación. **El estado aquí anula toda la funcionalidad.**</p>
            
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activations.map((activation) => {
                    const config = SystemMap[activation.system_key] || { name: activation.system_key, icon: Settings, description: 'Sistema no mapeado.' };
                    const Icon = config.icon;

                    return (
                        <Card key={activation.system_key} className={activation.enabled ? "border-green-500 shadow-lg" : "border-red-500"}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Icon className={`w-6 h-6 ${activation.enabled ? 'text-green-600' : 'text-red-600'}`} />
                                        <CardTitle>{config.name}</CardTitle>
                                    </div>
                                    <Switch
                                        checked={activation.enabled}
                                        onCheckedChange={(checked) => handleToggle(activation.system_key, checked)}
                                        className={activation.enabled ? 'data-[state=checked]:bg-green-600' : 'data-[state=unchecked]:bg-gray-400'}
                                        disabled={isLoading}
                                    />
                                </div>
                                <CardDescription className="pt-2">{config.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-700">
                                <p>Estado: <span className={`font-semibold ${activation.enabled ? 'text-green-600' : 'text-red-600'}`}>{activation.enabled ? 'ACTIVADO' : 'DESACTIVADO'}</span></p>
                                <p>Último cambio por: <span className="font-medium">{activation.activated_by}</span></p>
                                <p>Fecha de cambio: {new Date(activation.last_updated || activation.activated_at).toLocaleString()}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
