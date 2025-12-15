"use client"; // <--- SOLUCIÓN AL ERROR DE HOOKS DE NEXT.JS

import React, { useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const ConsentEnforcement: React.FC = () => {
    // Definición de estado para el ejemplo
    const [consentMode, setConsentMode] = useState<'Off' | 'Soft' | 'Strict'>('Strict');

    // Lógica para el estilo
    const isCompliant = consentMode === 'Strict'; 

    return (
        <div 
            className={`premium-card p-6 border-l-4 ${isCompliant ? 'border-green-500' : 'border-red-500'}`} 
            // Usamos style para asegurar que el color de acento se aplique correctamente
            style={{ borderColor: isCompliant ? 'var(--color-accent-cyan)' : '#FF4D4D' }}
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-1">
                        {isCompliant ? 'Strict Enforcement Active' : 'High Risk Mode'}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Mode determines the required level of caller consent logged by the AI agent, essential for global compliance.
                    </p>
                </div>
                {isCompliant ? (
                    <CheckCircle className="w-8 h-8 text-cyan-400" />
                ) : (
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                )}
            </div>

            <div className="mt-6 flex space-x-4">
                {/* Botones de selección de modo con estilo ejecutivo */}
                {['Off', 'Soft', 'Strict'].map(mode => (
                    <button
                        key={mode}
                        onClick={() => setConsentMode(mode as any)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 
                            ${consentMode === mode 
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        {mode}
                    </button>
                ))}
            </div>

            <p className="mt-4 text-xs italic text-gray-500">
                Current Setting: **{consentMode}** - Recommended for TCPA compliance is 'Strict' to mitigate regulatory risk.
            </p>
        </div>
    );
};

export default ConsentEnforcement;
