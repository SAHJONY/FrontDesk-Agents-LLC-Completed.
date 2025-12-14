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

            {/* --- Industry Templates Section --- */}
            <Card className="mt-8">
                <Title className="text-xl font-semibold">Quick Deploy: Industry Templates</Title>
                <Text className="text-gray-600">Instantly apply pre-configured, compliance-ready settings for your vertical.</Text>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="#" className="p-4 border rounded-lg hover:bg-indigo-50 transition-colors flex flex-col items-center justify-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15m7.5 0l-4.5 4.5-4.5-4.5m9 0l4.5 4.5 4.5-4.5"/></svg>
                        <Text className="font-medium text-indigo-600 text-center">Healthcare (HIPAA Ready)</Text>
                        <p className="text-xs text-gray-500">Includes secure data handling & appointment reminders.</p>
                    </a>
                    
                    <a href="#" className="p-4 border rounded-lg hover:bg-indigo-50 transition-colors flex flex-col items-center justify-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75A.75.75 0 0112.75 7.5v9a.75.75 0 01-1.5 0v-9A.75.75 0 0112 6.75zM12 6.75L6.75 12H17.25L12 6.75z"/></svg>
                        <Text className="font-medium text-indigo-600 text-center">Legal (Client Intake & Discovery)</Text>
                        <p className="text-xs text-gray-500">Focuses on call recording consent and secure client scheduling.</p>
                    </a>
                    
                    <a href="#" className="p-4 border rounded-lg hover:bg-indigo-50 transition-colors flex flex-col items-center justify-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.955-8.955c.441-.44.97-.665 1.505-.665h.001c.535 0 1.064.225 1.505.665L21.75 12M4.5 9v.938c0 .445.18.87.502 1.173l.498.468M19.5 9v.938c0 .445-.18.87-.502 1.173l-.498.468M9 9h6m-3-3h.008M3.75 12H19.5M3.75 12v4.875c0 .445.18.87.502 1.173l.498.468M19.5 12v4.875c0 .445-.18.87-.502 1.173l-.498.468M7.5 16.5h9m-3-3h.008V16.5H12v-3.75h.008z"/></svg>
                        <Text className="font-medium text-indigo-600 text-center">Real Estate (Lead Qualification)</Text>
                        <p className="text-xs text-gray-500">Automates property interest filtering and tour scheduling.</p>
                    </a>
                </div>
            </Card>

            {/* --- CALL TO ACTION BANNER (Corrected JSX attributes) --- */}
            <div className="mt-12 p-8 bg-gray-900 text-white text-center rounded-xl shadow-2xl border border-cyan-500/50">
                <h3 className="text-3xl font-extrabold text-yellow-400">CALL TO LEARN MORE</h3> 
                <p className="mt-2 text-lg font-medium">Discover how SARA can explain the system for your business.</p> 
                <a 
                    href="tel:+12164804413" 
                    className="mt-6 inline-block px-10 py-4 text-3xl font-extrabold rounded-full bg-cyan-400 text-gray-900 hover:bg-cyan-300 transition-colors shadow-2xl"
                >
                    +1 (216) 480-4413
                </a>
                <div className="mt-4 text-sm text-gray-500">
                    AI Voice Powered by Bland.AI
                </div>
            </div>
        </main>
    );
}
