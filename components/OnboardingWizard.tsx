'use client';

import { useState } from 'react';

export interface OnboardingWizardProps {
  customerId: string;
  onComplete: () => void;
}

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Welcome to FrontDesk Agents',
    description: 'Let\'s get you set up with your first AI voice agent',
  },
  {
    id: 2,
    title: 'Create Your First Agent',
    description: 'Configure an AI agent to handle your calls',
  },
  {
    id: 3,
    title: 'Configure Phone Number',
    description: 'Connect a phone number for your agent',
  },
  {
    id: 4,
    title: 'Test Your Agent',
    description: 'Make a test call to ensure everything works',
  },
  {
    id: 5,
    title: 'You\'re All Set!',
    description: 'Your AI agent is ready to handle calls',
  },
];

export function OnboardingWizard({ customerId, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [agentData, setAgentData] = useState({
    name: '',
    role: 'receptionist',
    language: 'en',
    voice: 'female-1',
    instructions: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (currentStep === 2) {
      // Create agent
      await createAgent();
    } else if (currentStep === 4) {
      // Complete onboarding
      await completeOnboarding();
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const createAgent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...agentData,
          customer_id: customerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create agent');
      }
    } catch (error) {
      console.error('Error creating agent:', error);
      alert('Failed to create agent. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async () => {
    // Mark onboarding as complete
    try {
      await fetch(`/api/customers/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          onboarding_completed: true,
        }),
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-8">
            <div className="mb-6">
              <svg className="mx-auto h-24 w-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to FrontDesk Agents!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We'll help you set up your first AI voice agent in just a few minutes.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-blue-900 mb-2">What you'll do:</h3>
              <ul className="text-left text-blue-800 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Create your first AI agent
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Connect a phone number
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Test your agent with a call
                </li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your First Agent</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={agentData.name}
                  onChange={(e) => setAgentData({ ...agentData, name: e.target.value })}
                  placeholder="e.g., Reception Agent"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Role
                </label>
                <select
                  value={agentData.role}
                  onChange={(e) => setAgentData({ ...agentData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="receptionist">Receptionist - Greet and route calls</option>
                  <option value="sales">Sales - Handle sales inquiries</option>
                  <option value="support">Support - Provide customer support</option>
                  <option value="scheduler">Scheduler - Book appointments</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={agentData.language}
                  onChange={(e) => setAgentData({ ...agentData, language: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice
                </label>
                <select
                  value={agentData.voice}
                  onChange={(e) => setAgentData({ ...agentData, voice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="female-1">Female Voice 1</option>
                  <option value="female-2">Female Voice 2</option>
                  <option value="male-1">Male Voice 1</option>
                  <option value="male-2">Male Voice 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions (Optional)
                </label>
                <textarea
                  value={agentData.instructions}
                  onChange={(e) => setAgentData({ ...agentData, instructions: e.target.value })}
                  placeholder="Provide specific guidelines for how the agent should behave..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Configure Phone Number</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Choose an option:</h3>
                
                <div className="space-y-4">
                  <div className="border-2 border-blue-600 bg-blue-50 rounded-lg p-4 cursor-pointer">
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="phoneOption"
                        checked
                        className="mt-1 mr-3"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Get a new number</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          We'll provide you with a new phone number for your agent
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400">
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="phoneOption"
                        className="mt-1 mr-3"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Port existing number</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Transfer your current business number to our platform
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Area Code (Optional)
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g., 415"
                  maxLength={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-2">
                  We'll try to find a number in this area code
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Your Agent</h2>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Your agent is ready!</h3>
                    <p className="text-green-800">
                      Your AI agent "{agentData.name}" has been created and is ready to handle calls.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-4">Make a test call</h3>
                <p className="text-blue-800 mb-4">
                  Call your agent to test how it responds:
                </p>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Your agent's number:</p>
                  <p className="text-3xl font-bold text-gray-900">+1 (555) 123-4567</p>
                </div>
                <p className="text-sm text-blue-700 mt-4">
                  💡 Tip: Have a conversation with your agent to see how it handles different scenarios
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-gray-600">
                  Skip test and go straight to dashboard
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center py-8">
            <div className="mb-6">
              <svg className="mx-auto h-24 w-24 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You're All Set!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your AI agent is live and ready to handle calls
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Next steps:</h3>
              <ul className="text-left text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">1.</span>
                  Monitor your agent's performance in the dashboard
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">2.</span>
                  Review call recordings and transcripts
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">3.</span>
                  Refine your agent's instructions based on feedback
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">4.</span>
                  Create additional agents for different purposes
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={loading || (currentStep === 2 && !agentData.name)}
              className={`px-6 py-2 rounded-lg font-medium ${
                loading || (currentStep === 2 && !agentData.name)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : currentStep === steps.length ? (
                'Go to Dashboard'
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
