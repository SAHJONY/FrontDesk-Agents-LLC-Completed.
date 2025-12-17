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
}: PlanCardProps): JSX.Element => {
  const isCurrent = plan.name === currentPlanName;
  const finalPrice = Math.round(plan.price * priceMultiplier);

  return (
    <div
      className={`rounded-xl border p-6 bg-[#0a1929]/70 ${
        isCurrent ? "border-emerald-500" : "border-gray-800"
      }`}
    >
      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>

      <div className="text-3xl font-extrabold text-white mb-4">
        ${finalPrice}
        <span className="text-sm font-normal text-gray-400"> /mo</span>
      </div>

      <ul className="space-y-2 mb-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-gray-300">
            <Check className="w-4 h-4 text-emerald-400" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        disabled={isCurrent}
        className="w-full py-2 rounded-lg bg-emerald-500 text-white font-semibold disabled:opacity-50"
      >
        {isCurrent ? "Current Plan" : "Choose Plan"}
      </button>
    </div>
  );
};

export default function SubscriptionPage(): JSX.Element {
  const plans: Plan[] = [
    {
      name: "Starter",
      price: 399,
      features: ["1 AI Agent", "24/7 Coverage"],
    },
    {
      name: "Professional",
      price: 899,
      features: ["3 AI Agents", "CRM Integration"],
    },
    {
      name: "Enterprise",
      price: 1799,
      features: ["Unlimited Agents", "SSO & SLA"],
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
          />
        ))}
      </div>
    </section>
  );
}
