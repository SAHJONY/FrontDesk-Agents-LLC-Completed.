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
    Premium: 'text-cyan-400 bg-cyan-900/30 border-cyan-700',
  };

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md">
      <div className="flex items-start mb-4">
        <div className="p-3 bg-cyan-500/10 rounded-xl mr-4 flex-shrink-0">
          <Icon className="w-6 h-6 text-cyan-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${statusClasses[status]}`}>
          {status}
        </span>
        
        {status === 'Active' || status === 'Inactive' ? (
          <Link href={href} className="flex items-center text-sm font-bold text-cyan-500 hover:text-white transition">
            {status === 'Active' ? 'Configure' : 'Activate'}
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        ) : (
          <Link href="#" className="flex items-center text-sm font-bold text-slate-500 cursor-not-allowed">
            Locked
            <BoltIcon className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default async function AutomationsIndexPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;

  const automations = [
    {
      href: `/${locale}/automations/voice-ai`,
      title: 'Voice Receptionist (SARA.AI)',
      description: '24/7 human-like voice conversations, instant lead capture, and appointment booking.',
      icon: MicrophoneIcon,
      status: 'Active' as const,
    },
    {
      href: `/${locale}/automations/chat-agent`,
      title: 'Chatbot Lead Agent',
      description: 'Text-based AI for high-volume FAQs and personalized website greetings.',
      icon: ChatBubbleBottomCenterTextIcon,
      status: 'Inactive' as const,
    },
    {
      href: `/${locale}/automations/email-followup`,
      title: 'Automated Email Drips',
      description: 'Sequenced campaigns triggered by lead status to reduce cold lead friction.',
      icon: EnvelopeIcon,
      status: 'Premium' as const,
    },
    {
      href: `/${locale}/automations/payment-assist`,
      title: 'Billing Automation',
      description: 'Handles payment reminders, invoice generation, and subscription renewal alerts.',
      icon: CurrencyDollarIcon,
      status: 'Active' as const,
    },
  ];

  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
          AI Automation <span className="text-cyan-500">Suite</span>
        </h1>
        <p className="text-gray-400">
          Deploy and monitor your digital receptionist tools across the <strong className="text-white">{locale.toUpperCase()}</strong> market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
        {automations.map((item) => (
          <AutomationCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
