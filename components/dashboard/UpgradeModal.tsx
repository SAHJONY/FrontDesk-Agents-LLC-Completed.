'use client';

import { useState } from 'react';
import { Button, Card, Title, Text, List, ListItem, Badge } from '@tremor/react';
import { ArrowUpCircle, CheckCircle2 } from 'lucide-react';

export default function UpgradeModal({ currentTier, onUpgrade }: { currentTier: string, onUpgrade: (tier: string) => void }) {
  const tiers = [
    { name: 'PROFESSIONAL', price: 399, mins: 1000, features: ['Sentiment Analysis', 'CRM Sync'] },
    { name: 'GROWTH', price: 799, mins: 2500, features: ['Multi-Agent Support', 'Custom KB'] },
    { name: 'ELITE', price: 1499, mins: 5000, features: ['Voice Cloning', 'Dedicated Infra'] }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl bg-slate-900 border-emerald-500/50 border-2">
        <Title className="text-white text-center flex items-center justify-center gap-2">
          <ArrowUpCircle className="text-emerald-400" /> SCALE YOUR SOVEREIGN AGENT
        </Title>
        <Text className="text-center text-slate-400 mb-8">Select a tier to instantly reload your minute balance.</Text>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div key={tier.name} className={`p-4 rounded-lg border ${currentTier === tier.name ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10'}`}>
              <Text className="font-bold text-white">{tier.name}</Text>
              <Title className="text-emerald-400">${tier.price}</Title>
              <Badge className="mt-2">{tier.mins} MINS</Badge>
              <List className="mt-4">
                {tier.features.map(f => (
                  <ListItem key={f} className="text-[10px] text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1" /> {f}
                  </ListItem>
                ))}
              </List>
              <Button 
                onClick={() => onUpgrade(tier.name)}
                className="mt-6 w-full bg-emerald-600 border-none hover:bg-emerald-500"
              >
                UPGRADE
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
