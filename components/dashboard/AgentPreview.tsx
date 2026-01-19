'use client';
import { useState } from 'react';
import { Send, Bot, User, Loader2, X } from 'lucide-react';

export default function AgentPreview() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! I am your trained agent. Ask me anything about the documents you uploaded.' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I hit an error processing that.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
      <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <span className="font-semibold text-sm">Agent Preview (Live)</span>
        </div>
      </div>

      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-800'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && <Loader2 className="animate-spin text-indigo-500 mx-auto" />}
      </div>

      <div className="p-4 border-t bg-white flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask a question..."
          className="flex-1 bg-gray-100 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button onClick={sendMessage} className="bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-700 transition-colors">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
