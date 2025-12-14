// ./app/automations/page.tsx

'use client';

import { Card, Title, Text, List, ListItem, Badge } from '@tremor/react';
import { 
  CalendarIcon, 
  PhoneIcon, 
  CreditCardIcon, 
  UsersIcon, 
  WalletIcon 
} from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Automation {
  id: number;
  name: string;
  icon: React.ElementType;
  description: string;
  category: 'Core Revenue' | 'Finance' | 'Support';
  enabled: boolean;
}

const initialAutomations: Automation[] = [
  {
    id: 1,
    name: 'IA Recepcionista 24/7',
    icon: PhoneIcon,
    description: 'Contesta, enruta, transcribe y detecta intención de llamada.',
    category: 'Core Revenue',
    enabled: true,
  },
  {
    id: 2,
    name: 'Agendado Automático',
    icon: CalendarIcon,
    description: 'Sincroniza con Google/Outlook/Calendly y aplica reglas de servicio.',
    category: 'Core Revenue',
    enabled: true,
  },
  {
    id: 3,
    name: 'Lead Scoring por Voz',
    icon: UsersIcon,
    description: 'Califica leads en tiempo real por presupuesto y urgencia.',
    category: 'Core Revenue',
    enabled: false,
  },
  {
    id: 4,
    name: 'Pagos y Cobros por Voz/SMS',
    icon: CreditCardIcon,
    description: 'Generación de links de pago seguros y confirmación de depósitos.',
    category: 'Finance',
    enabled: false,
  },
  {
    id: 5,
    name: 'CRM Sync (HubSpot/Salesforce)',
    icon: WalletIcon,
    description: 'Sincronización bidireccional de leads y actividad de llamadas.',
    category: 'Support',
    enabled: true,
  },
];

export default function AutomationsPage() {
    const [automations, setAutomations] = useState(initialAutomations);

    const toggleAutomation = (id: number) => {
        setAutomations(prev => 
            prev.map(auto => 
                auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
            )
        );
    };

    return (
        <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <Title className="text-3xl font-bold text-gray-900">
                🤖 AI Agents & Automation Hub
            </Title>
            <Text className="mt-2 text-lg text-gray-600">
                Configure, activate, and optimize your high-ROI automations based on your sector.
            </Text>

            {/* --- Core Automations List --- */}
            <Card className="mt-6">
                <Title className="text-xl font-semibold">Active Automation Flows</Title>
                <List className="mt-4 divide-y divide-gray-200">
                    {automations.map((item) => (
                        <ListItem key={item.id} className="flex justify-between items-center py-4">
                            <div className="flex items-start space-x-4">
                                <item.icon className="w-6 h-6 mt-1 text-indigo-600 flex-shrink-0" />
                                <div>
                                    <Text className="font-semibold text-lg text-gray-900">{item.name}</Text>
                                    <Text className="text-sm text-gray-500">{item.description}</Text>
                                    <Badge 
                                        color={item.category === 'Core Revenue' ? 'green' : item.category === 'Finance' ? 'blue' : 'yellow'} 
                                        className="mt-1"
                                    >
                                        {item.category}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`text-sm font-medium ${item.enabled ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.enabled ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                                <button
                                    onClick={() => toggleAutomation(item.id)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                        item.enabled 
                                            ? 'bg-red-500 text-white hover:bg-red-600' 
                                            : 'bg-green-500 text-white hover:bg-green-600'
                                    }`}
                                >
                                    {item.enabled ? 'Disable' : 'Activate'}
                                </button>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Card>

            {/* --- Industry Templates Section (Reflects Image) --- */}
            <Card className="mt-8">
                <Title className="text-xl font-semibold">Quick Deploy: Industry Templates</Title>
                <Text className="text-gray-600">Instantly apply pre-configured, compliance-ready settings for your vertical.</Text>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Link/Button for Healthcare */}
                    <a href="#" className="p-4 border rounded-lg hover:bg-indigo-50 transition-colors flex flex-col items-center justify-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15m7.5 0l-4.5 4.5-4.5-4.5m9 0l4.5 4.5 4.5-4.5"/></svg>
                        <Text className="font-medium text-indigo-600 text-center">Healthcare (HIPAA Ready)</Text>
                        <p className="text-xs text-gray-500">Includes secure data handling & appointment reminders.</p>
                    </a>
                    
                    {/* Link/Button for Legal */}
                    <a href="#" className="p-4 border rounded-lg hover:bg-indigo-50 transition-colors flex flex-col items-center justify-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75A.75.75 0 0112.75 7.5v9a.75.75 0 01-1.5 0v-9A.75.75 0 0112 6.75zM12 6.75L6.75 12H17.25L12 6.75z"/></svg>
                        <Text className="font-medium text-indigo-600 text-center">Legal (Client Intake & Discovery)</Text>
                        <p className="text-xs text-gray-500">Focuses on call recording consent and secure client scheduling.</p>
                    </a>
                    
                    {/* Link/Button for Real Estate */}
                    <a href="#" className="p-4 border rounded-lg hover:bg-indigo-50 transition-colors flex flex-col items-center justify-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.955-8.955c.441-.44.97-.665 1.505-.665h.001c.535 0 1.064.225 1.505.665L21.75 12M4.5 9v.938c0 .445.18.87.502 1.173l.498.468M19.5 9v.938c0 .445-.18.87-.502 1.173l-.498.468M9 9h6m-3-3h.008M3.75 12H19.5M3.75 12v4.875c0 .445.18.87.502 1.173l.498.468M19.5 12v4.875c0 .445-.18.87-.502 1.173l-.498.468M7.5 16.5h9m-3-3h.008V16.5H12v-3.75h.008z"/></svg>
                        <Text className="font-medium text-indigo-600 text-center">Real Estate (Lead Qualification)</Text>
                        <p className="text-xs text-gray-500">Automates property interest filtering and tour scheduling.</p>
                    </a>
                </div>
            </Card>
        </main>
    );
}
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
