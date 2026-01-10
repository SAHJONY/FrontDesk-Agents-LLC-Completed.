# FrontDesk Agents Email Architecture

## Overview
All emails are sent and received through `frontdeskllc@outlook.com` but appear to come from department-specific addresses at `frontdeskagents.com`.

## Department Email Structure

### Core Departments
- `support@frontdeskagents.com` - Customer support inquiries
- `sales@frontdeskagents.com` - Sales and new customer inquiries
- `billing@frontdeskagents.com` - Billing and payment inquiries
- `onboarding@frontdeskagents.com` - New customer onboarding
- `technical@frontdeskagents.com` - Technical support
- `compliance@frontdeskagents.com` - Compliance and legal matters
- `admin@frontdeskagents.com` - Administrative matters
- `noreply@frontdeskagents.com` - System notifications

### Agent Email Format
- `agent-{agent_id}@frontdeskagents.com` - Individual AI agent emails
- `agent-{agent_name}@frontdeskagents.com` - Named agent emails

## Email Routing Flow

```
Outgoing:
Platform → Resend API → Appears from: department@frontdeskagents.com
                      → Reply-To: frontdeskllc@outlook.com
                      → Actually sent via: Resend SMTP

Incoming:
customer@example.com → Reply to email → frontdeskllc@outlook.com
                                      → Webhook to platform API
                                      → Route to correct department/agent
```

## Email Configuration

### Resend API Setup
1. Add custom domain: frontdeskagents.com
2. Configure DNS records (SPF, DKIM, DMARC)
3. Set up webhook for incoming emails
4. Configure reply-to address: frontdeskllc@outlook.com

### Email Headers
```
From: Support Team <support@frontdeskagents.com>
Reply-To: frontdeskllc@outlook.com
Return-Path: frontdeskllc@outlook.com
```

## Email Templates by Department

### Support Department
- Welcome email
- Ticket created
- Ticket updated
- Ticket resolved
- Follow-up email

### Sales Department
- Demo request confirmation
- Proposal sent
- Follow-up email
- Contract sent

### Billing Department
- Invoice sent
- Payment received
- Payment failed
- Subscription updated

### Onboarding Department
- Welcome to platform
- Setup instructions
- Training resources
- Onboarding complete

### Technical Department
- System maintenance notice
- Feature update
- Bug report acknowledgment
- Technical documentation

### Agent-Specific
- Agent introduction
- Agent status update
- Agent performance report
- Custom agent messages

## Database Schema for Email Tracking

```sql
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_address VARCHAR(255) NOT NULL,
  to_address VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  department VARCHAR(50),
  agent_id UUID,
  template_name VARCHAR(100),
  status VARCHAR(20),
  resend_id VARCHAR(255),
  sent_at TIMESTAMP DEFAULT NOW(),
  delivered_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  bounced_at TIMESTAMP,
  error_message TEXT
);

CREATE INDEX idx_email_logs_department ON email_logs(department);
CREATE INDEX idx_email_logs_agent_id ON email_logs(agent_id);
CREATE INDEX idx_email_logs_status ON email_logs(status);
```

## Implementation Priority

1. **Phase 1: Core Setup**
   - Configure Resend API
   - Set up basic email service
   - Implement support@ and noreply@ addresses

2. **Phase 2: Department Emails**
   - Add all department addresses
   - Create department-specific templates
   - Implement routing logic

3. **Phase 3: Agent Emails**
   - Create agent email system
   - Implement agent-specific templates
   - Add agent tracking

4. **Phase 4: Advanced Features**
   - Email analytics
   - Automated responses
   - Email scheduling
   - Attachment handling
