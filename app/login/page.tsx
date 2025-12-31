'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-[440px] w-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-tighter">SOVEREIGN LOGIN</h1>
          <p className="text-gray-500 text-sm mt-2">Node: pdx1 | Global Revenue Workforce</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-white text-black font-bold p-3 rounded-lg hover:bg-gray-200 transition-colors">
            Access Terminal
          </button>
        </form>
      </div>
    </div>
  );
}
