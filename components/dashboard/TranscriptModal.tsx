'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  ClockIcon, 
  PhoneIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';
import { ShieldCheck, Fingerprint, Activity } from 'lucide-react';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: string;
  callData?: {
    duration?: string;
    timestamp?: string;
    phoneNumber?: string;
    status?: string;
    sentiment?: string;
  };
}

/**
 * INSTITUTIONAL FORENSIC TRANSCRIPT
 * Fixed: Explicitly using NAMED EXPORT to satisfy CallHistory.tsx imports
 */
export const TranscriptModal = ({ 
  isOpen, 
  onClose, 
  transcript,
  callData 
}: TranscriptModalProps) => {
  
  const parseTranscript = (text: string) => {
    if (!text) return [];
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map(line => {
      if (line.includes(':')) {
        const [speaker, ...messageParts] = line.split(':');
        const isAI = speaker.toLowerCase().match(/ai|agent|assistant|sara/);
        return {
          speaker: speaker.trim(),
          message: messageParts.join(':').trim(),
          isAI: !!isAI
        };
      }
      return { speaker: 'SYSTEM', message: line, isAI: false };
    });
  };

  const dialogues = parseTranscript(transcript);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[500]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#020305]/90 backdrop-blur-xl" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-sm border border-white/10 bg-[#080a0f] shadow-2xl transition-all">
                
                {/* --- INSTITUTIONAL HEADER --- */}
                <div className="border-b border-white/5 bg-white/[0.02] px-8 py-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-cyan-500" />
                      <Dialog.Title className="text-[10px] font-black uppercase tracking-[0.5em] text-white">
                        Forensic Audio Synthesis
                      </Dialog.Title>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Node Identity</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                        <PhoneIcon className="h-3 w-3 text-cyan-500" />
                        {callData?.phoneNumber || "REDACTED"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Session Duration</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                        <ClockIcon className="h-3 w-3 text-cyan-500" />
                        {callData?.duration || "00:00:00"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Sentiment Score</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                        <Activity className="h-3 w-3" />
                        {callData?.sentiment || "NEUTRAL"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- TRANSCRIPT STREAM --- */}
                <div className="max-h-[50vh] overflow-y-auto p-8 bg-[#040508] space-y-8">
                  {dialogues.length > 0 ? (
                    dialogues.map((dialogue, index) => (
                      <div key={index} className={`flex flex-col ${dialogue.isAI ? 'items-end' : 'items-start'}`}>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 mb-2">
                          {dialogue.speaker}
                        </span>
                        <div className={`max-w-[85%] px-6 py-4 rounded-sm border ${
                          dialogue.isAI 
                            ? 'bg-cyan-500/5 border-cyan-500/20 text-white' 
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}>
                          <p className="text-[11px] leading-relaxed tracking-wide font-medium">
                            {dialogue.message}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <Fingerprint className="w-12 h-12 text-white/5 mx-auto mb-4" />
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">No neural data available</p>
                    </div>
                  )}
                </div>

                {/* --- FOOTER --- */}
                <div className="border-t border-white/5 bg-black px-8 py-6 flex justify-between items-center">
                  <span className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.4em]">
                    Encrypted via System-Protocol-7
                  </span>
                  <div className="flex gap-4">
                    <button
                      onClick={onClose}
                      className="px-6 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Dismiss
                    </button>
                    <button
                      className="bg-white px-6 py-2 text-[9px] font-black text-black uppercase tracking-widest hover:bg-cyan-500 transition-all"
                      onClick={() => navigator.clipboard.writeText(transcript)}
                    >
                      Export Telemetry
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
