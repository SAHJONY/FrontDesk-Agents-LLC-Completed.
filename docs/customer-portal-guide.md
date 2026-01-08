# Customer Portal User Guide

Welcome to FrontDesk Agents! This guide will help you get started with managing your AI voice agents and monitoring their performance.

## Getting Started

### Logging In

Your account administrator will provide you with login credentials. Visit the login page and enter your email and password to access the customer portal.

### Dashboard Overview

Upon logging in, you'll see your dashboard with key metrics:

- **Active Agents**: Number of AI agents currently handling calls
- **Calls Today/Week/Month**: Call volume statistics
- **Success Rate**: Percentage of successfully completed calls
- **Conversion Rate**: Percentage of calls that resulted in desired outcomes

## Managing AI Agents

### Creating a New Agent

AI agents are the voice assistants that handle your calls. Each agent can be configured for specific roles and languages.

**Steps to create an agent:**

1. Navigate to **Agents** from the main menu
2. Click **Create New Agent** button
3. Fill in the agent details:
   - **Name**: Give your agent a descriptive name (e.g., "Reception Agent", "Sales Assistant")
   - **Role**: Select the agent's primary function
     - **Receptionist**: Greets callers, routes calls, answers basic questions
     - **Sales**: Handles sales inquiries, qualifies leads, books demos
     - **Support**: Provides customer support, troubleshoots issues
     - **Scheduler**: Books appointments, manages calendars
   - **Language**: Choose the language your agent will speak
   - **Voice**: Select from available voice options
   - **Instructions**: Provide specific guidelines for how the agent should behave
4. Click **Create Agent**

### Configuring Agent Behavior

Each agent can be customized to match your business needs:

- **Greeting Message**: What the agent says when answering a call
- **Transfer Rules**: When and how to transfer calls to human agents
- **Business Hours**: Set when the agent should be active
- **Call Scripts**: Define conversation flows for common scenarios
- **Knowledge Base**: Upload documents the agent can reference

### Activating/Deactivating Agents

Toggle agents on or off as needed:

1. Go to **Agents** page
2. Find the agent you want to modify
3. Click the **Status** toggle switch
4. Confirm the action

Deactivated agents will not handle any calls.

## Monitoring Call Activity

### Viewing Call History

Access detailed information about all calls handled by your agents:

1. Navigate to **Calls** from the main menu
2. Use filters to find specific calls:
   - **Date Range**: Select time period
   - **Agent**: Filter by specific agent
   - **Status**: Show completed, failed, or in-progress calls
   - **Direction**: Inbound or outbound calls

### Call Details

Click on any call to view detailed information:

- **Duration**: How long the call lasted
- **Transcript**: Full text transcript of the conversation
- **Recording**: Audio playback of the call
- **Outcome**: Whether the call achieved its goal
- **Notes**: Any important information captured during the call

### Listening to Call Recordings

To listen to a call recording:

1. Open the call details page
2. Click the **Play** button on the recording player
3. Use the progress bar to skip to specific parts
4. Click **Download** to save the recording locally

## Analytics and Reporting

### Performance Metrics

Track your agents' performance with comprehensive analytics:

- **Call Volume Trends**: See how call volume changes over time
- **Peak Hours**: Identify when you receive the most calls
- **Agent Performance**: Compare success rates across agents
- **Average Duration**: Monitor how long calls typically last
- **Conversion Tracking**: Measure how many calls achieve their goals

### Exporting Reports

Generate reports for analysis or record-keeping:

1. Go to **Analytics** page
2. Select date range and metrics
3. Click **Export Report**
4. Choose format (PDF, CSV, Excel)
5. Download the file

## Managing Your Subscription

### Viewing Plan Details

Check your current subscription status:

1. Navigate to **Settings** > **Subscription**
2. View your current plan, usage, and billing information

### Upgrading Your Plan

Need more agents or calls? Upgrade anytime:

1. Go to **Settings** > **Subscription**
2. Click **Upgrade Plan**
3. Select your new plan
4. Confirm payment details
5. Your new limits take effect immediately

### Monitoring Usage

Stay within your plan limits:

- **Agents Used**: Number of active agents vs. plan limit
- **Calls This Month**: Current usage vs. monthly allowance
- **Overage Charges**: Any additional costs beyond your plan

## API Integration

For developers who want to integrate FrontDesk Agents with other systems:

### Getting Your API Key

1. Navigate to **Settings** > **API Keys**
2. Click **Generate New Key**
3. Copy the key immediately (it won't be shown again)
4. Store it securely

### API Documentation

Access full API documentation at `/docs/api-reference.md` or visit our developer portal.

### Example Integration

```javascript
// Make an API call to create an agent
const response = await fetch('https://frontdeskagents.com/api/agents', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'My Agent',
    role: 'receptionist',
    language: 'en',
  }),
});
```

## Best Practices

### Agent Configuration

- **Clear Instructions**: Provide detailed guidelines for agent behavior
- **Test Thoroughly**: Make test calls before going live
- **Update Regularly**: Refine agent scripts based on performance
- **Use Multiple Agents**: Create specialized agents for different purposes

### Call Quality

- **Monitor Regularly**: Review call recordings weekly
- **Track Metrics**: Watch success rates and identify issues
- **Gather Feedback**: Ask callers about their experience
- **Iterate**: Continuously improve based on data

### Security

- **Protect API Keys**: Never share or commit keys to code repositories
- **Use Strong Passwords**: Enable two-factor authentication if available
- **Review Access**: Regularly audit who has access to your account
- **Monitor Activity**: Check audit logs for suspicious behavior

## Troubleshooting

### Agent Not Responding

If an agent isn't handling calls:

1. Check agent status (must be "Active")
2. Verify business hours settings
3. Ensure phone number is correctly configured
4. Check for any error messages in the dashboard

### Poor Call Quality

If calls have audio issues:

1. Test your internet connection
2. Check agent voice settings
3. Review call recordings for specific problems
4. Contact support if issues persist

### Billing Questions

For subscription or billing inquiries:

1. Review your plan details in Settings
2. Check usage metrics
3. Contact support at frontdeskllc@outlook.com

## Getting Help

### Support Channels

- **Email**: frontdeskllc@outlook.com
- **Dashboard**: Use the help button in the bottom right
- **Documentation**: Browse guides at `/docs`

### Response Times

- **Starter Plan**: Email support within 24 hours
- **Professional Plan**: Priority support within 4 hours
- **Enterprise Plan**: Dedicated support with 1-hour response

## Frequently Asked Questions

**Q: How many agents can I have?**
A: Depends on your plan. Starter: 1, Professional: 5, Enterprise: Unlimited

**Q: Can agents transfer calls to humans?**
A: Yes! Configure transfer rules in agent settings

**Q: Are call recordings stored securely?**
A: Yes, all recordings are encrypted and stored in secure cloud storage

**Q: Can I use my own phone numbers?**
A: Yes, you can port existing numbers or get new ones through our platform

**Q: What languages are supported?**
A: We support 20+ languages including English, Spanish, French, German, and more

**Q: Can agents handle multiple calls simultaneously?**
A: Yes, each agent can handle unlimited concurrent calls

**Q: How accurate are the transcripts?**
A: Our AI provides 95%+ accuracy for clear audio in supported languages

**Q: Can I cancel anytime?**
A: Yes, cancel anytime with no penalties. You'll have access until the end of your billing period

---

**Need more help?** Contact our support team at frontdeskllc@outlook.com

**Last Updated**: January 2026
**Version**: 1.0
