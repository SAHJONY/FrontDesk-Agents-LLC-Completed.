'use client';

import { useState } from 'react';
import { GlobeAltIcon, CheckCircleIcon, SignalIcon } from '@heroicons/react/24/outline';

export default function GlobalDeploymentPage() {
  const [regions, setRegions] = useState([
    { id: 1, name: 'US East (N. Virginia)', code: 'us-east-1', active: true, latency: '12ms', status: 'operational' },
    { id: 2, name: 'US West (Oregon)', code: 'us-west-2', active: true, latency: '45ms', status: 'operational' },
    { id: 3, name: 'EU West (Ireland)', code: 'eu-west-1', active: false, latency: '89ms', status: 'available' },
    { id: 4, name: 'Asia Pacific (Tokyo)', code: 'ap-northeast-1', active: false, latency: '156ms', status: 'available' },
    { id: 5, name: 'South America (São Paulo)', code: 'sa-east-1', active: false, latency: '178ms', status: 'available' }
  ]);

  const toggleRegion = (id: number) => {
    setRegions(regions.map(region =>
      region.id === id ? { ...region, active: !region.active } : region
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Deployment</h1>
          <p className="text-gray-600">Manage your global infrastructure and regional presence</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <GlobeAltIcon className="h-8 w-8 text-blue-600" />
              <p className="text-sm text-gray-600">Active Regions</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {regions.filter(r => r.active).length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <SignalIcon className="h-8 w-8 text-green-600" />
              <p className="text-sm text-gray-600">Avg Latency</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">28ms</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon className="h-8 w-8 text-purple-600" />
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">99.9%</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <GlobeAltIcon className="h-8 w-8 text-orange-600" />
              <p className="text-sm text-gray-600">Total Requests</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">2.4M</p>
          </div>
        </div>

        {/* Regions List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Regions</h2>
          
          <div className="space-y-4">
            {regions.map((region) => (
              <div key={region.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    region.active ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    <GlobeAltIcon className={`h-6 w-6 ${
                      region.active ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{region.name}</h3>
                      {region.active && (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{region.code}</p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="text-sm text-gray-600">Latency</p>
                    <p className="text-lg font-bold text-gray-900">{region.latency}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    region.status === 'operational'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {region.status}
                  </span>
                </div>
                <button
                  onClick={() => toggleRegion(region.id)}
                  className={`ml-4 px-6 py-2 font-semibold rounded-lg transition-colors ${
                    region.active
                      ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {region.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Load Balancing */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Load Balancing Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Auto-scaling</p>
                <p className="text-sm text-gray-600">Automatically scale based on demand</p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Geographic routing</p>
                <p className="text-sm text-gray-600">Route users to nearest region</p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Failover protection</p>
                <p className="text-sm text-gray-600">Automatic failover to backup regions</p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>
          </div>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
