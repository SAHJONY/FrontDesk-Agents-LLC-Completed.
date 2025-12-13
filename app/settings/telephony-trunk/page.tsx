'use client';

import { useState } from 'react';
import { PhoneIcon, SignalIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function TelephonyTrunkPage() {
  const [testingConnection, setTestingConnection] = useState(false);

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Trunks</h1>
          <p className="text-gray-600">Configure call infrastructure and test connectivity</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Twilio Integration */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <PhoneIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Twilio Configuration</h2>
                <p className="text-sm text-gray-600">External voice trunk</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account SID
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Auth Token
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••••••••••••••••••••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <button className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                Save Twilio Configuration
              </button>
            </div>
          </div>

          {/* Internal System */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <SignalIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Internal System</h2>
                <p className="text-sm text-gray-600">Internal voice infrastructure</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">System Operational</p>
                  <p className="text-sm text-green-700">All channels active</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Active Channels</p>
                  <p className="text-2xl font-bold text-gray-900">50/100</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Call Quality</p>
                  <p className="text-2xl font-bold text-gray-900">HD</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Latency</p>
                  <p className="text-2xl font-bold text-gray-900">45ms</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">99.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Test */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connection Test</h2>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {testingConnection ? 'Testing...' : 'Test Connection'}
            </button>

            {!testingConnection && (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircleIcon className="h-5 w-5" />
                <span className="font-semibold">All systems operational</span>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Run connection tests regularly to ensure optimal call quality and reliability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
