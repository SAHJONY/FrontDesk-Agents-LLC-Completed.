
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
// Removed lucide-react imports: CheckCircle, AlertCircle, Loader

export default function EmailTestTool() {
  const [recipientEmail, setRecipientEmail] = useState('frontdeskllc@outlook.com');
  const [department, setDepartment] = useState('sales');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendTestEmail = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/email/test-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail,
          department,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: data.message,
          messageId: data.messageId,
          timestamp: data.timestamp,
        });
      } else {
        setError(data.message || 'Failed to send test email');
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Email Service Tester</CardTitle>
        <CardDescription>Send a live test email to verify your email service is working</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recipient Email Input */}
        <div className="space-y-2">
          <label htmlFor="recipient" className="text-sm font-medium">
            Recipient Email
          </label>
          <Input
            id="recipient"
            type="email"
            placeholder="Enter recipient email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Department Selector */}
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium">
            Department
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sales">Sales Team</option>
            <option value="support">Support Team</option>
            <option value="onboarding">Onboarding Team</option>
            <option value="billing">Billing Team</option>
            <option value="technical">Technical Team</option>
            <option value="admin">Admin Team</option>
          </select>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSendTestEmail}
          disabled={loading || !recipientEmail}
          className="w-full"
        >
          {loading ? (
            <>
              {/* Removed Loader icon */}
              Sending...
            </>
          ) : (
            'Send Test Email'
          )}
        </Button>

        {/* Success Alert */}
        {result?.success && (
          <Alert className="border-green-200 bg-green-50">
            {/* Removed CheckCircle icon */}
            <AlertDescription className="text-green-800">
              <p className="font-semibold">{result.message}</p>
              <p className="text-xs mt-1">Message ID: {result.messageId}</p>
              <p className="text-xs">Sent at: {new Date(result.timestamp).toLocaleString()}</p>
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            {/* Removed AlertCircle icon */}
            <AlertDescription className="text-red-800">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </AlertDescription>
          </Alert>
        )}

        {/* Info Text */}
        <p className="text-xs text-gray-500">
          This tool sends a live test email using your configured email service (Resend or Outlook). Check your inbox to verify delivery.
        </p>
      </CardContent>
    </Card>
  );
}
