# Resend API Configuration Guide

## Overview
This guide explains how to configure Resend API to enable email functionality for FrontDesk Agents platform with custom domain support.

## Prerequisites
- Resend account (sign up at https://resend.com)
- Access to frontdeskagents.com DNS settings
- Vercel environment variables access

## Step 1: Create Resend Account

1. Go to https://resend.com
2. Sign up with frontdeskllc@outlook.com
3. Verify your email address
4. Complete account setup

## Step 2: Add Custom Domain

1. Log into Resend dashboard
2. Navigate to **Domains** section
3. Click **Add Domain**
4. Enter: `frontdeskagents.com`
5. Click **Add Domain**

## Step 3: Configure DNS Records

Resend will provide DNS records that need to be added to your domain. Add these records to your DNS provider:

### SPF Record (TXT)
```
Type: TXT
Name: @
Value: v=spf1 include:amazonses.com include:_spf.resend.com ~all
TTL: 3600
```

### DKIM Records (CNAME)
```
Type: CNAME
Name: resend._domainkey
Value: [provided by Resend]
TTL: 3600

Type: CNAME
Name: resend2._domainkey
Value: [provided by Resend]
TTL: 3600
```

### DMARC Record (TXT)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:frontdeskllc@outlook.com
TTL: 3600
```

### MX Record (for receiving emails)
```
Type: MX
Name: @
Value: inbound-smtp.us-east-1.amazonaws.com
Priority: 10
TTL: 3600
```

## Step 4: Verify Domain

1. After adding DNS records, wait 10-15 minutes for propagation
2. Return to Resend dashboard
3. Click **Verify Domain**
4. Wait for verification to complete (green checkmark)

## Step 5: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name: `FrontDesk Agents Production`
4. Permission: **Full Access**
5. Click **Create**
6. **Copy the API key** (you won't see it again!)

## Step 6: Update Vercel Environment Variable

1. Go to Vercel dashboard
2. Navigate to your project settings
3. Go to **Environment Variables**
4. Find `RESEND_API_KEY`
5. Click **Edit**
6. Replace placeholder with your actual Resend API key
7. Click **Save**
8. Trigger a new deployment

## Step 7: Configure Email Webhooks (Optional)

To receive incoming emails and track email events:

1. In Resend dashboard, go to **Webhooks**
2. Click **Add Webhook**
3. Enter webhook URL: `https://frontdeskagents.com/api/webhooks/resend`
4. Select events to track:
   - `email.sent`
   - `email.delivered`
   - `email.bounced`
   - `email.opened`
   - `email.clicked`
5. Click **Create Webhook**

## Step 8: Set Up Email Forwarding

To forward all emails to frontdeskllc@outlook.com:

### Option A: Using Resend Inbound Rules
1. In Resend dashboard, go to **Inbound**
2. Click **Add Rule**
3. Match: `*@frontdeskagents.com`
4. Forward to: `frontdeskllc@outlook.com`
5. Click **Save**

### Option B: Using Outlook Rules
1. Log into Outlook.com
2. Go to **Settings** → **Mail** → **Rules**
3. Click **Add new rule**
4. Name: `FrontDesk Agents Forwarding`
5. Condition: From contains `@frontdeskagents.com`
6. Action: Forward to `frontdeskllc@outlook.com`
7. Click **Save**

## Step 9: Test Email Sending

Run the test script to verify email functionality:

```bash
cd /tmp/frontdesk-clean
node -e "
const { sendSupportEmail } = require('./lib/mail/emailService');
sendSupportEmail(
  'frontdeskllc@outlook.com',
  'Test Email from FrontDesk Agents',
  '<h1>Test Email</h1><p>If you receive this, email is working!</p>',
  'Test Email - If you receive this, email is working!'
).then(result => console.log('Email sent:', result));
"
```

## Step 10: Monitor Email Performance

1. Check Resend dashboard for email analytics
2. Monitor delivery rates
3. Check bounce rates
4. Review open and click rates

## Troubleshooting

### Domain Not Verifying
- Wait longer for DNS propagation (up to 24 hours)
- Check DNS records are correct
- Use DNS checker: https://dnschecker.org

### Emails Not Sending
- Verify API key is correct in Vercel
- Check Resend dashboard for error messages
- Verify domain is verified (green checkmark)

### Emails Going to Spam
- Ensure SPF, DKIM, and DMARC records are correct
- Warm up your domain by sending gradually increasing volumes
- Avoid spammy content in emails

### Emails Not Being Received
- Check MX records are correct
- Verify inbound rules are set up
- Check Outlook spam folder

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly (every 90 days)
4. **Monitor email logs** for suspicious activity
5. **Enable two-factor authentication** on Resend account

## Cost Considerations

Resend pricing (as of 2025):
- **Free tier:** 3,000 emails/month
- **Pro tier:** $20/month for 50,000 emails
- **Enterprise:** Custom pricing

Monitor your usage in the Resend dashboard to avoid unexpected charges.

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- FrontDesk Agents Support: frontdeskllc@outlook.com
