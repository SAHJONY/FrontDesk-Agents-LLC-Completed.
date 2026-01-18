'use client';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-4 shadow-xl rounded-2xl sm:px-10 border border-green-100 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Payment Successful!</h2>
          <p className="mt-4 text-gray-600">
            Welcome to the workforce. Your AI agents are being provisioned and will be ready in your dashboard momentarily.
          </p>
          
          <div className="mt-10">
            <Link
              href="/dashboard"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-400">
            A receipt has been sent to your email.
          </p>
        </div>
      </div>
    </div>
  );
}
