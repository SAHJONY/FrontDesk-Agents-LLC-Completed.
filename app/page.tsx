import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone, Brain, TrendingUp, Shield, Zap, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Cinematic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Modern business headquarters"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              AI Receptionists That Never Sleep
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed">
              Enterprise-grade AI phone agents that handle calls, book appointments, 
              and qualify leads 24/7. Trusted by Fortune 500 companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-xl hover:shadow-2xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['Fortune 500', 'Enterprise', 'Healthcare', 'Real Estate'].map((company) => (
              <div key={company} className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features, Seamless Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to automate your phone operations and scale your business
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
                  alt="AI Technology"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Advanced AI</h3>
                <p className="text-gray-600 leading-relaxed">
                  Natural conversations powered by GPT-4. Handles complex queries, 
                  schedules appointments, and qualifies leads automatically.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Analytics Dashboard"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-Time Analytics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track every call, measure ROI, and optimize performance with 
                  enterprise-grade analytics and reporting.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80"
                  alt="Phone System"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Phone className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">24/7 Availability</h3>
                <p className="text-gray-600 leading-relaxed">
                  Never miss a call again. Your AI receptionist works around 
                  the clock, handling unlimited concurrent calls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Modern office workspace"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '10M+', label: 'Calls Handled' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '<2s', label: 'Response Time' },
              { value: '24/7', label: 'Always Available' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Professional team collaboration"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Fortune 500 Companies Choose Us
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Enterprise-grade reliability with the intelligence of human interaction
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Enterprise Security',
                    description: 'SOC 2 Type II certified with end-to-end encryption'
                  },
                  {
                    icon: Zap,
                    title: 'Lightning Fast',
                    description: 'Sub-second response times with 99.9% uptime guarantee'
                  },
                  {
                    icon: Clock,
                    title: 'Quick Setup',
                    description: 'Deploy in minutes, not months. No complex integration required'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
            alt="Professional business team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-purple-900/95"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of companies using AI to scale their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white hover:bg-gray-100 rounded-lg transition-all shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
