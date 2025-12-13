"use client";

import React from 'react';

// Define la estructura de las props que recibirá cada fila de tenant
interface Tenant {
    id: number;
    company: string;
    status: string;
    phase: string;
    tier: string;
}

interface TenantActionRowProps {
    tenant: Tenant;
    // Opcional: Si necesitaras un callback real para la acción
    // onForceComplete: (tenantId: number) => void; 
}

// Función auxiliar para determinar las clases CSS del estado
const getStatusClasses = (status: string) => {
    if (status.includes('Approved') || status.includes('Completed')) {
        return 'bg-green-100 text-green-800';
    }
    if (status.includes('Failed')) {
        return 'bg-red-100 text-red-800';
    }
    return 'bg-yellow-100 text-yellow-800';
};

export default function TenantActionRow({ tenant }: TenantActionRowProps) {
  
    // Esta función maneja el evento de click, por eso este componente es "use client"
    const handleForceComplete = () => {
        console.log(`[ACTION] Forcing completion for tenant: ${tenant.company} (ID: ${tenant.id})`);
        // Aquí iría la lógica real (ej: llamar a una API para actualizar el estado)
        // onForceComplete(tenant.id); 
    };

    return (
        <tr key={tenant.id} className="hover:bg-gray-700 transition duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{tenant.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-300">{tenant.company}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(tenant.status)}`}>
                    {tenant.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tenant.phase}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tenant.tier}</td>
            
            {/* Columna de Acción */}
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                {tenant.status === 'Completed Setup' ? (
                    <span className="text-green-500">Deployed</span>
                ) : (
                    <button 
                        className="text-sm font-medium text-red-500 hover:text-red-300 transition" 
                        onClick={handleForceComplete} // Lógica del lado del cliente
                    >
                        Force Complete →
                    </button>
                )}
            </td>
        </tr>
    );
}
