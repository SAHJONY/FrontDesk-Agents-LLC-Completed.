'use client';
import { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function TrainingPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch knowledge sources on component mount
  useEffect(() => {
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    try {
      const res = await fetch('/api/ai/training/list');
      const data = await res.json();
      if (data.success) {
        setFiles(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load knowledge base", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Real Upload Logic
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/ai/training/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        // Re-fetch the list to show the newly added file
        await fetchKnowledge();
      } else {
        alert('Upload failed. Please try a .txt or .pdf file.');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      alert('An error occurred during upload.');
    } finally {
      setIsUploading(false);
      // Reset the input so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Knowledge Base</h1>
        <p className="text-gray-500">
          Upload documents to teach your agents about your business. This information will be used to answer caller questions.
        </p>
      </header>

      {/* Upload Zone */}
      <div className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
        isUploading ? 'border-indigo-400 bg-indigo-50 animate-pulse' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
      }`}>
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          id="file-upload" 
          onChange={handleUpload}
          disabled={isUploading}
          accept=".txt,.pdf,.md"
        />
        <div className="flex flex-col items-center">
          {isUploading ? (
            <>
              <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
              <span className="text-indigo-600 font-semibold">AI is analyzing document...</span>
            </>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-indigo-500 mb-4" />
              <span className="text-indigo-600 font-semibold">Click to upload</span>
              <span className="text-gray-500 text-sm mt-1">PDF or TXT preferred</span>
            </>
          )}
        </div>
      </div>

      {/* File List */}
      <div className="mt-12 space-y-4">
        <h3 className="font-medium text-gray-700 flex items-center gap-2">
          Active Knowledge Sources
          {loading && <Loader2 size={16} className="animate-spin text-gray-400" />}
        </h3>

        {files.length === 0 && !loading && (
          <div className="flex flex-col items-center py-12 border rounded-xl bg-white text-gray-400">
            <AlertCircle className="mb-2 opacity-20" size={32} />
            <p>No knowledge sources found. Upload a file to get started.</p>
          </div>
        )}

        {files.map((file: any) => (
          <div key={file.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-md">
                <FileText className="text-indigo-600" size={20} />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-800 block">{file.file_name}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  {file.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 px-3 py-1 rounded-full uppercase">
              <CheckCircle2 size={14} />
              Ready
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
