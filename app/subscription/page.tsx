"use client";

import React from "react";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  price: number;
  features: string[];
};

type PlanCardProps = {
  plan: Plan;
  currentPlanName?: string;
  isPromoActive?: boolean;
  priceMultiplier?: number;
};

const PlanCard = ({
  plan,
  currentPlanName,
  isPromoActive = false,
  priceMultiplier = 1,
}: PlanCardProps) => {
  const isCurrent = plan.name === currentPlanName;
  const finalPrice = Math.round(plan.price * priceMultiplier);

  return (
    <div
      className={`rounded-xl border p-6 bg-[#0a1929]/70 transition ${
        isCurrent
          ? "border-emerald-500 shadow-emerald-900/40"
          : "border-gray-800"
      }`}
    >
      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>

      <div className="text-3xl font-extrabold text-white mb-4">
        ${finalPrice}
        <span className="text-sm font-normal text-gray-400"> /mo</span>
      </div>

      {isPromoActive && (
        <div className="mb-4 text-sm text-emerald-400">
          Promo applied
        </div>
      )}

      <ul className="space-y-2 mb-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-gray-300">
            <Check className="w-4 h-4 text-emerald-400" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-2 rounded-lg font-semibold transition ${
          isCurrent
            ? "bg-gray-700 text-gray-300 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-600 text-white"
        }`}
        disabled={isCurrent}
      >
        {isCurrent ? "Current Plan" : "Choose Plan"}
      </button>
    </div>
  );
};

export default function SubscriptionPage() {
  const plans: Plan[] = [
    {
      name: "Starter",
      price: 399,
      features: ["1 AI Agent", "24/7 Coverage", "Single Language"],
    },
    {
      name: "Professional",
      price: 899,
      features: [
        "3 AI Agents",
        "Multilingual",
        "CRM Integration",
      ],
    },
    {
      name: "Enterprise",
      price: 1799,
      features: [
        "Unlimited Agents",
        "SSO & SLA",
        "Dedicated Manager",
      ],
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold text-white text-center mb-12">
        Subscription Plans
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            currentPlanName="Professional"
            isPromoActive={false}
          />
        ))}
      </div>
    </section>
  );
}
