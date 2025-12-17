'use client';

import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// 1. Interfaces para TypeScript
interface StepData {
  id: string | number;
  title: string;
  description: string;
  icon: React.ElementType;
  isComplete: boolean;
}

interface StepCardProps {
  step: StepData;
  onMarkComplete: (id: string | number) => void;
}

// 2. Componente Interno
const StepCard = ({ step, onMarkComplete }: StepCardProps) => {
  const isComplete = step.isComplete;
  const Icon = isComplete ? CheckCircleIcon : step.icon;

  return (
    <div className={`p-6 rounded-xl border ${isComplete ? 'bg-green-500/10 border-green-500/50' : 'bg-white/5 border-white/10'} transition-all`}>
      <div className="flex items-center gap-4">
        <Icon className={`w-8 h-8 ${isComplete ? 'text-green-400' : 'text-cyan-400'}`} />
        <div>
          <h3 className="text-white font-bold">{step.title}</h3>
          <p className="text-gray-400 text-sm">{step.description}</p>
        </div>
      </div>
      {!isComplete && (
        <button 
          onClick={() => onMarkComplete(step.id)}
          className="mt-4 w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Marcar como completado
        </button>
      )}
    </div>
  );
};

// 3. EXPORT DEFAULT (Obligatorio para que sea un módulo)
export default function GuidedSetupPage() {
  const [steps, setSteps] = useState<StepData[]>([
    // Agrega aquí tus pasos iniciales si es necesario
  ]);

  const handleMarkComplete = (id: string | number) => {
    setSteps(steps.map(s => s.id === id ? { ...s, isComplete: true } : s));
  };

  return (
    <div className="min-h-screen bg-[#0a1929] p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Configuración Guiada</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map(step => (
          <StepCard key={step.id} step={step} onMarkComplete={handleMarkComplete} />
        ))}
      </div>
    </div>
  );
}
