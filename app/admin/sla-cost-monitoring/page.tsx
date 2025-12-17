import React from "react";
import {
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

/* =======================
   Types
======================= */

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: number | string;
  unit?: string;
  color: "emerald" | "red" | "yellow" | "blue" | "neutral";
}

/* =======================
   MetricCard Component
======================= */

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  title,
  value,
  unit,
  color,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-200">
    <div className="flex items-center gap-3">
      <Icon className={`h-8 w-8 text-${color}-600`} />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>

    <div className="mt-4">
      <span className="text-3xl font-bold">{value}</span>
      {unit && (
        <span className="ml-1 text-sm text-neutral-500">{unit}</span>
      )}
    </div>
  </div>
);

/* =======================
   Page
======================= */

export default function SLACostMonitoringPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        icon={ClockIcon}
        title="Avg Response Time"
        value={2.4}
        unit="sec"
        color="emerald"
      />

      <MetricCard
        icon={CurrencyDollarIcon}
        title="Cost per Call"
        value={0.18}
        unit="USD"
        color="blue"
      />

      <MetricCard
        icon={ExclamationTriangleIcon}
        title="SLA Breaches"
        value={3}
        color="red"
      />
    </div>
  );
}
