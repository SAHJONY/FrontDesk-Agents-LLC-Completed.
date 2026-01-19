'use client';
import { useState } from 'react';
import { Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';

export default function TrainingPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([
    { id: 1, name: 'Service_Pricing_2024.pdf', status: 'ready' },
    { id: 2, name: 'FAQ_Handout.docx', status: 'ready' }
  ]);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload logic
    setTimeout(() => setIsUploading(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Knowledge Base</h1>
        <p className="text-gray-500">Upload documents to teach your agents about your business.</p>
      </header>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
        <input type="file" className="hidden" id="file-upload" onChange={handleUpload} />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-indigo-500 mb-4" />
          <span className="text-indigo-600 font-semibold">Click to upload</span>
          <span className="text-gray-500"> or drag and drop PDFs, TXT, or DOCX</span>
        </label>
      </div>

      {/* File List */}
      <div className="mt-12 space-y-4">
        <h3 className="font-medium text-gray-700">Active Knowledge Sources</h3>
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="text-gray-400" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase">
              <CheckCircle2 size={14} />
              Ready
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
