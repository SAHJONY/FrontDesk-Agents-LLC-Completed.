'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  PhoneIcon,
  WrenchScrewdriverIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';

// Import Neural Components
import { CallMonitor } from '@/components/dashboard/CallMonitor';
import { CallHistory } from '@/components/dashboard/CallHistory';
import { ScriptConfigurator } from '@/components/dashboard/ScriptConfigurator';

export default function VoiceAIConfigPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const currentConfig = {
    enabled: true,
    widget_script_key: 'FDDG-SARAV1-4829J-AB3',
    node: locale.toUpperCase()
  };

  const handleInitiateCall = async () => {
    if (!phoneNumber) return;
    setLoading(true);
    try {
      const response = await fetch('/api/voice/make-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, locale })
      });
      const data = await response.json();
      if (data.success) {
        setActiveCallId(data.
