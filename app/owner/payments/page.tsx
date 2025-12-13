'use client';

import { useState } from 'react';
import { CreditCardIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function PaymentsPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const transactions = [
    { id: 1, date: '2024-01-15', amount: '$999.00', status: 'completed', description: 'Professional Plan - Monthly' },
    { id: 2, date: '2023-12-15', amount: '$999.00', status: 'completed', description: 'Professional Plan - Monthly' },
    { id: 3, date: '2023-11-15', amount: '$999.00', status: 'completed', description: 'Professional Plan - Monthly' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
          <p className="text-gray-600">Manage your billing and payment methods</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Method */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border-2 border-blue-600 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-4">
                    <CreditCardIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/2025</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    Primary
                  </span>
                </div>

                <button className="w-full px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                  + Add New Payment Method
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
              
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <CheckCircleIcon className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
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

          {/* Current Plan */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Plan</h2>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">$999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-lg font-semibold text-blue-600">Professional Plan</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">5,000 minutes/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">5 AI agents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Advanced analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Priority support</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <ClockIcon className="h-5 w-5" />
                  <span>Next billing date: Feb 15, 2024</span>
                </div>
                
                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
