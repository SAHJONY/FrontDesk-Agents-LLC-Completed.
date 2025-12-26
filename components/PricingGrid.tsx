'use client';

export default function PricingGrid() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that's right for your business
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto">
          {/* Professional Tier */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Professional</h3>
              <p className="mt-4 text-sm text-gray-500">Perfect for single locations</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$497</span>
                <span className="text-base font-medium text-gray-500">/month</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">1,000 interactions/month</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">Single voice agent</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">24/7 support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sovereign Tier */}
          <div className="border-2 border-blue-500 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Sovereign</h3>
              <p className="mt-4 text-sm text-gray-500">Most popular for growing businesses</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$1,497</span>
                <span className="text-base font-medium text-gray-500">/month</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">5,000 interactions/month</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">3 voice agents</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">Multilingual support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Enterprise</h3>
              <p className="mt-4 text-sm text-gray-500">For large operations</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">Custom</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">Unlimited interactions</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">White-label option</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">Dedicated support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
