import { PLATFORM_CONFIG } from '@/lib/config/platform';

/**
 * @name LandingPage
 * @description The local market entry point for FrontDesk Agents
 * @note Simplified for production stability in pdx1
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <nav className="p-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-bold text-xl text-blue-600">{PLATFORM_CONFIG.name}</span>
          <div className="space-x-4">
            <span className="text-sm text-gray-500">24/7 Autonomous Infrastructure</span>
          </div>
        </div>
      </nav>

      <section className="py-24 px-6 text-center bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            The Local Market <span className="text-blue-600">Autonomous Front Office</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Never miss a lead. Our high-intent agents qualify and route your customers 24/7/365.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">
              Get Started
            </button>
            <button className="border border-gray-300 px-8 py-3 rounded-lg font-semibold">
              View Plans
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2">Instant Response</h3>
            <p className="text-gray-500 text-sm">Leads qualified in under 5 seconds.</p>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2">Elite Security</h3>
            <p className="text-gray-500 text-sm">pdx1 Node Isolation for enterprise data.</p>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2">Revenue Recovery</h3>
            <p className="text-gray-500 text-sm">Recovering "found money" from missed calls.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

