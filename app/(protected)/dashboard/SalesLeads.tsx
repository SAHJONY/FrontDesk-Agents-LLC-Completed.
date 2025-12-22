'use client';

import { useState } from 'react';

// 1. Add this state to your SalesLeads component
const [selectedLead, setSelectedLead] = useState<any>(null);

// 2. Add this Modal UI inside your return statement (bottom of the JSX)
{selectedLead && (
  <div className="modal">
    {/* Your modal content */}
  </div>
)}
