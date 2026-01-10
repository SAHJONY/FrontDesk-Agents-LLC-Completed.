# Stripe Configuration Guide

This guide walks you through setting up Stripe for the FrontDesk Agents platform.

## Prerequisites

- Stripe account (sign up at https://stripe.com)
- Access to Vercel environment variables
- Platform deployed at frontdeskagents.com

## Step 1: Get Stripe API Keys

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Click **Developers** in the left sidebar
3. Click **API keys**
4. Copy your **Secret key** (starts with `sk_live_` or `sk_test_`)
5. Store it securely - you'll need it in Step 3

## Step 2: Create Products and Pricing

### Option A: Use the Automated Script

Run the setup script from the project root:

```bash
cd /tmp/repo
export STRIPE_SECRET_KEY="your_secret_key_here"
npx ts-node scripts/setup-stripe.ts
```

The script will create three products:
- **Starter**: $99/month (1 agent, 500 calls)
- **Professional**: $299/month (5 agents, 2,000 calls)
- **Enterprise**: $999/month (unlimited agents and calls)

Save the Price IDs output by the script - you'll need them later.

### Option B: Manual Setup via Stripe Dashboard

1. Go to **Products** in Stripe Dashboard
2. Click **Add product**
3. For each plan, enter:
   - **Name**: FrontDesk Agents - [Plan Name]
   - **Description**: [Plan description]
   - **Pricing**: Recurring, Monthly
   - **Price**: [Amount in dollars]
4. Click **Save product**
5. Copy the Price ID (starts with `price_`)

## Step 3: Configure Environment Variables

Add these variables to your Vercel project:

1. Go to https://vercel.com/juan-gonzalezs-projects-94b6dfe9/front-desk-agents-llc-completed/settings/environment-variables

2. Add the following variables:

```
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_STARTER_PRICE_ID=price_xxxxx
STRIPE_PROFESSIONAL_PRICE_ID=price_xxxxx
STRIPE_ENTERPRISE_PRICE_ID=price_xxxxx
```

3. Click **Save** for each variable

4. Trigger a new deployment to apply the changes

## Step 4: Configure Webhook Endpoint

Webhooks allow Stripe to notify your platform about subscription events.

1. Go to **Developers** > **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter endpoint URL:
   ```
   https://frontdeskagents.com/api/webhooks/stripe
   ```
4. Select events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `invoice.payment_action_required`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

## Step 5: Test the Integration

### Test Subscription Creation

1. Log in to your platform: https://frontdeskagents.com
2. Navigate to **Customers** > **Create Customer**
3. Create a test customer
4. Click **Create Subscription** for that customer
5. Select a plan and complete the checkout
6. Verify the subscription appears in:
   - Your platform's subscriptions page
   - Stripe Dashboard > **Customers**

### Test Webhook Delivery

1. Go to **Developers** > **Webhooks** in Stripe Dashboard
2. Click on your webhook endpoint
3. Click **Send test webhook**
4. Select `customer.subscription.created`
5. Click **Send test webhook**
6. Verify the webhook was received successfully (200 response)

### Test Payment Flow

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

## Step 6: Go Live

When ready to accept real payments:

1. Complete Stripe account activation
2. Switch from test keys to live keys
3. Update environment variables with live keys:
   - `STRIPE_SECRET_KEY=sk_live_xxxxx`
   - `STRIPE_WEBHOOK_SECRET=whsec_xxxxx` (from live webhook)
4. Update Price IDs to live price IDs
5. Trigger a new deployment

## Troubleshooting

### Webhook Not Receiving Events

- Check webhook URL is correct and publicly accessible
- Verify `STRIPE_WEBHOOK_SECRET` is set correctly
- Check Vercel logs for webhook errors
- Ensure webhook endpoint returns 200 status

### Subscription Not Creating

- Verify `STRIPE_SECRET_KEY` is set
- Check customer has valid payment method
- Review Stripe Dashboard for error messages
- Check platform logs for API errors

### Payment Failing

- Verify test card numbers are correct
- Ensure customer has valid billing address
- Check Stripe Dashboard for decline reasons
- Review payment method requirements

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all secrets
3. **Verify webhook signatures** (already implemented)
4. **Use HTTPS** for all webhook endpoints (Vercel provides this)
5. **Monitor webhook failures** in Stripe Dashboard
6. **Rotate keys periodically** for security

## Support

For Stripe-specific issues:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

For platform issues:
- Check Vercel logs: https://vercel.com/juan-gonzalezs-projects-94b6dfe9/front-desk-agents-llc-completed/logs
- Review webhook logs in Stripe Dashboard

## Next Steps

After completing Stripe setup:
1. ✅ Test subscription creation end-to-end
2. ✅ Verify webhook events are processed
3. ✅ Create pricing page for customers
4. ✅ Add subscription management UI
5. ✅ Implement usage-based billing (optional)
6. ✅ Set up billing alerts and notifications

---

**Status**: Ready for configuration
**Estimated Time**: 30 minutes
**Difficulty**: Intermediate
