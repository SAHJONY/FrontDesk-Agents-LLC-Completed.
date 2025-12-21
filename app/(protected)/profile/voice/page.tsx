'use client';

import { useState, useRef } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { Mic, Square, Play, Trash2, UploadCloud, Volume2 } from 'lucide-react';

const recorder = new MicRecorder({ bitRate: 128 });

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const start = () => {
    recorder.start().then(() => setIsRecording(true)).catch((e) => console.error(e));
  };

  const stop = () => {
    recorder.stop().getMp3().then(([buffer, blob]) => {
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setBlob(blob);
      setIsRecording(false);
    });
  };

  const handleClone = async () => {
    if (!blob) return;
    setIsUploading(true);
    
    // In a real scenario, you'd upload the blob to Supabase Storage first,
    // then send the URL to Bland AI's /v1/voices/clone endpoint.
    console.log("Initiating Neural Clone...");
    
    setTimeout(() => {
      setIsUploading(false);
      alert("Voice Sample Processed. New Voice ID: custom_v1_active");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-10 bg-[#000d1a] border border-cyan-500/20 rounded-[40px] shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-cyan-500/10 rounded-2xl">
          <Volume2 className="w-6 h-6 text-cyan-500" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Voice <span className="text-cyan-500">Cloner</span></h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Record 30s of speech for neural cloning</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 py-10 border-2 border-dashed border-white/5 rounded-[32px]">
        {!audioUrl ? (
          <button 
            onClick={isRecording ? stop : start}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isRecording ? 'bg-red-500 animate-pulse' : 'bg-cyan-500 hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)]'
            }`}
          >
            {isRecording ? <Square className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-[#000814]" />}
          </button>
        ) : (
          <div className="w-full px-10 space-y-6">
            <audio src={audioUrl} controls className="w-full accent-cyan-500" />
            <div className="flex gap-4">
              <button 
                onClick={() => setAudioUrl(null)}
                className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-400 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Retake
              </button>
              <button 
                onClick={handleClone}
                disabled={isUploading}
                className="flex-[2] py-4 bg-cyan-500 text-[#000814] rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4" /> {isUploading ? 'Cloning...' : 'Generate Neural Voice'}
              </button>
            </div>
          </div>
        )}
        <p className="text-[9px] text-slate-600 font-medium uppercase text-center px-10">
          Tip: Speak clearly in a quiet environment. Read a script naturally to capture your unique inflection and tone.
        </p>
      </div>
    </div>
  );
}
