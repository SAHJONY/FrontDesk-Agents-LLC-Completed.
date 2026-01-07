# FrontDesk Agents - Admin Guide

This guide is for workspace administrators and provides instructions on how to configure and manage your FrontDesk Agents platform.

## 1. Workspace Management

### 1.1. Creating a Workspace

- Workspaces are created automatically upon signup.
- To create additional workspaces, contact support.

### 1.2. Workspace Settings

- **Business Name & Logo:** Customize your workspace with your brand name and logo.
- **Timezone & Language:** Set the default timezone and language for your workspace.
- **Voice Style:** Choose the voice style for your AI agents (professional, friendly, casual).
- **Standard Responses:** Create pre-defined responses for common questions.

## 2. Team Management

### 2.1. Inviting Team Members

- Go to **Settings > Team**.
- Click **"Invite Member"** and enter the email address and role for the new member.

### 2.2. Roles & Permissions

- **Owner:** Full access to all features, including billing and workspace deletion.
- **Admin:** Full access to all features except billing and workspace deletion.
- **Manager:** Can manage calls, leads, and team members for their assigned locations.
- **Agent:** Can manage calls and leads assigned to them.
- **Viewer:** Read-only access to dashboards and reports.

### 2.3. Managing Locations

- Go to **Settings > Locations**.
- Add new locations with their own address, phone number, and business hours.
- Assign team members to specific locations.

## 3. Configuration

### 3.1. Routing Rules

- Go to **Settings > Routing**.
- Create rules to automatically route calls and messages to the right team member or location based on intent, time of day, or customer location.

### 3.2. Scripts

- Go to **Settings > Scripts**.
- Create scripts for your AI agents to follow for greetings, FAQs, and escalations.

### 3.3. Templates

- Go to **Settings > Templates**.
- Create SMS and email templates for common communications like appointment reminders and follow-ups.

## 4. Integrations

### 4.1. Connecting Integrations

- Go to **Settings > Integrations**.
- Connect your favorite tools, including:
  - **Calendars:** Google Calendar, Outlook Calendar
  - **CRMs:** Salesforce, HubSpot
  - **Payments:** Stripe
  - **Telephony:** Twilio
  - **Email:** SendGrid

### 4.2. Webhooks

- Go to **Settings > Webhooks**.
- Create webhooks to send real-time notifications to your other systems when events occur in FrontDesk Agents (e.g., call completed, lead created).

### 4.3. API Keys

- Go to **Settings > API Keys**.
- Create API keys to access the FrontDesk Agents API and build custom integrations.

## 5. Security & Compliance

### 5.1. Audit Logs

- Go to **Settings > Audit Logs**.
- View a complete history of all actions taken in your workspace.

### 5.2. Data Retention

- Go to **Settings > Data Retention**.
- Configure how long you want to store your data (e.g., call recordings, chat logs) to comply with your industry regulations.

### 5.3. Consent Management

- Go to **Settings > Consent**.
- View and manage customer consent for SMS, email, and call communications.

## 6. Owner-Only Features

### 6.1. Secrets Management

- Go to **Dashboard > Owner**.
- Securely manage all your platform secrets and environment variables.

### 6.2. Incident Controls

- Go to **Dashboard > Owner**.
- In case of emergency, you can pause campaigns, disable agents, or initiate a full emergency shutdown.

### 6.3. Feature Flags

- Go to **Dashboard > Owner**.
- Enable or disable new features for your workspace.
