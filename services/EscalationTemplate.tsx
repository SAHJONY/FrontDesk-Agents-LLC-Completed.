import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Link, Hr
} from '@react-email/components';
import * as React from 'react';

interface EscalationProps {
  agentName: string;
  taskDescription: string;
  approvalLink: string;
}

export const EscalationTemplate = ({ agentName, taskDescription, approvalLink }: EscalationProps) => (
  <Html>
    <Head />
    <Preview>Action Required: ${agentName} requires human oversight</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={alertHeading}>⚠️ ACTION REQUIRED</Heading>
        <Text style={text}>
          The <strong>${agentName} Agent</strong> has encountered a high-value decision that requires human validation.
        </Text>
        
        <Section style={contextBox}>
          <Text style={label}>TASK CONTEXT:</Text>
          <Text style={contextText}>${taskDescription}</Text>
        </Section>

        <Link href={approvalLink} style={button}>
          Review & Approve Decision
        </Link>

        <Hr style={hr} />
        <Text style={footer}>
          This escalation was triggered by the AI CEO under the HITL Protocol.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' };
const container = { padding: '40px', margin: '0 auto', maxWidth: '600px' };
const alertHeading = { color: '#f59e0b', fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px' };
const text = { color: '#d1d5db', fontSize: '15px' };
const contextBox = { backgroundColor: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #333', margin: '20px 0' };
const label = { color: '#666', fontSize: '10px', fontWeight: 'bold', margin: '0' };
const contextText = { color: '#fff', fontSize: '14px', marginTop: '5px' };
const button = { backgroundColor: '#f59e0b', color: '#000', padding: '12px 24px', borderRadius: '5px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' };
const hr = { borderColor: '#222', margin: '20px 0' };
const footer = { color: '#444', fontSize: '11px', textAlign: 'center' as const };
