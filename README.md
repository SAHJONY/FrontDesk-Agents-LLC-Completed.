# 🏢 FrontDesk Agents LLC - Global Revenue Workforce Platform

> Elite AI-powered litigation, arbitration, and revenue operations serving global markets locally.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)](https://supabase.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

FrontDesk Agents is a comprehensive AI-powered platform designed to automate and optimize front-office operations for businesses across multiple industries. The platform provides 24/7 autonomous infrastructure for lead qualification, customer service, and revenue operations.

### Key Capabilities

- **Autonomous AI Agents**: Intelligent voice and text agents that handle customer interactions
- **Multi-Industry Support**: Specialized agents for hospitality, legal, healthcare, and more
- **Global Reach**: Support for 50+ languages and regional pricing
- **Enterprise Security**: SOC 2 compliant with end-to-end encryption
- **Real-time Analytics**: Comprehensive dashboards for performance monitoring

## ✨ Features

### Core Features

- 🤖 **AI-Powered Agents**: Advanced conversational AI for customer interactions
- 📞 **Voice & SMS**: Integrated telephony with Bland.ai and Twilio
- 📊 **Analytics Dashboard**: Real-time metrics and performance tracking
- 💰 **Revenue Operations**: Automated billing, invoicing, and payment processing
- 🌍 **Multi-Language**: Support for 50+ languages with automatic translation
- 🔐 **Enterprise Security**: Role-based access control and data encryption
- 📱 **Mobile Responsive**: Fully responsive design for all devices
- 🎨 **Custom Branding**: White-label options for enterprise clients

### Advanced Features

- **Intelligent Routing**: Smart lead qualification and routing
- **Automated Follow-ups**: AI-driven customer engagement
- **Integration Hub**: Connect with CRM, ERP, and other business tools
- **Custom Workflows**: Build and deploy custom automation workflows
- **Compliance Management**: GDPR, HIPAA, and industry-specific compliance
- **Performance Optimization**: AI-powered optimization recommendations

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js 22
- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with JWT
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime subscriptions

### Infrastructure
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Analytics**: Vercel Analytics
- **Monitoring**: Custom monitoring dashboard
- **CI/CD**: GitHub Actions + Vercel

### Integrations
- **Telephony**: Bland.ai, Twilio
- **Payments**: Stripe
- **Email**: SendGrid
- **SMS**: Twilio
- **CRM**: Custom integrations

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or higher
- pnpm 9.x or higher
- Git
- Supabase account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SAHJONY/FrontDesk-Agents-LLC-Completed..git
   cd FrontDesk-Agents-LLC-Completed.
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials (see [Environment Variables](#environment-variables))

4. **Run database migrations**
   ```bash
   pnpm db:migrate
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript compiler check

# Database
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed database with sample data
pnpm db:reset         # Reset database

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate coverage report
```

## 📁 Project Structure

```
FrontDesk-Agents-LLC-Completed./
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   ├── dashboard/            # Dashboard pages
│   ├── admin/                # Admin panel
│   ├── login/                # Authentication pages
│   └── page.tsx              # Landing page
├── components/               # Reusable React components
│   ├── dashboard/            # Dashboard-specific components
│   ├── forms/                # Form components
│   └── ui/                   # UI primitives
├── lib/                      # Utility functions and libraries
│   ├── api-handlers/         # API request handlers
│   ├── billing/              # Billing logic
│   ├── core/                 # Core business logic
│   ├── services/             # External service integrations
│   └── supabase/             # Supabase client and utilities
├── config/                   # Configuration files
│   ├── industries.ts         # Industry definitions
│   ├── languages.ts          # Language support
│   └── pricing.config.ts     # Pricing tiers
├── types/                    # TypeScript type definitions
├── public/                   # Static assets
│   └── assets/               # Images and media
├── scripts/                  # Utility scripts
├── middleware.ts             # Next.js middleware
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Authentication
JWT_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Bland.ai (Voice AI)
BLAND_API_KEY=your_bland_api_key
BLAND_WEBHOOK_SECRET=your_bland_webhook_secret

# Twilio (SMS/Voice)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# SendGrid (Email)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@frontdeskagents.com

# OpenAI (Optional)
OPENAI_API_KEY=your_openai_api_key

# Redis (Optional - for caching)
REDIS_URL=your_redis_url

# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Required Variables

The following variables are **required** for the platform to function:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`

### Optional Variables

These variables enable additional features:

- `BLAND_API_KEY` - For voice AI capabilities
- `TWILIO_*` - For SMS and voice calling
- `SENDGRID_API_KEY` - For email notifications
- `OPENAI_API_KEY` - For enhanced AI features
- `REDIS_URL` - For caching and performance optimization

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Connect your repository to Vercel**
   ```bash
   vercel login
   vercel link
   ```

2. **Set environment variables in Vercel**
   - Go to your project settings in Vercel
   - Add all required environment variables
   - Ensure production values are set

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

### Docker Deployment

```bash
# Build the Docker image
docker build -t frontdesk-agents .

# Run the container
docker run -p 3000:3000 --env-file .env.local frontdesk-agents
```

## 📚 API Documentation

### Authentication

All API routes require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Core Endpoints

#### Dashboard APIs

```
GET  /api/dashboard/stats       # Get dashboard statistics
GET  /api/dashboard/calls       # Get call activity feed
GET  /api/dashboard/revenue     # Get revenue metrics
GET  /api/dashboard/nodes       # Get node status
```

#### Agent Management

```
GET    /api/agents              # List all agents
POST   /api/agents              # Create new agent
GET    /api/agents/:id          # Get agent details
PATCH  /api/agents/:id          # Update agent
DELETE /api/agents/:id          # Delete agent
```

#### Telephony

```
POST   /api/telephony/call      # Initiate outbound call
GET    /api/telephony/numbers   # List phone numbers
POST   /api/telephony/provision # Provision new number
```

#### Billing

```
GET    /api/billing             # Get billing information
POST   /api/billing/subscribe   # Subscribe to plan
POST   /api/billing/cancel      # Cancel subscription
GET    /api/billing/invoices    # List invoices
```

### Webhooks

The platform supports webhooks for real-time event notifications:

```
POST /api/webhooks/bland        # Bland.ai call events
POST /api/webhooks/stripe       # Stripe payment events
POST /api/webhooks/twilio       # Twilio SMS/call events
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the version numbers following [SemVer](https://semver.org/)
3. The PR will be merged once you have the sign-off of two maintainers

## 📄 License

This project is proprietary software owned by FrontDesk Agents LLC. All rights reserved.

For licensing inquiries, please contact: legal@frontdeskagents.com

## 📞 Support

- **Email**: support@frontdeskagents.com
- **Documentation**: https://docs.frontdeskagents.com
- **Status Page**: https://status.frontdeskagents.com
- **Community**: https://community.frontdeskagents.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment platform
- Supabase for the backend infrastructure
- All our contributors and community members

---

**Built with ❤️ by the FrontDesk Agents team**

*Last updated: January 2026*
# Fresh deployment - Fri Jan  9 16:34:05 EST 2026
