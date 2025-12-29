# Sovereign Global Financial Hub
**Autonomous AI Receptionist Fleet & Global Sales Infrastructure**

## 🌐 Mission
To serve every customer in any market as a local platform, providing sovereign control over front-desk operations and sales orchestration through an autonomous AI fleet.

## 💰 Permanent Pricing Structure
The platform operates on four standardized tiers. Base prices are set for Western Markets (USD) and adjusted globally via regional multipliers.

| Tier | Price (USD) | AI Voice Minutes | Fleet Capacity | Sales Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Basic** | **$199** | 500 | 1 Agent | Lead Capture |
| **Professional** | **$399** | 1,500 | 3 Agents | CRM Sync & Qualification |
| **Growth** | **$799** | 4,000 | 10 Agents | Payment Processing |
| **Elite** | **$1,499** | **Unlimited** | **Unlimited Fleet** | Global Node Activation |

### **Regional Multipliers**
- **Western Markets:** 1.0x
- **Emerging Markets:** 0.65x
- **Growth Markets:** 0.35x

---

## 🏗️ Technical Architecture (Portland Build Optimized)
The platform is built on **Next.js 15 (App Router)** and optimized for the Vercel **Portland (pdx1)** edge network.

### **Core Components**
- **`src/app/layout.tsx`**: Root configuration with fixed pathing for global styles.
- **`src/hooks/useMarketPricing.ts`**: The engine calculating regional adjustments.
- **`src/components/PricingCard.tsx`**: High-conversion UI for the $1,499 Elite tier.
- **`src/components/dashboard/SalesAnalytics.tsx`**: Real-time ROI tracking.

### **Automation & Crons**
The system includes a daily automation suite configured in `vercel.json`:
- **Path:** `/api/cron/daily-report`
- **Schedule:** 10:00 PM (22:00) UTC
- **Function:** Aggregates sales data, calculates ROI, and dispatches reports via `src/services/notifications.ts`.

---

## 🚀 Deployment Instructions
1. **Environment Variables**:
   - `CRON_SECRET`: Required for authorizing the daily report.
   - `NEXT_PUBLIC_BASE_URL`: Your deployment domain.
2. **Build Command**: `next build`
3. **Directory Standard**: All logic is housed within the `src/` directory to resolve pathing conflicts in the Portland build environment.

---

## 🔒 Compliance & Security
- **HIPAA Ready**: All voice data is encrypted at rest and in transit.
- **Sovereign Data**: Local market nodes ensure data residency requirements are respected.
- 
