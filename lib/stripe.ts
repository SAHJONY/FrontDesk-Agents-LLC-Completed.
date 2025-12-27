import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing from environment variables.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia', // Use the latest stable API
  appInfo: {
    name: 'FrontDesk Agents Sovereign Node',
    version: '2.1.0',
  },
});

export default stripe;
