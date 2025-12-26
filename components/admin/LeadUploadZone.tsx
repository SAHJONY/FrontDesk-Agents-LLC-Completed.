'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

export default function LeadUploadZone() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // In a real scenario, you'd use a library like PapaParse here
    // For now, we simulate the autonomous ingestion logic
    for (let i = 0; i <= 100; i += 20) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 600)); // Simulating AI configuration time
    }

    setIsUploading(false);
    alert("Houston Leads autonomously configured and ready for outreach!");
  };

  return (
    <div className="p-8 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/50 flex flex-col items-center">
      {!isUploading ? (
        <>
          <Upload className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Upload Greensheet Leads</h3>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Drop your CSV here to autonomously provision Shadow Profiles.
          </p>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload}
            className="hidden" 
            id="csv-upload" 
          />
          <label 
            htmlFor="csv-upload"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-all"
          >
            Select CSV File
          </label>
        </>
      ) : (
        <div className="w-full max-w-xs">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Configuring Agents...</span>
            <span className="text-sm font-medium text-blue-700">{progress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs">Generating Industry Prompts...</span>
          </div>
        </div>
      )}
    </div>
  );
}
