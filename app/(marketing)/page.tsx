import React from "react";
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

// Componente de Funcionalidad Clave
const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="p-6 bg-[#0a1929]/70 rounded-xl border border-gray-800 shadow-2xl transition-all duration-300 hover:border-cyan-600 hover:shadow-cyan-900/50">
    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default function MarketingPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid gap-8 md:grid-cols-3">
      <FeatureCard
        icon={PhoneIcon}
        title="AI Receptionist"
        description="Responde llamadas 24/7 como un humano real, sin perder clientes."
      />
      <FeatureCard
        icon={ChatBubbleLeftRightIcon}
        title="Smart Conversations"
        description="Gestiona mensajes, leads y seguimientos automáticamente."
      />
      <FeatureCard
        icon={CalendarDaysIcon}
        title="Auto Scheduling"
        description="Agenda citas en tiempo real sin intervención humana."
      />
    </section>
  );
}
