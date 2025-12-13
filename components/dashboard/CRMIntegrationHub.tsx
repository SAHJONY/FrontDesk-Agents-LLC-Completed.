"use client";

import React, { useState } from 'react';
import { CloudArrowUpIcon, LinkIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// --- Tipos de Datos ---
interface Integration {
    id: number;
    name: string;
    type: string;
    status: 'Operational' | 'Conflict' | 'Auth Error';
    latency: number; // ms
}

interface DataConflict {
    id: number;
    timestamp: string;
    field: string;
    errorCode: string;
    severity: 'High' | 'Medium';
}

// --- Data de Simulación ---
const mockIntegrations: Integration[] = [
    { id: 1, name: 'Salesforce Enterprise', type: 'CRM', status: 'Operational', latency: 150 },
    { id: 2, name: 'HubSpot Marketing', type: 'CRM', status: 'Conflict', latency: 250 },
    { id: 3, name: 'Custom Inventory API', type: 'ERP', status: 'Operational', latency: 80 },
];

const mockConflicts: DataConflict[] = [
    { id: 201, timestamp: '2025-12-13 14:05', field: 'lead_owner_id', errorCode: 'Required Field Missing', severity: 'High' },
    { id: 202, timestamp: '2025-12-13 13:45', field: 'product_sku', errorCode: 'Data Type Mismatch', severity: 'Medium' },
];

// --- Componente de Tarjeta de Integración ---
const IntegrationCard: React.FC<{ integration: Integration }> = ({ integration }) => {
    const statusColor = integration.status === 'Operational' ? 'bg-green-500' : 
                        integration.status === 'Conflict' ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-primary-500/50 transition duration-150">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-2">
                        <LinkIcon className="h-5 w-5 text-gray-400" />
                        <h3 className="text-xl font-bold text-white">{integration.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{integration.type} Integration</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${statusColor}`}>
                    {integration.status}
                </span>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-sm text-gray-300">Sync Latency: <span className="font-semibold text-primary-300">{integration.latency}ms</span></p>
                
                <button 
                    onClick={() => console.log(`Opening field mapping for ${integration.name}`)}
                    className="mt-3 w-full flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition"
                >
                    <ArrowPathIcon className="h-5 w-5 mr-2" /> Manage Field Mapping
                </button>
            </div>
        </div>
    );
};

// --- Componente Principal ---
export default function CRMIntegrationHub() {
    const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
    
    // Simulación de los datos que AURA extrae vs. lo que el CRM espera
    const auraFields = ['customer_name', 'phone_number', 'extracted_intent', 'conversion_status'];
    const crmFields = ['Contact Name', 'Phone', 'Lead Priority', 'Sales Stage'];

    return (
        <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto pt-10 pb-12">
                
                {/* Header y Resumen */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            Data Sync & CRM Hub
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Manage field mapping, connection status, and troubleshoot data conflicts.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsMappingModalOpen(true)}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-cyan-600 text-white hover:bg-cyan-500 transition"
                    >
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" /> Global Webhook Setup
                    </button>
                </div>
                
                {/* Estado de Integraciones */}
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                    Integration Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {mockIntegrations.map(integration => (
                        <IntegrationCard key={integration.id} integration={integration} />
                    ))}
                </div>

                {/* Log de Conflictos de Datos */}
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-700 pb-2">
                    Data Conflict Log ({mockConflicts.length} Active)
                </h2>
                
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    {mockConflicts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        {['Timestamp', 'Field in Conflict', 'Error Code', 'Severity', 'Action'].map(header => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {mockConflicts.map(conflict => (
                                        <tr key={conflict.id} className="hover:bg-gray-700 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{conflict.timestamp}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-400">{conflict.field}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{conflict.errorCode}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${conflict.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {conflict.severity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button className="text-sm font-medium text-primary-500 hover:text-primary-300">
                                                    Resolve →
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic text-center py-5">No active data conflicts detected.</p>
                    )}
                </div>
            </div>
            
            {/* Modal de Mapeo de Campos (Simulación de Interfaz Visual) */}
            {isMappingModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-8 rounded-xl w-full max-w-2xl border border-gray-700">
                        <h3 className="text-2xl font-bold text-white mb-4">Field Mapping Editor</h3>
                        <p className="text-gray-400 mb-6">Drag and drop AURA fields to corresponding CRM fields.</p>
                        
                        <div className="grid grid-cols-2 gap-4 bg-gray-800 p-4 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-primary-300 mb-2">AURA Extracted Fields (Source)</h4>
                                <ul className="space-y-2">
                                    {auraFields.map(field => (
                                        <li key={field} className="bg-gray-700 p-2 rounded text-sm text-white">{field}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-2">CRM Destination Fields (Target)</h4>
                                <ul className="space-y-2">
                                    {crmFields.map(field => (
                                        <li key={field} className="bg-gray-600 p-2 rounded text-sm text-gray-200">{field}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        
                        <div className="flex justify-end space-x-4 mt-6">
                            <button 
                                onClick={() => setIsMappingModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white"
                            >
                                Close
                            </button>
                            <button 
                                onClick={() => { console.log('Mapping saved'); setIsMappingModalOpen(false); }}
                                className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-500"
                            >
                                Save Mapping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
          }
