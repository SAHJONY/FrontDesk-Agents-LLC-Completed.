// ./app/admin/compliance-center/page.tsx
'use client';

import { Sidebar } from '@/components/Layout/Sidebar'; // <-- Importación con LLAVES
import { Table, Trash2, Download, CheckCircle } from 'lucide-react';

const complianceLogs = [
    // ... (datos de ejemplo de logs)
];

export default function ComplianceCenterPage() {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Compliance & Registros</h1>
                    <p className="text-gray-600">Gestión de la trazabilidad y la seguridad de datos del agente AI.</p>
                </header>
                
                {/* ... (Contenido de la página) */}
            </main>
        </div>
    );
}
