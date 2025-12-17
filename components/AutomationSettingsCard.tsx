'use client';

import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import {
  fetchAutomationConfig,
  updateAutomationConfig,
  AutomationConfig,
} from '@/services/automation.service';

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const AutomationSettingsCard: React.FC = () => {
  const [config, setConfig] = useState<AutomationConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchAutomationConfig();
        if (mounted) setConfig(data);
      } catch (e) {
        if (mounted) setError('Failed to load automation settings');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const toggle = async (key: keyof AutomationConfig) => {
    if (!config) return;
    const next = { ...config, [key]: !config[key] };
    setConfig(next);
    setSaving(true);
    try {
      await updateAutomationConfig(next);
    } catch {
      setError('Failed to save changes');
      // rollback
      setConfig(config);
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
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Auto-Reply</p>
            <p className="text-sm text-neutral-500">
              Automatically reply to inbound messages
            </p>
          </div>
          <Switch
            checked={!!config.autoReply}
            onCheckedChange={() => toggle('autoReply')}
            disabled={saving}
            className={classNames(saving && 'opacity-60')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Auto-Assign</p>
            <p className="text-sm text-neutral-500">
              Assign conversations automatically
            </p>
          </div>
          <Switch
            checked={!!config.autoAssign}
            onCheckedChange={() => toggle('autoAssign')}
            disabled={saving}
            className={classNames(saving && 'opacity-60')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">After-Hours Automation</p>
            <p className="text-sm text-neutral-500">
              Enable automation outside business hours
            </p>
          </div>
          <Switch
            checked={!!config.afterHours}
            onCheckedChange={() => toggle('afterHours')}
            disabled={saving}
            className={classNames(saving && 'opacity-60')}
          />
        </div>
      </div>
    </div>
  );
};

export default AutomationSettingsCard;
