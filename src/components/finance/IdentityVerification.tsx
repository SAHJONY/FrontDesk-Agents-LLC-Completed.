import React, { useState } from 'react';

const IdentityVerification = ({ businessName = "the Office" }) => {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    // Logic to send to your Neural Ingest API
    setTimeout(() => {
      setUploading(false);
      setStep(3); // Move to "Verified" status
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-indigo-50 rounded-full mb-4">
          <span className="text-3xl">🆔</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Identity Verification</h2>
        <p className="text-slate-500 text-sm mt-2">Required for global money transfers at {businessName}.</p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Step 1: Choose Document</p>
          <button 
            onClick={() => setStep(2)}
            className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all flex justify-between items-center"
          >
            <span>Passport or National ID</span>
            <span>→</span>
          </button>
          <button 
            onClick={() => setStep(2)}
            className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all flex justify-between items-center"
          >
            <span>Driver's License</span>
            <span>→</span>
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-4">Step 2: Upload Photo</p>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 bg-slate-50">
            {uploading ? (
              <div className="animate-pulse text-indigo-600 font-bold">Neural Verification in Progress...</div>
            ) : (
              <label className="cursor-pointer">
                <span className="text-indigo-600 font-bold">Click to capture or upload ID</span>
                <input type="file" className="hidden" onChange={handleIdUpload} accept="image/*" />
              </label>
            )}
          </div>
          <button onClick={() => setStep(1)} className="mt-4 text-xs text-slate-400 hover:underline">Go Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center animate-fadeIn">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Verification Complete</h3>
          <p className="text-sm text-slate-500 mb-6">Your identity has been securely encrypted and stored in the Sovereign Vault.</p>
          <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200">
            Proceed with Transfer
          </button>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-50 text-[10px] text-slate-400 flex items-center justify-center">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"></path></svg>
        AES-256 BANK-GRADE ENCRYPTION
      </div>
    </div>
  );
};

export default IdentityVerification;
