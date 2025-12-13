'use client';

import { useState } from 'react';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function SetupPage() {
  const [setupStep, setSetupStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Setup</h1>
          <p className="text-gray-600">Configure your AI receptionist in 3 easy steps</p>
        </div>

        <div className="space-y-6">
          {[
            { title: 'Connect Your Phone', description: 'Link your business phone number' },
            { title: 'Configure AI Settings', description: 'Customize your AI agent behavior' },
            { title: 'Test & Launch', description: 'Make a test call and go live' }
          ].map((step, index) => (
            <div key={index} className={`p-6 border-2 rounded-xl ${
              setupStep > index + 1 ? 'border-green-500 bg-green-50' :
              setupStep === index + 1 ? 'border-blue-500 bg-blue-50' :
              'border-gray-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  setupStep > index + 1 ? 'bg-green-500' :
                  setupStep === index + 1 ? 'bg-blue-500' :
                  'bg-gray-300'
                }`}>
                  {setupStep > index + 1 ? (
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  ) : (
                    <span className="text-white font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSetupStep(Math.min(4, setupStep + 1))}
          className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Setup
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
