// app/ai-agents/page.tsx - Premium AI Agents Page
import Image from 'next/image';
import Link from 'next/link';
import { Brain, MessageSquare, TrendingUp, Clock, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function AIAgentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80"
            alt="AI Technology"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-purple-900/85 to-blue-900/95"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Brain className="h-5 w-5 mr-2" />
            <span className="text-sm font-semibold">Powered by GPT-4</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            AI Agents Built for Enterprise
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Intelligent voice AI that understands context, learns from conversations, 
            and delivers human-like interactions at scale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Try Demo Agent
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
            >
              Schedule Call
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our AI Agents Can Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple FAQs to complex multi-step workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: 'Call Handling',
                description: 'Answer incoming calls, route to the right department, take messages',
                image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80'
              },
              {
                icon: Calendar,
                title: 'Appointment Scheduling',
                description: 'Book, reschedule, and confirm appointments automatically',
                image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80'
              },
              {
                icon: MessageSquare,
                title: 'Lead Qualification',
                description: 'Ask qualifying questions and route hot leads to sales',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
              },
              {
                icon: Clock,
                title: 'After-Hours Support',
                description: 'Provide 24/7 coverage when your team is unavailable',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
              },
              {
                icon: TrendingUp,
                title: 'Customer Service',
                description: 'Answer FAQs, provide product info, handle basic support',
                image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80'
              },
              {
                icon: Brain,
                title: 'Context Understanding',
                description: 'Remember conversation history and adapt responses',
                image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80'
              }
            ].map((capability, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={capability.image}
                    alt={capability.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <capability.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{capability.title}</h3>
                  <p className="text-gray-600">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deploy your AI agent in minutes, not months
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Configure Your Agent',
                description: 'Define your agent\'s personality, knowledge base, and workflows through our intuitive interface',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
              },
              {
                step: '02',
                title: 'Train & Test',
                description: 'Upload your FAQs, scripts, and data. Test with real scenarios before going live',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
              },
              {
                step: '03',
                title: 'Deploy & Monitor',
                description: 'Launch your agent and track performance with real-time analytics and continuous optimization',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mb-6">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="text-6xl font-bold text-white/30">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt="Technology background"
            fill
            className="object-cover opacity-5"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for scale, security, and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'SOC 2 Compliant', description: 'Enterprise security standards' },
              { icon: Zap, title: 'Sub-Second Response', description: 'Lightning-fast AI processing' },
              { icon: TrendingUp, title: 'Auto-Scaling', description: 'Handle unlimited concurrent calls' },
              { icon: Clock, title: '99.9% Uptime', description: 'Always available, never down' },
              { icon: Brain, title: 'Multi-Language', description: 'Support 50+ languages' },
              { icon: MessageSquare, title: 'CRM Integration', description: 'Sync with Salesforce, HubSpot' },
              { icon: Shield, title: 'HIPAA Ready', description: 'Healthcare-grade compliance' },
              { icon: Zap, title: 'Real-Time Analytics', description: 'Live dashboards & reporting' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-purple-900/95"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Deploy Your AI Agent?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start with a free demo and see how AI can transform your operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white hover:bg-gray-100 rounded-lg transition-all shadow-xl"
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
      </section>
    </div>
  );
}

// Add missing imports
import { Calendar, Phone } from 'lucide-react';
