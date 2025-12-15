'use client';

import { useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function ConsentEnforcement() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Consent Enforcement</h3>

        <button
          onClick={() => setEnabled(!enabled)}
          className="px-3 py-1 text-sm bg-black text-white rounded"
        >
          {enabled ? 'Disable' : 'Enable'}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        {enabled ? (
          <>
            <CheckCircle size={16} className="text-green-600" />
            TCPA Compliance Active
          </>
        ) : (
          <>
            <AlertTriangle size={16} className="text-red-600" />
            Compliance Disabled
          </>
        )}
      </div>
    </div>
  );
}
