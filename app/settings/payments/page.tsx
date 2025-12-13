'use client';

import { useState } from 'react';
import { CreditCardIcon, BanknotesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function PaymentsPage() {
  const [stripeConnected, setStripeConnected] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Gateway</h1>
          <p className="text-gray-600">Manage Stripe integration and payment processing</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Stripe Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Stripe Integration</h2>
                <p className="text-sm text-gray-600">Payment processing status</p>
              </div>
            </div>

            {stripeConnected ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Connected</p>
                    <p className="text-sm text-green-700">Stripe account is active</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Processed Today</p>
                    <p className="text-2xl font-bold text-gray-900">$12.5K</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">100%</p>
                  </div>
                </div>

                <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  Disconnect Stripe
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-semibold text-yellow-900">Not Connected</p>
                  <p className="text-sm text-yellow-700">Connect your Stripe account to accept payments</p>
                </div>

                <button className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                  Connect Stripe Account
                </button>
              </div>
            )}
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BanknotesIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Settings</h2>
                <p className="text-sm text-gray-600">Configure payment options</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Auto-charge enabled</p>
                  <p className="text-sm text-gray-600">Automatically charge customers</p>
                </div>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Email receipts</p>
                  <p className="text-sm text-gray-600">Send payment confirmations</p>
                </div>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Save payment methods</p>
                  <p className="text-sm text-gray-600">Store cards for future use</p>
                </div>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                </button>
              </div>
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
          
          <div className="space-y-3">
            {[
              { id: 1, customer: 'Acme Corp', amount: '$999.00', status: 'success', date: '2 min ago' },
              { id: 2, customer: 'Tech Solutions', amount: '$299.00', status: 'success', date: '1 hour ago' },
              { id: 3, customer: 'Global Industries', amount: '$2,999.00', status: 'success', date: '3 hours ago' }
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{transaction.customer}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{transaction.amount}</p>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
