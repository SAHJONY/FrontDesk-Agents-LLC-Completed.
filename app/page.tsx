'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, DollarSign, Briefcase, Video, Settings, BarChart3, Shield, ArrowRight, Phone, CheckCircle } from 'lucide-react';

export default function FrontDeskAgentsApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'industries', label: 'Industries', icon: Briefcase },
    { id: 'demo', label: 'Demo', icon: Video },
    { id: 'setup', label: 'Setup', icon: Settings },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'admin', label: 'Admin', icon: Shield }
  ];

  const NavBar = () => (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-white">
              FD
            </div>
            <div>
              <div className="text-white font-semibold text-sm">FrontDesk Agents</div>
              <div className="text-cyan-400 text-xs">AI RECEPTIONIST</div>
            </div>
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2 hover:bg-gray-800 rounded-lg md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-2">
            {navigation.map(nav => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.id}
                  onClick={() => setCurrentPage(nav.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    currentPage === nav.id 
                      ? 'bg-cyan-500 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  {nav.label}
                </button>
              );
            })}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navigation.map(nav => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.id}
                  onClick={() => {
                    setCurrentPage(nav.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    currentPage === nav.id 
                      ? 'bg-cyan-500 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  {nav.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-cyan-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            24/7 AI Receptionists
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Turn every phone call<br />into booked revenue
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            FrontDesk Agents answers, qualifies, and books every caller in seconds. No voicemails. No missed calls. No lost leads.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/demo" className="bg-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 inline-flex items-center justify-center gap-2">
              Book a live demo
              <ArrowRight size={20} />
            </Link>
            <a href="tel:+12164804413" className="bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-colors border border-gray-700 inline-flex items-center justify-center gap-2">
              <Phone size={20} />
              Call +1 (216) 480-4413
            </a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500 transition-all">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
              <Phone className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">24/7 Availability</h3>
            <p className="text-gray-300 leading-relaxed">
              Never miss a call or booking opportunity, even outside business hours.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all">
            <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="text-green-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Booking</h3>
            <p className="text-gray-300 leading-relaxed">
              Automatically qualify leads and book appointments in real-time.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all">
            <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="text-purple-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Live Analytics</h3>
            <p className="text-gray-300 leading-relaxed">
              Track every call, conversion, and dollar in real-time.
            </p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <div className="relative w-full h-96 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
            <div className="relative z-10 text-center">
              <div className="w-32 h-32 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <div className="w-24 h-24 bg-cyan-500/30 rounded-full flex items-center justify-center">
                  <Phone className="text-cyan-400" size={48} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">AI-Powered Receptionist</h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Human-like conversations that feel genuine and professional
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm mt-6">
            <span>Powered by advanced AI</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-900">M</div>
              <span>Made with Manus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PricingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-cyan-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Simple, Transparent Pricing
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Start with demos,<br />scale with automation
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Start with manual demos and payments (Zelle, Cash App, invoice). When you're ready, we turn on full Stripe billing automation.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Starter Plan</h3>
              <p className="text-gray-400">Perfect for small businesses</p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold text-cyan-400">$399</div>
              <div className="text-gray-400 text-xl">/month</div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            {[
              '24/7 AI receptionist answering all calls',
              'Automatic appointment booking',
              'Lead qualification and routing',
              'Real-time analytics dashboard',
              'Bilingual support (English & Spanish)',
              'Unlimited call volume',
              'CRM integration',
              'Priority support'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="text-white" size={16} />
                </div>
                <span className="text-gray-300 text-lg">{feature}</span>
              </div>
            ))}
          </div>
          
          <Link href="/signup" className="w-full bg-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-cyan-600 transition-colors block text-center">
            Get Started Now
          </Link>
        </div>

        <div className="text-center text-gray-400">
          <p className="mb-2">🎉 14-day free trial • No credit card required</p>
          <p>Cancel anytime, no questions asked</p>
        </div>
      </div>
    </div>
  );

  const IndustriesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-cyan-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            528+ Industries
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            One AI receptionist,<br />any industry
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            FrontDesk Agents is built to answer, qualify, and book callers for real-world businesses — in English and Spanish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '🏥', title: 'Medical & Dental', desc: 'Clinics, practices, urgent care' },
            { icon: '⚖️', title: 'Legal Services', desc: 'Law firms, immigration' },
            { icon: '🔧', title: 'Home Services', desc: 'HVAC, plumbing, electrical' },
            { icon: '🏠', title: 'Real Estate', desc: 'Agencies, property management' },
            { icon: '🚗', title: 'Auto Services', desc: 'Repair shops, detailing' },
            { icon: '💇', title: 'Beauty & Wellness', desc: 'Salons, spas, fitness' },
            { icon: '💼', title: 'Professional', desc: 'Consulting, accounting' },
            { icon: '🏨', title: 'Hospitality', desc: 'Hotels, restaurants, events' }
          ].map((industry, idx) => (
            <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
              <div className="text-5xl mb-4">{industry.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{industry.title}</h3>
              <p className="text-gray-400 text-sm">{industry.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border border-cyan-500/30 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">🌍 Bilingual Support</h2>
          <p className="text-xl text-gray-300 mb-6">
            Full English and Spanish language support for maximum reach and customer satisfaction
          </p>
          <Link href="/demo" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Try It Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );

  const DemoPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-cyan-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Live Demo
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            See your AI receptionist<br />working for your business
          </h1>
          
          <p className="text-xl text-gray-300 mb-12">
            Experience FrontDesk Agents firsthand. Call our demo line or schedule a personalized walkthrough with our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/50 hover:border-cyan-500 transition-all">
            <div className="w-16 h-16 bg-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6">
              1
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Call the demo line</h3>
            <p className="text-gray-400 mb-6">
              Experience our AI receptionist in action by calling our demo number
            </p>
            <a
              href="tel:+12164804413"
              className="w-full bg-cyan-500 text-white py-4 rounded-xl font-semibold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              +1 (216) 480-4413
            </a>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/50 hover:border-purple-500 transition-all">
            <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6">
              2
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Schedule a walkthrough</h3>
            <p className="text-gray-400 mb-6">
              Book a personalized demo with our team to see how it works for your business
            </p>
            <Link
              href="/signup"
              className="w-full bg-purple-500 text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
            >
              <Video size={20} />
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const SetupPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-cyan-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Quick Setup
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get your AI receptionist<br />running in minutes
          </h1>
          
          <p className="text-xl text-gray-300 mb-12">
            Our onboarding wizard guides you through every step. No technical knowledge required. Most businesses are live within 30 minutes.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {[
            {
              num: '1',
              title: 'Connect Your Phone',
              desc: 'Link your business phone in seconds. We support all carriers.',
              color: 'bg-cyan-500',
              icon: '📱'
            },
            {
              num: '2',
              title: 'Customize Your Agent',
              desc: 'Set your business hours, services, and booking preferences.',
              color: 'bg-blue-500',
              icon: '⚙️'
            },
            {
              num: '3',
              title: 'Go Live',
              desc: 'Your AI receptionist starts answering calls immediately.',
              color: 'bg-purple-500',
              icon: '🚀'
            }
          ].map((step, idx) => (
            <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500 transition-all">
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0`}>
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <p className="text-gray-300 text-lg">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/signup"
          className="w-full bg-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50"
        >
          Start Setup Now
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );

  const DashboardPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-cyan-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Command Center
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Live call analytics &<br />booked revenue
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'CALLS TODAY', value: '127', change: '+12%', color: 'text-cyan-400' },
            { label: 'BOOKED', value: '34', change: '26.8%', color: 'text-cyan-400' },
            { label: 'REVENUE', value: '$8.5K', change: '+18%', color: 'text-green-400' },
            { label: 'RESPONSE TIME', value: '2.3s', change: 'Fast', color: 'text-cyan-400' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
              <div className="text-gray-400 text-xs mb-2 tracking-wider uppercase">{stat.label}</div>
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-green-400 text-sm font-semibold">↑ {stat.change}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6">📋 Recent Activity</h3>
          <div className="space-y-3">
            {[
              { time: '2 min ago', action: 'Booked appointment for John Smith', status: 'success', icon: '✅' },
              { time: '8 min ago', action: 'Answered inquiry from Sarah Johnson', status: 'info', icon: '📞' },
              { time: '15 min ago', action: 'Qualified lead from Michael Brown', status: 'success', icon: '✅' },
              { time: '23 min ago', action: 'Scheduled callback for Emma Wilson', status: 'pending', icon: '⏰' }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <div>
                    <div className="text-white font-medium">{activity.action}</div>
                    <div className="text-gray-400 text-sm">{activity.time}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  activity.status === 'success' ? 'bg-green-500/20 text-green-400' :
                  activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AdminPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-cyan-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Command Center
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI Agent Configuration<br />& Control
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              id: 'main',
              name: 'Main Receptionist',
              language: '🇺🇸 English',
              calls: 342,
              booked: 89,
              conversion: 26,
              color: 'cyan'
            },
            {
              id: 'spanish',
              name: 'Spanish Receptionist',
              language: '🇪🇸 Spanish',
              calls: 178,
              booked: 51,
              conversion: 29,
              color: 'purple'
            }
          ].map((agent) => (
            <div key={agent.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-${agent.color}-500 rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                    {agent.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                    <p className="text-gray-400 text-sm">{agent.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold text-sm">Online</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{agent.calls}</div>
                  <div className="text-gray-400 text-xs">Calls</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{agent.booked}</div>
                  <div className="text-gray-400 text-xs">Booked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{agent.conversion}%</div>
                  <div className="text-gray-400 text-xs">Rate</div>
                </div>
              </div>

              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Settings size={16} />
                Configure
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border border-cyan-500/30 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">⚡ Quick Settings</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              '🕐 Business Hours',
              '📞 Call Routing',
              '💰 Pricing Setup',
              '💬 Custom Greetings',
              '🔗 Integrations',
              '📊 Reports'
            ].map((setting, idx) => (
              <button key={idx} className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-colors text-left">
                {setting}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const pages: Record<string, JSX.Element> = {
    home: <HomePage />,
    pricing: <PricingPage />,
    industries: <IndustriesPage />,
    demo: <DemoPage />,
    setup: <SetupPage />,
    dashboard: <DashboardPage />,
    admin: <AdminPage />
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />
      {pages[currentPage]}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-900">M</div>
              <span>Made with Manus</span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 FrontDesk Agents LLC. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/legal/terms" className="text-gray-400 hover:text-white text-sm">Terms</Link>
              <Link href="/legal/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</Link>
              <Link href="/support" className="text-gray-400 hover:text-white text-sm">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
