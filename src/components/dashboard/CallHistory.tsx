import React from 'react';
// Ensure all sub-components are imported from the unified src path
import { CallLogItem } from './CallLogItem'; 

export const CallHistory = () => {
  return (
    <div className="space-y-4">
      {/* Sovereign Dashboard Component: 
          Capturing autonomous agent interactions for global markets.
      */}
      
      <CallLogItem
        id="call_001"
        agent="SARA"
        duration="2:45"
        status="completed"
        phoneNumber="+1 (555) 012-3456"
        // Stringified array to satisfy 'string' type requirement in Next.js 15
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
      
      {/* Additional logs will follow this pattern */}
    </div>
  );
};
