import React, { useState } from 'react';

const KnowledgeVault = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState([
    { name: 'Employee_Handbook.pdf', size: '2.4MB', status: 'Synced' },
    { name: 'Q1_Pricing_Sheet.csv', size: '1.1MB', status: 'Synced' }
  ]);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate Neural Ingest
    setTimeout(() => {
      setDocuments([...documents, { name: 'New_Business_Logic.pdf', size: '0.8MB', status: 'Synced' }]);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sovereign Vault</h2>
          <p className="text-slate-500 text-sm">Upload business intelligence to train your Agentic Workforce.</p>
        </div>
        <button 
          onClick={handleUpload}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center"
        >
          {isUploading ? "Processing..." : "Add Knowledge +"}
        </button>
      </div>

      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-bold">PDF</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">{doc.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{doc.size} • Private & Encrypted</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">
              {doc.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start">
        <span className="mr-3 mt-1 text-amber-600 text-lg">🔒</span>
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Privacy Protocol:</strong> Data uploaded here is stored in your private Sovereign silo. It is used exclusively for your agents' reasoning and is <strong>never</strong> shared with global LLM providers or used for training other models.
        </p>
      </div>
    </div>
  );
};

export default KnowledgeVault;
