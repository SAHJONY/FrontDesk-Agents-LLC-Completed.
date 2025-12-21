import {
  Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from '@react-email/components';

export const InvitationEmail = ({ clientName, magicLink }: { clientName: string, magicLink: string }) => (
  <Html>
    <Head />
    <Preview>Access your Intelligence Portal</Preview>
    <Body style={{ backgroundColor: '#000814', color: '#fff', fontFamily: 'sans-serif' }}>
      <Container style={{ padding: '40px', border: '1px solid #1e293b', borderRadius: '24px' }}>
        <Heading style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase', color: '#06b6d4' }}>
          FrontDesk Agents
        </Heading>
        <Text style={{ fontSize: '16px', color: '#cbd5e1' }}>Hello {clientName},</Text>
        <Text style={{ fontSize: '14px', lineHeight: '24px', color: '#94a3b8' }}>
          Your proprietary Intelligence Portal is ready. Use the secure uplink below to monitor your AI agent's performance and access lead transcripts.
        </Text>
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Link href={magicLink} style={{ backgroundColor: '#06b6d4', color: '#000814', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
            Enter Portal
          </Link>
        </Section>
        <Hr style={{ borderColor: '#1e293b', margin: '20px 0' }} />
        <Text style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Secure Transmission • FrontDesk Agency OS v4.2
        </Text>
      </Container>
    </Body>
  </Html>
);
