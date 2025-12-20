'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { exportGlobalClinics } from '@/lib/actions/export-clinics';

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    const result = await exportGlobalClinics();
    
    if (result.data) {
      const link = document.createElement('a');
      link.href = `data:text/csv;base64,${result.data}`;
      link.download = `FrontDesk_Global_Export_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    }
    setIsExporting(false);
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-50 text-sm font-semibold shadow-lg shadow-neutral-200"
    >
      {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {isExporting ? "Generating Global Report..." : "Export Global CRM List"}
    </button>
  );
}
