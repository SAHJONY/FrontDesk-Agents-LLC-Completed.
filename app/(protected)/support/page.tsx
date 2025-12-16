'use client';

import { useState } from 'react';
import {
  TicketIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  priority: string;
  subject: string;
  description: string;
}

export default function SupportPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    priority: 'medium',
    subject: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SubmissionSuccess
        title="Ticket de Soporte Creado"
        message={`Su ticket ha sido creado con prioridad ${formData.priority.toUpperCase()}. Un ingeniero de soporte dedicado se pondrá en contacto en cumplimiento con nuestro SLA.`}
        onReset={() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            priority: 'medium',
            subject: '',
            description: '',
          });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Enterprise Support
            </h1>
            <p className="text-xl text-gray-300">
              24/7 dedicated support for your business-critical operations
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 text-center">
              <PhoneIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Phone Support</h3>
              <p className="text-gray-400 mb-4">Available 24/7</p>
              <a
                href="tel:+12164804413"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                +1 (216) 480-4413
              </a>
            </div>

            <div className="glass-card p-6 text-center">
              <EnvelopeIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
              <p className="text-gray-400 mb-4">Response within 4 hours</p>
              <a
                href="mailto:support@frontdeskagents.com"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                support@frontdeskagents.com
              </a>
            </div>

            <div className="glass-card p-6 text-center">
              <TicketIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Support Tickets</h3>
              <p className="text-gray-400 mb-4">Track your requests</p>
              <button className="text-purple-400 hover:text-purple-300 font-medium">
                View Tickets
              </button>
            </div>
          </div>

          {/* Support Form */}
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Create Support Ticket
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority *
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition"
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Service issue</option>
                  <option value="high">High - Business impact</option>
                  <option value="critical">Critical - System down</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition resize-none"
                  placeholder="Please provide detailed information about your issue..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Submit Support Ticket
              </button>
            </form>
          </div>

          {/* SLA Information */}
          <div className="mt-12 glass-card p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Service Level Agreement (SLA)
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">15min</div>
                <p className="text-sm text-gray-400">Critical Priority</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">1hr</div>
                <p className="text-sm text-gray-400">High Priority</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">4hrs</div>
                <p className="text-sm text-gray-400">Medium Priority</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">24hrs</div>
                <p className="text-sm text-gray-400">Low Priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Success Component
interface SubmissionSuccessProps {
  title: string;
  message: string;
  onReset: () => void;
}

function SubmissionSuccess({ title, message, onReset }: SubmissionSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
            <p className="text-xl text-gray-300 mb-8">{message}</p>
            <div className="space-y-4">
              <button
                onClick={onReset}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Create Another Ticket
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-lg text-white font-semibold hover:bg-white/10 transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      }
