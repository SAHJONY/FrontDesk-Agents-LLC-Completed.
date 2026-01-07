/**
 * Bland.AI Integration Service
 * Handles all interactions with Bland.AI API for voice agents
 */

const BLAND_API_KEY = process.env.BLAND_API_KEY || '';
const BLAND_API_URL = 'https://api.bland.ai/v1';

export interface BlandCallParams {
  phoneNumber: string;
  task: string;
  voice?: string;
  model?: 'base' | 'turbo';
  language?: string;
  firstSentence?: string;
  maxDuration?: number;
  webhook?: string;
  transferPhoneNumber?: string;
  record?: boolean;
  metadata?: Record<string, any>;
}

export interface BlandCallResponse {
  status: string;
  message: string;
  call_id: string;
  batch_id: string | null;
}

export interface BlandPhoneNumber {
  phone_number: string;
  country_code: string;
  area_code?: string;
  capabilities: string[];
}

export class BlandAIService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || BLAND_API_KEY;
    this.baseUrl = BLAND_API_URL;
  }

  /**
   * Send an outbound call
   */
  async sendCall(params: BlandCallParams): Promise<BlandCallResponse> {
    const response = await fetch(`${this.baseUrl}/calls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': this.apiKey,
      },
      body: JSON.stringify({
        phone_number: params.phoneNumber,
        task: params.task,
        voice: params.voice || 'nat',
        model: params.model || 'base',
        language: params.language || 'babel-en',
        first_sentence: params.firstSentence,
        max_duration: params.maxDuration || 30,
        webhook: params.webhook,
        transfer_phone_number: params.transferPhoneNumber,
        record: params.record !== false,
        metadata: params.metadata || {},
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Bland AI API error: ${error}`);
    }

    return response.json();
  }

  /**
   * Purchase a phone number
   */
  async purchasePhoneNumber(areaCode?: string, countryCode: string = 'US'): Promise<BlandPhoneNumber> {
    const response = await fetch(`${this.baseUrl}/inbound/number`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': this.apiKey,
      },
      body: JSON.stringify({
        area_code: areaCode,
        country_code: countryCode,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to purchase phone number: ${error}`);
    }

    return response.json();
  }

  /**
   * Configure inbound number settings
   */
  async updateInboundNumber(phoneNumber: string, config: {
    prompt?: string;
    voice?: string;
    webhook?: string;
    maxDuration?: number;
  }): Promise<any> {
    const response = await fetch(`${this.baseUrl}/inbound/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': this.apiKey,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        prompt: config.prompt,
        voice: config.voice || 'nat',
        webhook: config.webhook,
        max_duration: config.maxDuration || 30,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update inbound number: ${error}`);
    }

    return response.json();
  }

  /**
   * List all calls
   */
  async listCalls(limit: number = 50): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/calls?limit=${limit}`, {
      method: 'GET',
      headers: {
        'authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list calls: ${error}`);
    }

    return response.json();
  }

  /**
   * Get call details
   */
  async getCallDetails(callId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/calls/${callId}`, {
      method: 'GET',
      headers: {
        'authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get call details: ${error}`);
    }

    return response.json();
  }

  /**
   * Get call recording URL
   */
  async getCallRecording(callId: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/calls/${callId}/recording`, {
      method: 'GET',
      headers: {
        'authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get call recording: ${error}`);
    }

    const data = await response.json();
    return data.recording_url;
  }

  /**
   * Stop an active call
   */
  async stopCall(callId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/calls/${callId}/stop`, {
      method: 'POST',
      headers: {
        'authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to stop call: ${error}`);
    }
  }

  /**
   * List available phone numbers
   */
  async listNumbers(): Promise<BlandPhoneNumber[]> {
    const response = await fetch(`${this.baseUrl}/inbound/numbers`, {
      method: 'GET',
      headers: {
        'authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list numbers: ${error}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const blandAI = new BlandAIService();
