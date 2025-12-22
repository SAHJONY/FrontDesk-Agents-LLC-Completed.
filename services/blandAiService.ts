// services/blandAiService.ts

export interface BlandAiConfig {
  apiKey: string;
  voiceId?: string;
}

export interface CallRequest {
  phoneNumber: string;
  task: string;
  transferPhone?: string;
}

export interface CallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

/**
 * Bland AI Service
 * Handles AI voice calls through Bland.ai API
 */
export const blandAiService = {
  /**
   * Initiate an outbound AI call
   */
  async makeCall(request: CallRequest): Promise<CallResponse> {
    try {
      const response = await fetch('https://api.bland.ai/v1/calls', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.BLAND_AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: request.phoneNumber,
          task: request.task,
          transfer_phone_number: request.transferPhone,
          voice_id: process.env.BLAND_AI_VOICE_ID || 'default',
        }),
      });

      if (!response.ok) {
        throw new Error(`Bland AI API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        callId: data.call_id,
      };
    } catch (error) {
      console.error('Bland AI service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Get call status
   */
  async getCallStatus(callId: string): Promise<any> {
    try {
      const response = await fetch(`https://api.bland.ai/v1/calls/${callId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.BLAND_AI_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get call status: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting call status:', error);
      return null;
    }
  },

  /**
   * Get call transcript
   */
  async getCallTranscript(callId: string): Promise<string | null> {
    try {
      const callData = await this.getCallStatus(callId);
      return callData?.transcript || null;
    } catch (error) {
      console.error('Error getting transcript:', error);
      return null;
    }
  },
};
