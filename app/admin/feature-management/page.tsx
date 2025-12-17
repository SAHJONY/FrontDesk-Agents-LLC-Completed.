import React from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

/* =======================
   Types
======================= */

type FeatureStatus = "ACTIVE" | "INACTIVE";

interface Feature {
  id: string;
  name: string;
  description: string;
  status: FeatureStatus;
}

interface FeatureCardProps {
  feature: Feature;
  onToggle: (featureId: string, enabled: boolean) => void;
}

/* =======================
   FeatureCard Component
======================= */

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  onToggle,
}) => {
  const isActive = feature.status === "ACTIVE";
  const StatusIcon = isActive ? CheckCircleIcon : XCircleIcon;

  return (
    <Card className="flex items-center justify-between p-4">
      <div className="flex items-start gap-4">
        <StatusIcon
          className={`h-6 w-6 ${
            isActive ? "text-emerald-500" : "text-neutral-400"
          }`}
        />
        <div>
          <h3 className="font-semibold">{feature.name}</h3>
          <p className="text-sm text-neutral-500">
            {feature.description}
          </p>
        </div>
      </div>

      <Switch
        checked={isActive}
        onCheckedChange={(checked) =>
          onToggle(feature.id, checked)
        }
      />
    </Card>
  );
};

/* =======================
   Page Component
======================= */

const features: Feature[] = [
  {
    id: "voice-ai",
    name: "Voice AI",
    description: "Inbound & outbound AI phone agent",
    status: "ACTIVE",
  },
  {
    id: "sms-ai",
    name: "SMS Automation",
    description: "Automated SMS conversations",
    status: "INACTIVE",
  },
];

export default function FeatureManagementPage() {
  const handleToggle = (featureId: string, enabled: boolean) => {
    console.log("Toggle feature:", featureId, enabled);
    // aquí luego conectas backend / flags
  };

  return (
    <div className="space-y-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
