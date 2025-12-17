'use client';

import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import {
  fetchAutomationConfig,
  updateAutomationConfig,
  AutomationConfig,
} from '@/services/automation.service';

/**
 * EXTENSIÓN LOCAL DEL TIPO
 * No rompe backend ni servicios
 */
type AutomationUIConfig = AutomationConfig & {
  autoReply: boolean;
  autoAssign: boolean;
  afterHours: boolean;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const AutomationSettingsCard: React.FC = () => {
  const [config, setConfig] = useState<AutomationUIConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchAutomationConfig();

        if (mounted) {
          setConfig({
            autoReply: false,
            autoAssign: false,
            afterHours: false,
            ...data,
          });
        }
      } catch {
        if (mounted) setError('Failed to load automation settings');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const toggle = async (key: keyof AutomationUIConfig) => {
    if (!config) return;

    const next = { ...config, [key]: !config[key] };
    setConfig(next);
    setSaving(true);

    try {
      await updateAutomationConfig(next);
    } catch {
      setError('Failed to save changes');
      setConfig(config); // rollback
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border p-6 text-sm text-neutral-500">
        Loading automation settings…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!config) return null;

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Automation Settings</h3>

      <div className="space-y-4">
        <SettingRow
          title="Auto-Reply"
          description="Automatically reply to inbound messages"
          checked={config.autoReply}
          onChange={() => toggle('autoReply')}
          disabled={saving}
        />

        <SettingRow
          title="Auto-Assign"
          description="Assign conversations automatically"
          checked={config.autoAssign}
          onChange={() => toggle('autoAssign')}
          disabled={saving}
        />

        <SettingRow
          title="After-Hours Automation"
          description="Enable automation outside business hours"
          checked={config.afterHours}
          onChange={() => toggle('afterHours')}
          disabled={saving}
        />
      </div>
    </div>
  );
};

const SettingRow = ({
  title,
  description,
  checked,
  onChange,
  disabled,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
}) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-neutral-500">{description}</p>
    </div>
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      className={classNames(disabled && 'opacity-60')}
    />
  </div>
);

export default AutomationSettingsCard;
