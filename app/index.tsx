import { PLATFORM_CONFIG } from '@/lib/config/platform';
import { HeroSection } from '@/components/marketing/Hero';

/**
 * @name LandingPage
 * @description The local market entry point for FrontDesk Agents
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HeroSection is now utilized to satisfy the build and display content */}
      <HeroSection 
        title={PLATFORM_CONFIG.name} 
        description="Autonomous Front Office Infrastructure"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Global Revenue Workforce
          </h2>
          <p className="text-gray-600">
            Deploying high-intent autonomous agents for the local market.
          </p>
        </div>
      </section>
    </main>
  );
}
