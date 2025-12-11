// app/demo/page.tsx
import React from 'react';
// Import any other components or utilities needed for this page

// Define the component (assuming this was your original component name)
function ContactSalesPage() {
  return (
    <main>
      {/* This is where the content for your Demo page (Contact Sales) goes.
        Example JSX:
      */}
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Book a Demo</h1>
        <p>Please fill out the form below to schedule a call with our sales team.</p>
        
        {/* Placeholder for your actual form or content */}
        {/* <YourContactFormComponent /> */}
        
      </div>
    </main>
  );
}

// CRITICAL FIX: Export the component as the DEFAULT export.
export default ContactSalesPage;
