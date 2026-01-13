# API Integration Guide

This guide provides comprehensive documentation for integrating with the FrontDesk Agents API.

## Authentication

All API requests require authentication using an API key.

### Getting Your API Key

1. Log in to your dashboard
2. Navigate to **Settings** > **API Keys**
3. Click **Generate New Key**
4. Copy and store the key securely

### Using Your API Key

Include your API key in the `Authorization` header of all requests:

```
Authorization: Bearer YOUR_API_KEY
```

## Base URL

All API endpoints are relative to:

```
https://frontdeskagents.com/api
```

## Rate Limits

- **Standard**: 100 requests per minute
- **Burst**: Up to 200 requests in a 10-second window

Exceeding rate limits returns a `429 Too Many Requests` response.

## Response Format

All responses are in JSON format:

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-01-08T12:00:00Z"
}
```

Error responses include an `error` field:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2026-01-08T12:00:00Z"
}
```

## Endpoints

### Agents

#### List Agents

```
GET /agents
```

**Query Parameters:**
- `status` (optional): Filter by status (`active`, `inactive`)
- `role` (optional): Filter by role (`receptionist`, `sales`, `support`, `scheduler`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20, max: 100)

**Response:**
```json
{
  "agents": [
    {
      "id": "agent_123",
      "name": "Reception Agent",
      "role": "receptionist",
      "language": "en",
      "status": "active",
      "calls_handled": 150,
      "success_rate": 0.95,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "pages": 1
  }
}
```

#### Create Agent

```
POST /agents
```

**Request Body:**
```json
{
  "name": "Sales Agent",
  "role": "sales",
  "language": "en",
  "voice": "female-1",
  "instructions": "Qualify leads and book demos"
}
```

**Response:**
```json
{
  "id": "agent_456",
  "name": "Sales Agent",
  "role": "sales",
  "status": "active",
  "created_at": "2026-01-08T12:00:00Z"
}
```

#### Get Agent

```
GET /agents/{id}
```

**Response:**
```json
{
  "id": "agent_123",
  "name": "Reception Agent",
  "role": "receptionist",
  "language": "en",
  "voice": "female-1",
  "status": "active",
  "instructions": "Greet callers and route appropriately",
  "calls_handled": 150,
  "success_rate": 0.95,
  "avg_duration": 180,
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-08T10:00:00Z"
}
```

#### Update Agent

```
PATCH /agents/{id}
```

**Request Body:**
```json
{
  "name": "Updated Agent Name",
  "instructions": "New instructions",
  "status": "inactive"
}
```

#### Delete Agent

```
DELETE /agents/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Agent deleted successfully"
}
```

### Calls

#### List Calls

```
GET /calls
```

