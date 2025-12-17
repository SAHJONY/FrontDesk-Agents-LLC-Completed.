"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface ConsentEnforcementProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export default function ConsentEnforcement({
  enabled,
  onToggle,
}: ConsentEnforcementProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Consent Enforcement</h3>
        <p className="text-sm text-neutral-500">
          Require explicit user consent before voice AI activation.
        </p>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <span className="text-sm">Enforce consent</span>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </CardContent>
    </Card>
  );
}
