// src/components/dashboard/CallHistory.tsx

import React from 'react';

// ... other imports

export const CallHistory = () => {
  return (
    <div className="space-y-4">
      {/* Existing component logic */}
      
      {/* Update Line 112 with the stringified version below */}
      <CallLogItem
        id="call_001"
        agent="SARA"
        duration="2:45"
        status="completed"
        transcript={JSON.stringify([
          { 
            role: 'assistant', 
            content: 'Greeting protocols active. Thank you for calling. I am SARA, your AI coordinator. How may I assist?' 
          },
          { 
            role: 'user', 
            content: 'Hi, I need to schedule a surgery follow-up for next Tuesday at 3 PM.' 
          },
          { 
            role: 'assistant', 
            content: 'Analyzing availability... Tuesday at 15:00 is currently clear. Shall I finalize this booking in the system?' 
          }
        ])}
      />
      
      {/* ... rest of the component */}
    </div>
  );
};
