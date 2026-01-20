"use client";

import { useState } from "react";
import { Upload, FileSpreadsheet, Check, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CSVParser({ onComplete }: { onComplete: (data: any[]) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState({ phone: "", name: "" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulación de parseo de headers (en prod usarías PapaParse)
      setColumns(["first_name", "last_name", "phone_number", "last_visit", "debt"]);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8">
      {!file ? (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-800 rounded-[2rem] hover:border-sky-500/50 cursor-pointer transition-all group">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-sky-400 group-hover:scale-110 transition-all">
              <Upload size={28} />
            </div>
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-white">Subir Base de Datos</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold mt-1 tracking-tighter">CSV, XLSX (Max 10MB)</p>
            </div>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} accept=".csv" />
        </label>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-4">
              <FileSpreadsheet className="text-emerald-500" />
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">{file.name}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">1,240 registros detectados</p>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="p-2 hover:bg-white/5 rounded-full text-slate-500"><X size={18} /></button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Columna de Teléfono</label>
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white focus:border-sky-500 outline-none transition-all"
                onChange={(e) => setMapping({ ...mapping, phone: e.target.value })}
              >
                <option value="">Seleccionar...</option>
                {columns.map(col => <option key={col} value={col}>{col}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Columna de Nombre</label>
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white focus:border-sky-500 outline-none transition-all"
                onChange={(e) => setMapping({ ...mapping, name: e.target.value })}
              >
                <option value="">Seleccionar...</option>
                {columns.map(col => <option key={col} value={col}>{col}</option>)}
              </select>
            </div>
          </div>

          <button 
            disabled={!mapping.phone || !mapping.name}
            className="w-full py-4 bg-sky-500 disabled:bg-slate-800 disabled:text-slate-600 text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-full hover:bg-sky-400 transition-all shadow-lg"
            onClick={() => onComplete([])}
          >
            Sincronizar Protocolo de Llamadas
          </button>
        </motion.div>
      )}
    </div>
  );
}
