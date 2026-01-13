/**
 * Integration Tests for FrontDesk Agents Platform
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

// Test configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const TEST_USER = {
  email: 'test@frontdeskagents.com',
  password: 'TestPassword123!',
};

describe('Authentication API', () => {
  test('should login successfully', async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.token).toBeDefined();
  });

  test('should reject invalid credentials', async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'wrong@test.com', password: 'wrong' }),
    });
    
    expect(response.status).toBe(401);
  });
});

describe('Autonomous AI Agent System', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should create autonomous agent', async () => {
    const response = await fetch(`${API_BASE_URL}/api/autonomous/agents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        action: 'create',
        customerId: 'test_customer',
        config: {
          name: 'Test Agent',
          personality: 'friendly',
          capabilities: ['answer_questions', 'schedule_appointments'],
        },
      }),
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.id).toBeDefined();
  });

  test('should retrieve agent status', async () => {
    const response = await fetch(`${API_BASE_URL}/api/autonomous/status?customerId=test_customer`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.agents).toBeDefined();
  });
});

describe('Multi-Agent Orchestration', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should create orchestration task', async () => {
    const response = await fetch(`${API_BASE_URL}/api/autonomous/orchestration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        action: 'create_task',
        customerId: 'test_customer',
        task: {
          name: 'Process Customer Inquiry',
          agents: ['agent_1', 'agent_2'],
          workflow: ['analyze', 'respond', 'follow_up'],
        },
      }),
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});

describe('Advanced NLP Engine', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should analyze sentiment', async () => {
    const response = await fetch(`${API_BASE_URL}/api/ai/nlp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        action: 'analyze_sentiment',
        text: 'I love this product! It\'s amazing!',
      }),
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.sentiment).toBe('positive');
  });

  test('should extract entities', async () => {
    const response = await fetch(`${API_BASE_URL}/api/ai/nlp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        action: 'extract_entities',
        text: 'John Smith from Acme Corp called about order #12345',
      }),
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.entities).toBeDefined();
  });
});

describe('Workflow Automation', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should create workflow', async () => {
    const response = await fetch(`${API_BASE_URL}/api/workflows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        action: 'create',
        customerId: 'test_customer',
        workflow: {
          name: 'Test Workflow',
          triggers: [{ type: 'call_ended' }],
          actions: [{ type: 'send_email' }],
        },
      }),
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});

describe('Predictive Analytics', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should generate predictions', async () => {
    const response = await fetch(`${API_BASE_URL}/api/analytics/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        action: 'predict',
        customerId: 'test_customer',
        metric: 'call_volume',
        timeframe: '7d',
      }),
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});

describe('Integration Hub', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should list available providers', async () => {
    const response = await fetch(`${API_BASE_URL}/api/integrations?action=providers`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});

describe('Monitoring & Observability', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should get system status', async () => {
    const response = await fetch(`${API_BASE_URL}/api/monitoring?action=status`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.status).toBeDefined();
  });

  test('should get performance metrics', async () => {
    const response = await fetch(`${API_BASE_URL}/api/monitoring?action=metrics&timeRange=1h`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});

describe('Auto-Scaling Infrastructure', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should get scaling status', async () => {
    const response = await fetch(`${API_BASE_URL}/api/infrastructure/scaling?action=status`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.totalInstances).toBeDefined();
  });
});

describe('Enterprise Features', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should get available roles', async () => {
    const response = await fetch(`${API_BASE_URL}/api/enterprise?action=roles`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('should generate compliance report', async () => {
    const response = await fetch(`${API_BASE_URL}/api/enterprise?action=compliance_report&customerId=test_customer&type=gdpr`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});

describe('AI Marketplace', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
    });
    const data = await response.json();
    authToken = data.data.token;
  });

  test('should get agent templates', async () => {
    const response = await fetch(`${API_BASE_URL}/api/marketplace?action=agent_templates`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('should search marketplace', async () => {
    const response = await fetch(`${API_BASE_URL}/api/marketplace?action=search&query=customer`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});

describe('Performance Tests', () => {
  test('should handle concurrent requests', async () => {
    const requests = Array(10).fill(null).map(() =>
      fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(TEST_USER),
      })
    );

    const responses = await Promise.all(requests);
    const allSuccessful = responses.every(r => r.status === 200);
    expect(allSuccessful).toBe(true);
  });

  test('should respond within acceptable time', async () => {
    const startTime = Date.now();
    await fetch(`${API_BASE_URL}/api/monitoring?action=status`);
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
  });
});
