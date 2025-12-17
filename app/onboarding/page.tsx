'use client';

import { useState } from 'react';
import { Card, Title, Text, TextInput, Button, Tracker, Badge } from '@tremor/react';

export default function OnboardingPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'crawling' | 'synthesizing' | 'complete'>('idle');
  const [data, setData] = useState<any>(null);

  const handleStart = async () => {
    setStatus('crawling');
    
    // Llamada a nuestra API del Crawler
    const res = await fetch('/api/setup/crawl', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    
    setStatus('synthesizing');
    const result = await res.json();
    
    setData(result);
    setStatus('complete');
  };

  return (
    <div className="min-h-screen bg-[#020817] p-12 text-white">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <Title className="text-4xl font-bold text-white">Configura tu Agente en 60 segundos</Title>
        <Text className="text-slate-400 text-lg">Introduce la URL de tu negocio y nuestra IA aprenderá todo lo necesario.</Text>

        <div className="flex gap-4 mt-8">
          <TextInput 
            placeholder="https://tu-negocio.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-slate-800 border-slate-700"
          />
          <Button onClick={handleStart} disabled={status !== 'idle'} color="cyan">
            Comenzar Extracción
          </Button>
        </div>

        {status !== 'idle' && (
          <Card className="mt-12 bg-slate-900 border-slate-800">
            <div className="space-y-4">
              <Flex>
                <Text className="font-medium">{status.toUpperCase()}...</Text>
                <Badge color={status === 'complete' ? 'emerald' : 'blue'}>
                  {status === 'complete' ? 'Listo' : 'En proceso'}
                </Badge>
              </Flex>
              {/* Barra de progreso visual */}
              <Tracker data={[
                { color: 'cyan', tooltip: 'URL Recibida' },
                { color: status === 'crawling' || status === 'synthesizing' || status === 'complete' ? 'cyan' : 'gray' },
                { color: status === 'synthesizing' || status === 'complete' ? 'cyan' : 'gray' },
                { color: status === 'complete' ? 'emerald' : 'gray' },
              ]} />
            </div>

            {data && (
              <div className="mt-8 text-left grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                <div>
                  <Text className="text-slate-500 italic">Negocio detectado</Text>
                  <Title className="text-white">{data.businessName}</Title>
                </div>
                <div>
                  <Text className="text-slate-500 italic">Servicios encontrados</Text>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.services?.map((s: string) => <Badge key={s}>{s}</Badge>)}
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