**Query Parameters:**
- `agent_id` (optional): Filter by agent
- `status` (optional): Filter by status (`completed`, `failed`, `in-progress`)
- `direction` (optional): Filter by direction (`inbound`, `outbound`)
- `start_date` (optional): Start date (ISO 8601)
- `end_date` (optional): End date (ISO 8601)
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response:**
```json
{
  "calls": [
    {
      "id": "call_789",
      "agent_id": "agent_123",
      "direction": "inbound",
      "status": "completed",
      "duration": 180,
      "from_number": "+1234567890",
      "to_number": "+0987654321",
      "recording_url": "https://...",
      "transcript": "Full conversation text...",
      "created_at": "2026-01-08T11:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### Create Call

```
POST /calls
```

**Request Body:**
```json
{
  "agent_id": "agent_123",
  "to_number": "+1234567890",
  "direction": "outbound"
}
```

#### Get Call

```
GET /calls/{id}
```

#### Update Call

```
PATCH /calls/{id}
```

**Request Body:**
```json
{
  "status": "completed",
  "duration": 180,
  "transcript": "Full conversation...",
  "outcome": "success"
}
```

### Call Recordings

#### Upload Recording

```
POST /calls/recordings
```

**Request:** Multipart form data
- `file`: Audio file (MP3, WAV, M4A)
- `callId`: Call ID
- `customerId`: Customer ID

**Response:**
```json
{
  "success": true,
  "url": "https://storage.../recording.mp3",
  "callId": "call_789"
}
```

#### Get Recording

```
GET /calls/recordings?callId={id}
```

**Response:**
```json
{
  "callId": "call_789",
  "url": "https://storage.../recording.mp3"
}
```

#### Delete Recording

```
DELETE /calls/recordings?callId={id}
```

### Analytics

#### Get Call Analytics

```
GET /calls/analytics
```

**Query Parameters:**
- `start_date` (optional): Start date
- `end_date` (optional): End date
- `agent_id` (optional): Filter by agent
- `customer_id` (optional): Filter by customer

**Response:**
```json
{
  "summary": {
    "total_calls": 1000,
    "completed_calls": 950,
    "failed_calls": 50,
    "success_rate": 0.95,
    "avg_duration": 180,
    "total_duration": 180000
  },
  "by_date": [
    {
      "date": "2026-01-08",
      "calls": 50,
      "success_rate": 0.96
    }
  ],
  "by_hour": [
    {
      "hour": 9,
      "calls": 15
    }
  ],
  "by_agent": [
    {
      "agent_id": "agent_123",
      "agent_name": "Reception Agent",
      "calls": 150,
      "success_rate": 0.95
    }
  ]
}
```

### Subscriptions

#### Get Subscription

```
GET /subscriptions
```

**Response:**
```json
{
  "subscriptions": [
    {
      "id": "sub_123",
      "plan": "professional",
      "status": "active",
      "current_period_start": "2026-01-01T00:00:00Z",
      "current_period_end": "2026-02-01T00:00:00Z",
      "amount": 29900,
      "currency": "usd"
    }
  ]
}
```

#### Create Subscription

```
POST /subscriptions
```

**Request Body:**
```json
{
  "price_id": "price_xxx",
  "payment_method_id": "pm_xxx"
}
```

#### Cancel Subscription

```
DELETE /subscriptions/{id}
```

## Webhooks

Receive real-time notifications about events in your account.

### Setting Up Webhooks

1. Go to **Settings** > **Webhooks**
2. Click **Add Webhook**
3. Enter your endpoint URL
4. Select events to receive
5. Save the webhook

### Webhook Events

- `call.started`: Call initiated
- `call.completed`: Call finished
- `call.failed`: Call failed
- `agent.created`: New agent created
- `agent.updated`: Agent modified
- `agent.deleted`: Agent deleted
- `subscription.updated`: Subscription changed

### Webhook Payload

```json
{
  "event": "call.completed",
  "timestamp": "2026-01-08T12:00:00Z",
  "data": {
    "id": "call_789",
    "agent_id": "agent_123",
    "status": "completed",
    "duration": 180
  }
}
```

### Verifying Webhooks

Each webhook includes a signature header:

```
X-Webhook-Signature: sha256=...
```

Verify the signature using your webhook secret:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return `sha256=${digest}` === signature;
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Invalid API key |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |

## SDKs and Libraries

### JavaScript/Node.js

```bash
npm install @frontdesk/api-client
```

```javascript
const FrontDesk = require('@frontdesk/api-client');

const client = new FrontDesk({
  apiKey: 'YOUR_API_KEY'
});

// List agents
const agents = await client.agents.list();

// Create agent
const agent = await client.agents.create({
  name: 'My Agent',
  role: 'receptionist'
});
```

### Python

```bash
pip install frontdesk-api
```

```python
from frontdesk import FrontDesk

client = FrontDesk(api_key='YOUR_API_KEY')

# List agents
agents = client.agents.list()

# Create agent
agent = client.agents.create(
    name='My Agent',
    role='receptionist'
)
```

## Code Examples

### Create Agent and Make Call

```javascript
// Create an agent
const agent = await fetch('https://frontdeskagents.com/api/agents', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Sales Agent',
    role: 'sales',
    language: 'en'
  })
});

const agentData = await agent.json();

// Make an outbound call
const call = await fetch('https://frontdeskagents.com/api/calls', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    agent_id: agentData.id,
    to_number: '+1234567890',
    direction: 'outbound'
  })
});
```

### Monitor Call Status

```javascript
// Poll for call status
async function waitForCallCompletion(callId) {
  while (true) {
    const response = await fetch(`https://frontdeskagents.com/api/calls/${callId}`, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    const call = await response.json();
    
    if (call.status === 'completed' || call.status === 'failed') {
      return call;
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}
```

### Upload Call Recording

```javascript
const formData = new FormData();
formData.append('file', audioFile);
formData.append('callId', 'call_789');
formData.append('customerId', 'customer_123');

const response = await fetch('https://frontdeskagents.com/api/calls/recordings', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});
```

## Best Practices

1. **Store API Keys Securely**: Never commit keys to version control
2. **Handle Rate Limits**: Implement exponential backoff for retries
3. **Validate Webhooks**: Always verify webhook signatures
4. **Use Pagination**: Don't fetch all records at once
5. **Cache Responses**: Cache data that doesn't change frequently
6. **Handle Errors**: Implement proper error handling and logging
7. **Monitor Usage**: Track API usage to stay within limits

## Support

For API support:
- **Email**: frontdeskllc@outlook.com
- **Documentation**: https://frontdeskagents.com/docs
- **Status Page**: https://status.frontdeskagents.com

---

**Last Updated**: January 2026
**API Version**: v1
