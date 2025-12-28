// Change this:
transcript={[
  { role: 'assistant', content: 'Greeting protocols active...' },
  // ...
]}

// To this (Stringified version):
transcript={JSON.stringify([
  { role: 'assistant', content: 'Greeting protocols active. Thank you for calling. I am SARA, your AI coordinator. How may I assist?' },
  { role: 'user', content: 'Hi, I need to schedule a surgery follow-up for next Tuesday at 3 PM.' },
  { role: 'assistant', content: 'Analyzing availability... Tuesday at 15:00 is currently clear. Shall I finalize this booking in the system?' }
])}
