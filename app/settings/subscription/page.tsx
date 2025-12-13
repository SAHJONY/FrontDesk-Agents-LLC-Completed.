'use client';

import { useState } from 'react';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState('professional');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 299,
      features: ['1,000 minutes/month', '1 AI agent', 'Basic analytics', 'Email support']
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 999,
      features: ['5,000 minutes/month', '5 AI agents', 'Advanced analytics', 'Priority support']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited minutes', 'Unlimited agents', 'White-label', 'Dedicated support']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage your plan and billing</p>
        </div>

        {/* Current Plan */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-2">Current Plan</p>
              <h2 className="text-4xl font-bold mb-2">Professional</h2>
              <p className="text-blue-100">Renews on February 15, 2024</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold">$999</p>
              <p className="text-blue-100">/month</p>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg p-6 ${
                currentPlan === plan.id ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {currentPlan === plan.id && (
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    Current Plan
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              
              <div className="mb-6">
                {typeof plan.price === 'number' ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-gray-900">{plan.price}</div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                disabled={currentPlan === plan.id}
                className={`w-full px-6 py-3 font-semibold rounded-lg transition-colors ${
                  currentPlan === plan.id
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {currentPlan === plan.id ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>

        {/* Usage Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Usage</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Minutes Used</span>
                <span className="text-sm font-bold text-gray-900">3,247 / 5,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">AI Agents</span>
                <span className="text-sm font-bold text-gray-900">3 / 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                }
