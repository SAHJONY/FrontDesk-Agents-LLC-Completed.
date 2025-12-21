import { useState } from 'react';

export default function KnowledgeEditor({ clientId }: { clientId: string }) {
  const [blocks, setBlocks] = useState([
    { id: '1', category: 'conversion_logic', content: 'Mencionar espacios limitados para Botox.' }
  ]);

  return (
    <div className="bg-[#020617] border border-cyan-500/20 p-6 rounded-3xl">
      <h3 className="text-cyan-400 font-black text-xs tracking-widest mb-6 uppercase italic">
        Sovereign Brain Customization
      </h3>
      {blocks.map((block) => (
        <div key={block.id} className="mb-4 p-4 bg-white/5 rounded-xl border border-white/5">
          <label className="block text-[10px] text-slate-500 font-bold uppercase mb-2">
            {block.category.replace('_', ' ')}
          </label>
          <textarea 
            className="w-full bg-transparent text-white text-sm focus:outline-none focus:border-cyan-500"
            defaultValue={block.content}
          />
        </div>
      ))}
      <button className="w-full py-3 bg-cyan-500 text-black text-[10px] font-black uppercase rounded-xl hover:bg-white transition-all">
        Update Neural Logic
      </button>
    </div>
  );
}
