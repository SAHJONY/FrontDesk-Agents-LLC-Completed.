import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  clientName: string;
  plan: string;
}

export const WelcomeTemplate = ({ clientName, plan }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>System Initialized: Welcome to the Workforce</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>FrontDesk Agents LLC</Heading>
        <Text style={text}>Hello {clientName},</Text>
        <Text style={text}>
          The <strong>AI CEO</strong> has successfully provisioned your infrastructure on the <strong>{plan}</strong> tier.
        </Text>
        
        <Section style={card}>
          <Text style={cardTitle}>STATUS: ACTIVE</Text>
          <Hr style={hr} />
          <Text style={listItem}>🛡️ <strong>Guardian:</strong> Data Tunnel Established</Text>
          <Text style={listItem}>🚑 <strong>Medic:</strong> Vitals Monitoring Live</Text>
          <Text style={listItem}>📈 <strong>Intelligence:</strong> RL Training Initiated</Text>
        </Section>

        <Link href="https://frontdeskagents.com/dashboard" style={button}>
          Access Command Center
        </Link>

        <Text style={footer}>
          Portland Build v1.4 | Sovereign AI Infrastructure
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles for the "Sovereign" look
const main = { backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' };
const container = { padding: '40px', margin: '0 auto', maxWidth: '600px' };
const h1 = { color: '#3b82f6', fontSize: '24px', fontWeight: 'bold' };
const text = { color: '#d1d5db', fontSize: '16px', lineHeight: '24px' };
const card = { backgroundColor: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #333', margin: '20px 0' };
const cardTitle = { color: '#10b981', fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0' };
const listItem = { color: '#9ca3af', fontSize: '14px', margin: '5px 0' };
const hr = { borderColor: '#222', margin: '10px 0' };
const button = { backgroundColor: '#3b82f6', color: '#fff', padding: '12px 24px', borderRadius: '5px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginTop: '20px' };
const footer = { color: '#4b5563', fontSize: '11px', marginTop: '40px', textAlign: 'center' as const };
