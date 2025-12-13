'use client';

import { useState } from 'react';
import { PhoneIcon, PlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function NumbersPage() {
  const [phoneNumbers, setPhoneNumbers] = useState([
    { id: 1, number: '+1 (555) 123-4567', type: 'Main', status: 'active', calls: 1247 },
    { id: 2, number: '+1 (555) 987-6543', type: 'Support', status: 'active', calls: 892 },
    { id: 3, number: '+1 (555) 456-7890', type: 'Sales', status: 'inactive', calls: 0 }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Phone Numbers</h1>
            <p className="text-gray-600">Manage your business phone numbers</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-5 w-5" />
            Add Number
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phoneNumbers.map((phone) => (
            <div key={phone.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    phone.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <PhoneIcon className={`h-6 w-6 ${
                      phone.status === 'active' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{phone.type}</p>
                    <p className="text-lg font-bold text-gray-900">{phone.number}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Calls</span>
                  <span className="text-lg font-bold text-gray-900">{phone.calls.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  phone.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {phone.status === 'active' ? (
                    <span className="flex items-center gap-1">
                      <CheckCircleIcon className="h-4 w-4" />
                      Active
                    </span>
                  ) : (
                    'Inactive'
                  )}
                </span>
                <button className="text-blue-600 font-semibold hover:text-blue-700">
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Number Details */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Number Configuration</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Forward to Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Voicemail Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="voicemail@company.com"
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
