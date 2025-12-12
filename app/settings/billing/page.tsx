// app/settings/billing/page.tsx
import React from 'react';
import Link from 'next/link';

export default function BillingSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-premium border border-gray-100">
        
        <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-3 mb-8">
          Billing & Subscription
        </h1>
        
        {/* Subscription Status Card */}
        <div className="bg-primary-50 p-6 rounded-xl border border-primary-200 mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary-900">Current Plan: Enterprise Tier 3</h2>
            <p className="text-gray-700 mt-1">Next Billing Date: January 1, 2026</p>
          </div>
          <button className="btn-secondary-premium px-4 py-2 border-primary-600 text-primary-600 hover:bg-primary-600/10">
            Change Plan
          </button>
        </div>
        
        {/* Payment Method and History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Payment Method */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Payment Method</h3>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="font-medium text-gray-800">VISA ending in 4242</p>
              <p className="text-sm text-gray-500">Expires 09/2028</p>
              <Link href="#" className="text-sm text-primary-600 hover:text-primary-800 mt-2 inline-block">Update Card</Link>
            </div>
          </div>
          
          {/* Invoice History */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Invoice History</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-gray-700">
                <span>Dec 2025 Invoice</span>
                <Link href="#" className="text-primary-600 hover:text-primary-800">Download PDF</Link>
              </li>
              <li className="flex justify-between items-center text-gray-700">
                <span>Nov 2025 Invoice</span>
                <Link href="#" className="text-primary-600 hover:text-primary-800">Download PDF</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
