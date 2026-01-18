"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, Loader2, Square } from "lucide-react";
import { startListening } from "@/lib/hooks/useSpeech";

export default function VoiceDemo() {
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const [transcript, setTranscript] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    setStatus("listening");
    startListening(async (text) => {
      setTranscript(text);
      processVoice(text);
    });
  };

  const processVoice = async (text: string) => {
    setStatus("processing");
    try {
      const response = await fetch("/api/ai/demo", {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      if (audioRef.current) {
        audioRef.current.src = url;
        setStatus("speaking");
        audioRef.current.play();
        audioRef.current.onended = () => setStatus("idle");
      }
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-xl font-medium text-white">Live AI Agent Preview</h3>
        
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Animated Rings */}
          <AnimatePresence>
            {(status === "listening" || status === "speaking") && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-blue-500 rounded-full blur-2xl"
              />
            )}
          </AnimatePresence>

          <button
            onClick={status === "idle" ? handleStart : undefined}
            disabled={status === "processing"}
            className={`relative z-10 p-8 rounded-full transition-all ${
              status === "listening" ? "bg-red-500" : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {status === "idle" && <Mic className="text-white" size={32} />}
            {status === "listening" && <Square className="text-white" size={32} />}
            {status === "processing" && <Loader2 className="text-white animate-spin" size={32} />}
            {status === "speaking" && <Volume2 className="text-white" size={32} />}
          </button>
        </div>

        <div className="text-center h-12">
          <p className="text-sm text-slate-400 capitalize">
            {status === "idle" && "Tap to talk to the agent"}
            {status === "listening" && "Listening..."}
            {status === "processing" && "AI is thinking..."}
            {status === "speaking" && "AI is responding..."}
          </p>
          <p className="text-xs text-blue-400 mt-2 italic">{transcript}</p>
        </div>
      </div>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
