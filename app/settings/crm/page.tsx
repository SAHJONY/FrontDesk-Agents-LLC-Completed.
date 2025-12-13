'use client';

import { useState } from 'react';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function CRMPage() {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Salesforce', connected: true, icon: '☁️' },
    { id: 2, name: 'HubSpot', connected: true, icon: '🟠' },
    { id: 3, name: 'Pipedrive', connected: false, icon: '🔵' },
    { id: 4, name: 'Zoho CRM', connected: false, icon: '🔴' }
  ]);

  const toggleIntegration = (id: number) => {
    setIntegrations(integrations.map(int =>
      int.id === id ? { ...int, connected: !int.connected } : int
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CRM Integrations</h1>
          <p className="text-gray-600">Connect your customer relationship management tools</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <div key={integration.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-600">
                      {integration.connected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                {integration.connected && (
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                )}
              </div>

              <button
                onClick={() => toggleIntegration(integration.id)}
                className={`w-full px-6 py-3 font-semibold rounded-lg transition-colors ${
                  integration.connected
                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {integration.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>

        {/* Sync Settings */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sync Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Auto-sync contacts</p>
                <p className="text-sm text-gray-600">Automatically sync new contacts</p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Sync call logs</p>
                <p className="text-sm text-gray-600">Log all calls to CRM</p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Real-time updates</p>
                <p className="text-sm text-gray-600">Push updates immediately</p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
