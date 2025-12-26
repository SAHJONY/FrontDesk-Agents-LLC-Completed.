'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ClockIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';

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

export default function TranscriptModal({ 
  isOpen, 
  onClose, 
  transcript,
  callData 
}: TranscriptModalProps) {
  
  // Parse transcript into dialogue format if possible
  const parseTranscript = (text: string) => {
    if (!text) return [];
    
    // Try to split by speaker (AI: or Customer: or similar patterns)
    const lines = text.split('\n').filter(line => line.trim());
    const dialogues = [];
    
    for (const line of lines) {
      if (line.includes(':')) {
        const [speaker, ...messageParts] = line.split(':');
        const message = messageParts.join(':').trim();
        const isAI = speaker.toLowerCase().includes('ai') || 
                     speaker.toLowerCase().includes('agent') ||
                     speaker.toLowerCase().includes('assistant');
        
        dialogues.push({
          speaker: speaker.trim(),
          message: message,
          isAI: isAI
        });
      } else {
        dialogues.push({
          speaker: 'Unknown',
          message: line,
          isAI: false
        });
      }
    }
    
    return dialogues;
  };

  const dialogues = parseTranscript(transcript);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                      Call Transcript
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Call Metadata */}
                  {callData && (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {callData.phoneNumber && (
                        <div className="flex items-center gap-2 text-sm">
                          <PhoneIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{callData.phoneNumber}</span>
                        </div>
                      )}
                      {callData.duration && (
                        <div className="flex items-center gap-2 text-sm">
                          <ClockIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{callData.duration}</span>
                        </div>
                      )}
                      {callData.timestamp && (
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{callData.timestamp}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status & Sentiment */}
                  {(callData?.status || callData?.sentiment) && (
                    <div className="mt-3 flex gap-2">
                      {callData.status && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {callData.status}
                        </span>
                      )}
                      {callData.sentiment && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {callData.sentiment}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Transcript Content */}
                <div className="max-h-[60vh] overflow-y-auto p-6">
                  {dialogues.length > 0 ? (
                    <div className="space-y-4">
                      {dialogues.map((dialogue, index) => (
                        <div
                          key={index}
                          className={`flex ${dialogue.isAI ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                              dialogue.isAI
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-xs font-semibold mb-1 opacity-75">
                              {dialogue.speaker}
                            </p>
                            <p className="text-sm whitespace-pre-wrap">
                              {dialogue.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No transcript available for this call.</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(transcript);
                        // Could add a toast notification here
                      }}
                    >
                      Copy Transcript
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
}
