'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { CloudArrowUpIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function LeadsUploader() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const supabase = createClientComponentClient();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus('idle');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      // Simple CSV Parser: Splitting by lines and then by commas
      const rows = text.split('\n').slice(1); // Skip header row
      
      const leadsToInsert = rows.filter(row => row.trim()).map(row => {
        const [firstName, lastName, phoneNumber, email] = row.split(',');
        return {
          first_name: firstName?.trim(),
          last_name: lastName?.trim(),
          phone_number: phoneNumber?.trim(),
          email: email?.trim(),
          status: 'new' // Matches your SQL default
        };
      });

      const { error } = await supabase.from('leads').insert(leadsToInsert);

      if (error) {
        console.error('Upload error:', error);
        setStatus('error');
      } else {
        setStatus('success');
      }
      setUploading(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center">
      <input
        type="file"
        accept=".csv"
        id="csv-upload"
        className="hidden"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center">
        {uploading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-600 mb-4"></div>
        ) : status === 'success' ? (
          <CheckIcon className="h-12 w-12 text-green-500 mb-2" />
        ) : status === 'error' ? (
          <XMarkIcon className="h-12 w-12 text-red-500 mb-2" />
        ) : (
          <CloudArrowUpIcon className="h-12 w-12 text-slate-400 mb-2" />
        )}
        
        <span className="text-sm font-bold text-slate-700">
          {uploading ? 'Processing Leads...' : 'Upload Leads CSV'}
        </span>
        <p className="text-xs text-slate-500 mt-1">Format: First Name, Last Name, Phone, Email</p>
      </label>
    </div>
  );
}
