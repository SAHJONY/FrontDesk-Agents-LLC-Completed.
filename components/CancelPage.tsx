'use client';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-4 shadow-sm rounded-2xl sm:px-10 border border-gray-200 text-center">
          <div className="flex justify-center mb-6">
            <XCircleIcon className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Checkout Cancelled</h2>
          <p className="mt-4 text-gray-600">
            No worries! Your payment method wasn't charged. If you have questions about our plans, our support team is here to help.
          </p>
          
          <div className="mt-10 space-y-3">
            <Link
              href="/pricing"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all"
            >
              Back to Pricing
            </Link>
            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
