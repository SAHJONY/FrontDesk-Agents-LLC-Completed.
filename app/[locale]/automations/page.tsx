// ./app/(client)/automations/page.tsx

import React from 'react';
import Link from 'next/link';
import { 
  MicrophoneIcon, 
  ChatBubbleBottomCenterTextIcon,
  BoltIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface AutomationCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'Active' | 'Inactive' | 'Premium';
}

const AutomationCard: React.FC<AutomationCardProps> = ({ href, title, description, icon: Icon, status }) => {
  const statusClasses = {
    Active: 'text-green-400 bg-green-900/30 border-green-700',
    Inactive: 'text-gray-500 bg-gray-800/30 border-gray-700',
    Premium: 'text-[var(--color-gold)] bg-yellow-900/30 border-yellow-700',
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between hover:border-[var(--color-primary)] transition-all duration-300">
      <div className="flex items-start mb-4">
        <Icon className="w-8 h-8 text-[var(--color-primary)] mr-4 flex-shrink-0" />
        <div>
          <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusClasses[status]}`}>
          {status}
        </span>
        
        {status === 'Active' || status === 'Inactive' ? (
          <Link href={href} className="flex items-center text-sm font-medium text-[var(--color-primary)] hover:text-white transition">
            {status === 'Active' ? 'Manage Settings' : 'Activate Now'}
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        ) : (
          <Link href="/settings/billing" className="flex items-center text-sm font-medium text-[var(--color-gold)] hover:text-white transition">
            Upgrade Plan
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default function AutomationsIndexPage() {
  const automations = [
    {
      href: '/automations/voice-ai',
      title: 'Voice Receptionist (SARA.AI)',
      description: '24/7 human-like voice conversations, instant lead capture, and appointment booking on your website.',
      icon: MicrophoneIcon,
      status: 'Active' as const,
    },
    {
      href: '/automations/chat-agent',
      title: 'Chatbot Lead Agent',
      description: 'Text-based AI for high-volume FAQs, personalized greetings, and form completion.',
      icon: ChatBubbleBottomCenterTextIcon,
      status: 'Inactive' as const,
    },
    {
      href: '/automations/email-followup',
      title: 'Automated Email Drips',
      description: 'Sequenced email campaigns triggered by lead status, reducing cold lead friction.',
      icon: EnvelopeIcon,
      status: 'Premium' as const,
    },
    {
      href: '/automations/sms-retargeting',
      title: 'SMS Retargeting Engine',
      description: 'Use intelligent SMS to re-engage warm leads who dropped off the booking process.',
      icon: BoltIcon,
      status: 'Premium' as const,
    },
    {
      href: '/automations/payment-assist',
      title: 'Billing Automation',
      description: 'Handles payment reminders, invoice generation, and subscription renewal alerts.',
      icon: CurrencyDollarIcon,
      status: 'Active' as const,
    },
  ];

  return (
    <div className="p-8 md:p-12 w-full">
      <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center">
        <BoltIcon className="w-8 h-8 mr-3 text-[var(--color-gold)]" />
        AI Automation Suite
      </h1>
      <p className="text-gray-400 mb-10">
        Configure and monitor all your digital receptionist tools from a single command center.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {automations.map((item) => (
          <AutomationCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
