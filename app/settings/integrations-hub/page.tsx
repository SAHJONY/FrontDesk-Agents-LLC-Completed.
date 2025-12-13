'use client';

import { useState } from 'react';
import { CheckCircleIcon, PlusIcon, CogIcon } from '@heroicons/react/24/outline';

export default function IntegrationsHubPage() {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'Slack',
      category: 'Communication',
      description: 'Get notifications and manage calls from Slack',
      connected: true,
      icon: '💬'
    },
    {
      id: 2,
      name: 'Google Calendar',
      category: 'Scheduling',
      description: 'Sync appointments with Google Calendar',
      connected: true,
      icon: '📅'
    },
    {
      id: 3,
      name: 'Zapier',
      category: 'Automation',
      description: 'Connect to 5000+ apps via Zapier',
      connected: false,
      icon: '⚡'
    },
    {
      id: 4,
      name: 'Calendly',
      category: 'Scheduling',
      description: 'Integrate with Calendly booking',
      connected: false,
      icon: '🗓️'
    },
    {
      id: 5,
      name: 'Microsoft Teams',
      category: 'Communication',
      description: 'Teams notifications and integrations',
      connected: false,
      icon: '👥'
    },
    {
      id: 6,
      name: 'Webhooks',
      category: 'Developer',
      description: 'Custom webhook integrations',
      connected: true,
      icon: '🔗'
    }
  ]);

  const categories = ['All', 'Communication', 'Scheduling', 'Automation', 'Developer'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIntegrations = selectedCategory === 'All'
    ? integrations
    : integrations.filter(int => int.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations Hub</h1>
            <p className="text-gray-600">Connect your favorite tools and services</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-5 w-5" />
            Request Integration
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {integration.category}
                    </span>
                  </div>
                </div>
                {integration.connected && (
                  <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4">{integration.description}</p>

              <div className="flex gap-2">
                <button
                  className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors ${
                    integration.connected
                      ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
                {integration.connected && (
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <CogIcon className="h-5 w-5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* API Access */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">API Access</h2>
          <p className="text-gray-600 mb-4">
            Build custom integrations using our RESTful API
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">API Key</p>
              <p className="font-mono text-sm text-gray-900">sk_live_••••••••••••••••</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">API Calls This Month</p>
              <p className="text-2xl font-bold text-gray-900">12,547</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              View Documentation
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Regenerate API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
