'use client';
import { useState } from 'react';
import { Card, Title, Text, Select, SelectItem, Button, Callout, Divider } from '@tremor/react';
import { PhoneIcon, MicrophoneIcon } from '@heroicons/react/24/solid';

export default function VoiceSettingsPage() {
  const [voice, setVoice] = useState('en-US-JennyNeural');
  const [language, setLanguage] = useState('es');
  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    setLoading(true);
    // Aquí conectaríamos con tu API de Bland AI para actualizar la voz del agente
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="p-10 bg-slate-950 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        <Title className="text-white text-3xl font-bold">Configuración del Agente</Title>

        {/* 1. NÚMERO ASIGNADO */}
        <Card className="bg-slate-900 border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-full">
              <PhoneIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <Text className="text-slate-400">Tu número de recepción virtual:</Text>
              <Title className="text-white text-2xl">+1 (555) 123-4567</Title>
            </div>
          </div>
          <Callout className="mt-4 bg-slate-800 border-cyan-900 text-cyan-200" title="Instrucciones">
            Desvía las llamadas de tu negocio a este número o publícalo directamente en tu web.
          </Callout>
        </Card>

        {/* 2. PERSONALIDAD DE VOZ */}
        <Card className="bg-slate-900 border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <MicrophoneIcon className="w-6 h-6 text-purple-400" />
            </div>
            <Title className="text-white">Personalidad y Voz</Title>
          </div>

          <div className="space-y-6">
            <div>
              <Text className="mb-2 text-slate-300">Idioma Principal</Text>
              <Select value={language} onValueChange={setLanguage}>
                <SelectItem value="es">Español (Latinoamérica)</SelectItem>
                <SelectItem value="en">Inglés (USA)</SelectItem>
              </Select>
            </div>

            <div>
              <Text className="mb-2 text-slate-300">Voz del Agente</Text>
              <Select value={voice} onValueChange={setVoice}>
                <SelectItem value="en-US-JennyNeural">Elena (Cálida y Profesional)</SelectItem>
                <SelectItem value="es-MX-JorgeNeural">Ricardo (Directo y Confiable)</SelectItem>
                <SelectItem value="es-ES-AlvaroNeural">Mateo (Elegante y Formal)</SelectItem>
              </Select>
            </div>

            <Divider className="bg-slate-800" />

            <Button 
              onClick={saveSettings} 
              loading={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 border-none py-3"
            >
              Guardar y Actualizar Agente
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
