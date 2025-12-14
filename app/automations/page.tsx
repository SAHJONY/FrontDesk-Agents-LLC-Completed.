'use client';

import { useState } from 'react';
import { Card, Title, Text, List, ListItem, Badge } from '@tremor/react';
import { 
  CalendarIcon, 
  PhoneIcon, 
  CreditCardIcon, 
  UsersIcon,
  Cog6ToothIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  HomeModernIcon,
  CheckCircleIcon,
  ClockIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

interface Automation {
  name: string;
  icon: React.ElementType;
  description: string;
  status: 'Active' | 'In Development' | 'Ready';
  category: 'Core Revenue' | 'Finance' | 'Support';
  metrics?: {
    calls?: number;
    savings?: string;
    accuracy?: string;
  };
}

const automations: Automation[] = [
  {
    name: 'IA Recepcionista 24/7',
    icon: PhoneIcon,
    description: 'Contesta, enruta, transcribe y detecta intención.',
    status: 'Active',
    category: 'Core Revenue',
    metrics: {
      calls: 2847,
      accuracy: '98.5%',
    }
  },
  {
    name: 'Agendado Automático',
    icon: CalendarIcon,
    description: 'Google/Outlook/Calendly + reglas por servicio para citas.',
    status: 'Active',
    category: 'Core Revenue',
    metrics: {
      calls: 428,
      accuracy: '96.2%',
    }
  },
  {
    name: 'Lead Scoring por Voz',
    icon: UsersIcon,
    description: 'Califica leads por presupuesto, urgencia y ubicación.',
    status: 'Ready',
    category: 'Core Revenue',
  },
  {
    name: 'Pagos por Voz/SMS',
    icon: CreditCardIcon,
    description: 'Genera links seguros y procesa depósitos de forma automática. (Week 3)',
    status: 'In Development',
    category: 'Finance',
  },
  {
    name: 'No-show Killer',
    icon: CalendarIcon,
    description: 'Recordatorios inteligentes y reprogramación automática para reducir faltas.',
    status: 'In Development',
    category: 'Finance',
  },
];

const industryTemplates = [
  {
    name: 'Health',
    subtitle: 'HIPAA Ready',
    icon: BuildingOfficeIcon,
    color: 'from-blue-500 to-cyan-500',
    features: ['HIPAA Compliance', 'Appointment Scheduling', 'Insurance Verification', 'Patient Follow-ups'],
    active: true
  },
  {
    name: 'Legal',
    subtitle: 'Consult Scheduling',
    icon: ScaleIcon,
    color: 'from-purple-500 to-pink-500',
    features: ['Case Intake', 'Consultation Booking', 'Document Collection', 'Client Screening'],
    active: false
  },
  {
    name: 'Real Estate',
    subtitle: 'Lead Qualification',
    icon: HomeModernIcon,
    color: 'from-green-500 to-emerald-500',
    features: ['Property Inquiries', 'Showing Scheduling', 'Lead Qualification', 'Follow-up Automation'],
    active: false
  },
];

export default function AutomationsPage() {
  const [automationStates, setAutomationStates] = useState<Record<string, boolean>>(
    automations.reduce((acc, auto) => ({ ...acc, [auto.name]: auto.status === 'Active' }), {})
  );

  const toggleAutomation = (name: string) => {
    setAutomationStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Ready': return 'yellow';
      case 'In Development': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return CheckCircleIcon;
      case 'Ready': return ClockIcon;
      case 'In Development': return BeakerIcon;
      default: return Cog6ToothIcon;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#1a2332] to-[#000814]">
      <main className="p-6 md:p-10">
        {/* Premium Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Cog6ToothIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Automation Management
              </h1>
              <p className="text-gray-400 mt-1">
                Configure and monitor the 6 Core Automations launched in the 30-day sprint
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-400 text-sm">Active Automations</Text>
                  <div className="text-2xl font-bold text-white mt-1">
                    {automations.filter(a => a.status === 'Active').length}/{automations.length}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-400 text-sm">Total Calls Handled</Text>
                  <div className="text-2xl font-bold text-white mt-1">3,275</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-400 text-sm">System Uptime</Text>
                  <div className="text-2xl font-bold text-white mt-1">99.9%</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Automations List - Premium Style */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title className="text-white text-2xl font-bold">Core & Financial Automations</Title>
              <Text className="text-gray-400 mt-1">Manage your revenue-generating workflows</Text>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              + Add Automation
            </button>
          </div>

          <div className="space-y-4">
            {automations.map((item) => {
              const StatusIcon = getStatusIcon(item.status);
              const isActive = automationStates[item.name];
              
              return (
                <div
                  key={item.name}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                  
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        item.status === 'Active' ? 'from-green-500 to-emerald-500' :
                        item.status === 'Ready' ? 'from-yellow-500 to-orange-500' :
                        'from-blue-500 to-cyan-500'
                      } flex items-center justify-center flex-shrink-0`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Text className="font-bold text-lg text-white">{item.name}</Text>
                          <Badge color={getStatusColor(item.status)} className="flex items-center gap-1">
                            <StatusIcon className="w-3 h-3" />
                            {item.status}
                          </Badge>
                          <span className="text-xs text-gray-500 px-2 py-1 bg-white/5 rounded">
                            {item.category}
                          </span>
                        </div>
                        <Text className="text-sm text-gray-400 mb-3">{item.description}</Text>
                        
                        {/* Metrics */}
                        {item.metrics && (
                          <div className="flex items-center gap-4 mt-2">
                            {item.metrics.calls && (
                              <div className="text-sm">
                                <span className="text-gray-500">Calls: </span>
                                <span className="text-cyan-400 font-semibold">{item.metrics.calls.toLocaleString()}</span>
                              </div>
                            )}
                            {item.metrics.accuracy && (
                              <div className="text-sm">
                                <span className="text-gray-500">Accuracy: </span>
                                <span className="text-green-400 font-semibold">{item.metrics.accuracy}</span>
                              </div>
                            )}
                            {item.metrics.savings && (
                              <div className="text-sm">
                                <span className="text-gray-500">Savings: </span>
                                <span className="text-emerald-400 font-semibold">{item.metrics.savings}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleAutomation(item.name)}
                        disabled={item.status === 'In Development'}
                        className={`relative w-14 h-7 rounded-full transition-all ${
                          isActive && item.status !== 'In Development'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gray-600'
                        } ${item.status === 'In Development' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                          isActive && item.status !== 'In Development' ? 'left-8' : 'left-1'
                        }`} />
                      </button>

                      {/* Configure Button */}
                      <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white hover:border-cyan-500/50 transition-all text-sm font-medium">
                        Configure
                      </button>

                      {/* View Details */}
                      <button className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-all text-sm font-medium">
                        Details →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industry Templates Section - Premium Style */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <Title className="text-white text-2xl font-bold">Industry-Specific Templates</Title>
            <Text className="text-gray-400 mt-1">
              Quickly deploy automation bundles optimized for key verticals
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryTemplates.map((template) => (
              <div
                key={template.name}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                
                <div className="relative">
                  {/* Template Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                      <template.icon className="w-7 h-7 text-white" />
                    </div>
                    {template.active && (
                      <Badge color="green" className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Active
                      </Badge>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
                    <Text className="text-cyan-400 text-sm font-medium">{template.subtitle}</Text>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-4">
                    {template.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <Text className="text-sm text-gray-400">{feature}</Text>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    template.active
                      ? 'bg-white/10 text-gray-400 cursor-default'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                  }`}>
                    {template.active ? 'Currently Active' : 'Deploy Template'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all font-medium">
            View Automation Logs
          </button>
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all font-medium">
            Export Performance Report
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium">
            Request Custom Automation
          </button>
        </div>
      </main>
    </div>
  );
                                                                             }
