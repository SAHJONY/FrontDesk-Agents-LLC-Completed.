"use client";

import React, { useState } from "react";
import { LucideIcon, User, Settings, CheckCircle } from "lucide-react";

/* =========================
   Tipos
========================= */

interface Step {
  label: string;
  icon: LucideIcon;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

/* =========================
   Step Indicator
========================= */

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => (
  <div className="flex justify-between items-center mb-10 w-full max-w-4xl mx-auto">
    {steps.map((step, index) => {
      const IconComponent = step.icon;
      const isActive = index <= currentStep;

      return (
        <div
          key={step.label}
          className="flex flex-col items-center flex-1"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border ${
              isActive
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white text-neutral-400 border-neutral-300"
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <span
            className={`mt-2 text-sm ${
              isActive ? "text-emerald-600" : "text-neutral-400"
            }`}
          >
            {step.label}
          </span>
        </div>
      );
    })}
  </div>
);

/* =========================
   Page
========================= */

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps: Step[] = [
    { label: "Profile", icon: User },
    { label: "Configuration", icon: Settings },
    { label: "Complete", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <StepIndicator currentStep={currentStep} steps={steps} />

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-4">
          Onboarding – Step {currentStep + 1}
        </h1>

        <p className="text-neutral-600 mb-6">
          This is a placeholder for onboarding step content.
        </p>

        <div className="flex justify-between">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))}
            className="px-4 py-2 rounded border disabled:opacity-50"
          >
            Back
          </button>

          <button
            onClick={() =>
              setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
            }
            className="px-4 py-2 rounded bg-emerald-500 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
