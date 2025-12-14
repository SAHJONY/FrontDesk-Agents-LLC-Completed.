'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PhoneIcon, 
  SparklesIcon, 
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: ClockIcon,
      title: '24/7 Availability',
      description: 'Never miss a call. SARA works around the clock, handling inquiries and scheduling appointments.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80'
    },
    {
      icon: ShieldCheckIcon,
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security with full HIPAA compliance. Your data is protected with bank-level encryption.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-Language',
      description: 'Communicate with clients in their preferred language. SARA speaks English, Spanish, French, and more.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Natural Conversations',
      description: 'Advanced AI that understands context and speaks naturally. Clients won\'t believe they\'re talking to AI.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Dashboard',
      description: 'Track call metrics, bookings, and customer satisfaction in real-time with actionable insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      icon: SparklesIcon,
      title: 'AI-Powered',
      description: 'Cutting-edge artificial intelligence that learns and adapts to your business needs automatically.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime', sublabel: 'Always available' },
    { value: '< 2s', label: 'Response Time', sublabel: 'Lightning fast' },
    { value: '10k+', label: 'Calls Handled', sublabel: 'Monthly' },
    { value: '98%', label: 'Satisfaction', sublabel: 'Client approval' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">FD</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-white">FrontDesk Agents</div>
                <div className="text-xs text-cyan-400">AI RECEPTIONIST</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/pricing" className="hidden md:block text-gray-300 hover:text-white font-medium transition-colors">
                Pricing
              </Link>
              <a
                href="tel:+12164804413"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                <PhoneIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Call +1 (216) 480-4413</span>
                <span className="sm:hidden">Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero Headline */}
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                <SparklesIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400 uppercase tracking-wide">24/7 AI Receptionists</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">Turn every phone call</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  into booked revenue
                </span>
                <br />
                <span className="text-white">— automatically.</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                FrontDesk Agents answers, qualifies, and books every caller in seconds. 
                No voicemails. No missed calls. No lost leads.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/demo"
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <PlayCircleIcon className="w-5 h-5" />
                  Book a live demo
                </Link>
                <a
                  href="tel:+12164804413"
                  className="px-8 py-4 bg-white/5 border-2 border-white/20 rounded-lg text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Call +1 (216) 480-4413
                </a>
              </div>
            </div>

            {/* Hero Image - Business Meeting with AI */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                    alt="Professional business team meeting with AI technology"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                        <SparklesIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">SARA AI Agent</div>
                        <div className="text-sm text-gray-300">Ready to handle your calls</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-green-400">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-white font-semibold">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Professional Images */}
      <section className="relative py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Enterprise-Grade <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Reception</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for businesses that demand reliability, security, and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] via-[#0a1929]/50 to-transparent" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex items-center text-cyan-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser - Dark Professional */}
      <section className="relative py-32 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                <span className="text-sm font-medium text-cyan-400 uppercase tracking-wide">Simple, Transparent Pricing</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start with demos, scale with automation.
              </h2>

              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Start with manual demos and payments (Zelle, Cash App, invoice). 
                When you're ready, we turn on full Stripe billing automation.
              </p>

              {/* Pricing Card Preview */}
              <div className="max-w-md mx-auto bg-[#0a1929] border border-cyan-500/30 rounded-2xl p-8 mb-8">
                <div className="text-sm text-cyan-400 font-semibold mb-2">Starter</div>
                <div className="text-sm text-gray-400 mb-4">Perfect for small businesses</div>
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-5xl font-bold text-white">$399</span>
                  <span className="text-gray-400 ml-2">/mo</span>
                </div>
                <Link
                  href="/pricing"
                  className="block w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  View All Plans
                </Link>
              </div>

              {/* Professional Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mt-8">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80"
                    alt="Professional business meeting"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Footer Section - Professional */}
      <section className="relative py-20 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-12">
              <div className="aspect-[21/9] bg-gradient-to-br from-slate-800 to-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
                  alt="Legal and compliance team"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-5xl font-bold text-white mb-6">LEGAL</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/legal/terms" className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all">
                    Terms of Service
                  </Link>
                  <Link href="/legal/privacy" className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Contact Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-8">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80"
                  alt="Professional customer service representative"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  FrontDesk Agents
                </h2>
                <p className="text-xl text-gray-200 mb-6">
                  www.frontdeskagents.com  •  +1 (216) 480-4413
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+12164804413"
                    className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
                  >
                    Call Now
                  </a>
                  <Link
                    href="/demo"
                    className="px-12 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg font-bold text-white hover:bg-white/20 transition-all"
                  >
                    Book Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a1929]/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">FD</span>
              </div>
              <span className="text-xl font-bold text-white">FrontDesk Agents LLC</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
