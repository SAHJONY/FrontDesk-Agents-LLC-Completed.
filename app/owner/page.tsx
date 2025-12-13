'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CogIcon, KeyIcon, ServerIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function OwnerPage() {
  const [apiKey, setApiKey] = useState('sk_live_••••••••••••••••');
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourapp.com/webhooks');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Manage AURA™ Core API configuration</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Configuration */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <KeyIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">API Configuration</h2>
                <p className="text-sm text-gray-600">Manage your API keys and endpoints</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter API key"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://api.yourapp.com/webhooks"
                />
              </div>

              <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Save Configuration
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ServerIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">System Status</h2>
                <p className="text-sm text-gray-600">Current system health</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'API Server', status: 'Operational', uptime: '99.9%' },
                { name: 'Webhook Service', status: 'Operational', uptime: '100%' },
                { name: 'AI Engine', status: 'Operational', uptime: '99.8%' },
                { name: 'Database', status: 'Operational', uptime: '100%' }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.status}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{service.uptime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link
            href="/settings/scripts"
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <CogIcon className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Configure Scripts</h3>
            <p className="text-gray-600 text-sm">Manage AI conversation scripts</p>
          </Link>

          <Link
            href="/settings/integrations-hub"
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <CogIcon className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Integrations</h3>
            <p className="text-gray-600 text-sm">Connect external services</p>
          </Link>

          <Link
            href="/admin/audit"
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <CogIcon className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Audit Logs</h3>
            <p className="text-gray-600 text-sm">View system activity</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
