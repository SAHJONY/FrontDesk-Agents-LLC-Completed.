    try {
        await sgMail.send(msg);
        console.log(`Email sent from ${fromAddress} to ${to}: ${subject}`);
        return { success: true };
    } catch (error: any) {
        // ✅ By adding ': any', we allow access to .response and .message
        const errorMessage = error.response?.body?.errors 
            ? JSON.stringify(error.response.body.errors) 
            : error.message;
            
        console.error('Error sending email (SendGrid):', errorMessage);
        throw new Error(`Email delivery failed: ${errorMessage}`);
    }
