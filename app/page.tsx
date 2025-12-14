'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  PhoneIcon, 
  SparklesIcon, 
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowRightIcon,
  StarIcon,
  PlayCircleIcon
} from '@heroicons/react/24/solid';

export default function PremiumHomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: ClockIcon,
      title: '24/7 Availability',
      description: 'Never miss a call. Sara works around the clock, handling inquiries and scheduling appointments while you sleep.',
      image: '/images/feature-247.jpg'
    },
    {
      icon: ShieldCheckIcon,
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security with full HIPAA compliance. Your patient data is protected with bank-level encryption.',
      image: '/images/feature-security.jpg'
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-Language Support',
      description: 'Communicate with patients in their preferred language. Sara speaks English, Spanish, French, and more.',
      image: '/images/feature-multilingual.jpg'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Natural Conversations',
      description: 'Advanced AI that understands context and speaks naturally. Patients won\'t believe they\'re talking to AI.',
      image: '/images/feature-conversation.jpg'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost Effective',
      description: 'Save up to 80% compared to traditional reception staff. No benefits, no overtime, no sick days.',
      image: '/images/feature-savings.jpg'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Dashboard',
      description: 'Track call metrics, appointment bookings, and customer satisfaction in real-time with actionable insights.',
      image: '/images/feature-analytics.jpg'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Martinez',
      role: 'Medical Director, Houston Family Clinic',
      image: '/images/testimonial-1.jpg',
      content: 'Sara has transformed our practice. We\'ve increased appointment bookings by 45% and patients love the instant response.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Practice Manager, TechDental',
      image: '/images/testimonial-2.jpg',
      content: 'The ROI was immediate. Within the first month, Sara paid for herself twice over. Our staff can now focus on patient care.',
      rating: 5
    },
    {
      name: 'Jennifer Adams',
      role: 'CEO, WellnessPro Clinics',
      image: '/images/testimonial-3.jpg',
      content: 'Implementation was seamless. The AI handles 80% of our calls perfectly. It\'s like having a superstar receptionist 24/7.',
      rating: 5
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime Guarantee', sublabel: 'Always available' },
    { value: '< 2s', label: 'Response Time', sublabel: 'Lightning fast' },
    { value: '10k+', label: 'Calls Handled', sublabel: 'Monthly average' },
    { value: '98%', label: 'Satisfaction Rate', sublabel: 'Customer approval' }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '299',
      description: 'Perfect for small practices',
      features: [
        'Up to 500 calls/month',
        '24/7 AI receptionist',
        'Basic scheduling',
        'Email support',
        'Multi-language support'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '599',
      description: 'Most popular for growing practices',
      features: [
        'Up to 2,000 calls/month',
        '24/7 AI receptionist',
        'Advanced scheduling',
        'Priority support',
        'Multi-language support',
        'Custom voice & personality',
        'Analytics dashboard',
        'CRM integration'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large healthcare organizations',
      features: [
        'Unlimited calls',
        'Multiple AI agents',
        'White-label solution',
        'Dedicated success manager',
        'Custom integrations',
        'Advanced compliance',
        'SLA guarantee',
        'On-premise option'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-[#000814]">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <SparklesIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-white">AI-Powered Reception</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Transform Your</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Front Desk
                </span>
                <br />
                <span className="text-white">With AI Agents</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                Meet Sara - Your 24/7 AI receptionist that handles calls, schedules appointments, 
                and delivers exceptional customer service with human-like conversation.
              </p>

              <div className="flex flex-wrap gap-3">
                {['24/7 Availability', 'Multi-language', 'HIPAA Compliant', 'No Setup Fee'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                    <CheckCircleIcon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="tel:+12164804413"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <PhoneIcon className="w-5 h-5" />
                    Call Sara Now: +1 (216) 480-4413
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                
                <Link 
                  href="/demo"
                  className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <PlayCircleIcon className="w-5 h-5" />
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                {stats.slice(0, 3).map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                    {idx < 2 && <div className="w-px h-12 bg-white/10 ml-6" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl rounded-full transform scale-110" />
                
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
                    <div className="aspect-[4/5] relative bg-gradient-to-br from-cyan-500 to-blue-600">
                      <Image
                        src="/images/hero-receptionist.jpg"
                        alt="Professional AI Receptionist Sara"
                        fill
                        className="object-cover"
                        priority
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-green-500/90 backdrop-blur-md rounded-full shadow-lg animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        <span className="text-sm font-medium text-white">Live Now</span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                            <SparklesIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Sara - AI Agent</div>
                            <div className="text-sm text-gray-300">Ready to assist</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* Features Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">FrontDesk Agents</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade AI reception that scales with your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  <div className="mt-6 flex items-center text-cyan-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-blue-500/5 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Healthcare Leaders</span>
            </h2>
            <p className="text-xl text-gray-400">See what our clients say about Sara</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
              <div className="absolute top-8 left-8 text-6xl text-cyan-500/20">"</div>
              
              <div className="relative">
                <div className="flex items-center gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-2xl text-gray-200 text-center leading-relaxed mb-8">
                  {testimonials[activeTestimonial].content}
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-400">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === activeTestimonial 
                          ? 'bg-cyan-400 w-8' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-400">Choose the plan that fits your practice</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-white/5 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 ${
                  plan.highlighted
                    ? 'border-cyan-500 scale-105 shadow-2xl shadow-cyan-500/20 bg-white/10'
                    : 'border-white/10 hover:border-cyan-500/50 hover:scale-105'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="text-5xl font-bold text-white mb-2">
                    {plan.price !== 'Custom' && '$'}{plan.price}
                  </div>
                  {plan.price !== 'Custom' && <div className="text-gray-400">/month</div>}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact-sales"
                  className={`block w-full py-4 rounded-full font-semibold text-center transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Transform Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Front Desk?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Call Sara now and experience the future of customer service
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+12164804413"
                className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-xl text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  <PhoneIcon className="w-6 h-6" />
                  +1 (216) 480-4413
                </span>
              </a>
              
              <Link
                href="/demo"
                className="px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-xl text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <PlayCircleIcon className="w-6 h-6" />
                Watch Demo
              </Link>
            </div>
            
            <p className="text-gray-400 mt-8">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
