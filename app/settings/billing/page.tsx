'use client';

import { useState } from 'react';
import { CreditCardIcon, DocumentTextIcon, DownloadIcon } from '@heroicons/react/24/outline';

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const invoices = [
    { id: 'INV-2024-001', date: '2024-01-01', amount: '$999.00', status: 'paid' },
    { id: 'INV-2023-012', date: '2023-12-01', amount: '$999.00', status: 'paid' },
    { id: 'INV-2023-011', date: '2023-11-01', amount: '$999.00', status: 'paid' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing Settings</h1>
          <p className="text-gray-600">Manage your subscription and billing preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Billing Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Plan */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Plan</h2>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Professional Plan</h3>
                  <p className="text-gray-600">$999.00 per month</p>
                </div>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  Change Plan
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-colors ${
                    billingCycle === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-colors ${
                    billingCycle === 'annual'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Annual <span className="text-sm">(Save 20%)</span>
                </button>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Next billing date:</strong> February 15, 2024
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="flex items-center justify-between p-4 border-2 border-blue-600 rounded-lg bg-blue-50">
                <div className="flex items-center gap-4">
                  <CreditCardIcon className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Visa ending in 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/2025</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-100 rounded-lg transition-colors">
                  Edit
                </button>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing History</h2>
              
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <DocumentTextIcon className="h-8 w-8 text-gray-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{invoice.id}</p>
                        <p className="text-sm text-gray-600">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{invoice.amount}</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          {invoice.status}
                        </span>
                      </div>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <DownloadIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Usage This Month</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Minutes Used</span>
                    <span className="text-sm font-bold text-gray-900">3,247 / 5,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">AI Agents</span>
                    <span className="text-sm font-bold text-gray-900">3 / 5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    You're on track for this billing cycle
                  </p>
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                    View Detailed Usage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
