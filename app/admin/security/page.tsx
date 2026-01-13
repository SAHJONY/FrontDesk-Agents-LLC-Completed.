import React from 'react';

export default function SecurityCenter() {
  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <h1 className="text-4xl font-black italic mb-12">CYBERSECURITY COMMAND</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="titan-card">
          <h3 className="text-brand-cyan text-xs font-bold uppercase mb-4">Node Encryption</h3>
          <p className="text-slate-400 text-sm mb-6">AES-256 Quantum-Resistant tunneling is active for all Elite agents.</p>
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
            <span className="text-green-400 font-mono text-xs">STATUS: SECURE</span>
          </div>
        </div>

        <div className="titan-card">
          <h3 className="text-white font-bold mb-4">Access Logs</h3>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between text-[10px] font-mono border-b border-white/5 pb-2">
                <span className="text-slate-500">IP: 192.168.1.{i}42</span>
                <span className="text-brand-cyan">SUCCESSFUL LOGIN</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
