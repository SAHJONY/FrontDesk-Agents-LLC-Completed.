'use client';
import { useEffect } from 'react';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
        <h2 className="text-xl font-bold text-gray-900">Securing your session...</h2>
        <p className="text-gray-500 mt-2">Connecting to our secure payment processor.</p>
      </div>
    </div>
  );
}
