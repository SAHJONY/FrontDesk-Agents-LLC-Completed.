'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  priceId: string;
  planType: 'essential' | 'professional' | 'enterprise';
  userId: string;
}

export default function CheckoutButton({ priceId, planType, userId }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          planType,
          userId, // This is crucial for the webhook to find the right BusinessConfig row
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-200 flex justify-center items-center ${
        planType === 'professional' 
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        `Get Started with ${planType.charAt(0).toUpperCase() + planType.slice(1)}`
      )}
    </button>
  );
}
