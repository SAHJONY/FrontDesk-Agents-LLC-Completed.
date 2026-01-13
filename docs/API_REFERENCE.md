# FrontDesk Agents - API Reference

This document provides a comprehensive reference for the FrontDesk Agents API.

## 1. Authentication

- All API requests must be authenticated with an API key.
- API keys can be created in **Settings > API Keys**.
- Include your API key in the `Authorization` header as a Bearer token:

```
Authorization: Bearer YOUR_API_KEY
```

## 2. Rate Limiting

- The API is rate-limited to 60 requests per minute and 1000 requests per hour.
- Exceeding the rate limit will result in a `429 Too Many Requests` error.

## 3. Endpoints

### 3.1. Calls

- `GET /api/calls` - Get a list of all calls.
- `GET /api/calls/{callId}` - Get a specific call.
- `POST /api/calls` - Create a new outbound call.

### 3.2. Leads

- `GET /api/leads` - Get a list of all leads.
- `GET /api/leads/{leadId}` - Get a specific lead.
- `POST /api/leads` - Create a new lead.
- `PUT /api/leads/{leadId}` - Update a lead.

### 3.3. Appointments

- `GET /api/appointments` - Get a list of all appointments.
- `GET /api/appointments/{appointmentId}` - Get a specific appointment.
- `POST /api/appointments` - Create a new appointment.
- `PUT /api/appointments/{appointmentId}` - Update an appointment.

### 3.4. SMS

- `GET /api/sms` - Get a list of all SMS messages.
- `POST /api/sms` - Send a new SMS message.

### 3.5. Email

- `GET /api/emails` - Get a list of all emails.
- `POST /api/emails` - Send a new email.

### 3.6. Webhooks

- `GET /api/webhooks` - Get a list of all webhooks.
- `POST /api/webhooks` - Create a new webhook.
- `DELETE /api/webhooks/{webhookId}` - Delete a webhook.

### 3.7. Secrets

- `GET /api/secrets` - Get a list of all secrets (requires owner role).
- `POST /api/secrets` - Create a new secret (requires owner role).
- `PUT /api/secrets/{secretId}` - Update a secret (requires owner role).
- `DELETE /api/secrets/{secretId}` - Delete a secret (requires owner role).

## 4. Webhooks

- You can create webhooks to receive real-time notifications for events in your workspace.
- All webhook payloads are signed with a secret key for verification.
- The signature is included in the `X-Webhook-Signature` header.

### 4.1. Webhook Events

- `call.completed`
- `lead.created`
- `appointment.booked`
- `sms.received`
- `email.received`

## 5. Error Handling

- The API uses standard HTTP status codes to indicate success or failure.
- `2xx` - Success
- `4xx` - Client error (e.g., invalid request, authentication failure)
- `5xx` - Server error

- All error responses include a JSON body with a `message` field explaining the error.
