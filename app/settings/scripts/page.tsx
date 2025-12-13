'use client';

import { useState } from 'react';
import { DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ScriptsPage() {
  const [scripts, setScripts] = useState([
    { id: 1, name: 'Greeting Script', content: 'Hello! Thank you for calling...', active: true },
    { id: 2, name: 'Appointment Booking', content: 'I can help you schedule an appointment...', active: true },
    { id: 3, name: 'After Hours', content: 'We are currently closed...', active: false }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Scripts</h1>
            <p className="text-gray-600">Manage conversation scripts for your AI agents</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-5 w-5" />
            New Script
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <div key={script.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{script.name}</h3>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  script.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {script.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{script.content}</p>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Edit
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
