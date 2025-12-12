// app/layout.tsx

// ... existing imports ...

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FrontDesk Agents LLC",
  "url": "https://www.frontdeskagents.com",
  "logo": "https://www.frontdeskagents.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-216-480-4413",
    "contactType": "Sales"
  }
};

const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AI Agent Front Desk Solution",
    "description": "Advanced AI agents handling calls, inquiries, and bookings 24/7 for B2B enterprises.",
    "brand": {
      "@type": "Brand",
      "name": "FrontDesk Agents"
    },
    "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "299.00", // Starting Price
        "availability": "https://schema.org/InStock"
    }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Basic SEO Metadata */}
        <title>FrontDesk Agents | Enterprise AI for 24/7 Customer Service</title>
        <meta name="description" content="Seamlessly Integrate, Never Miss a Lead. Advanced AI agents handle every call, inquiry, and booking with human-level intelligence, 24/7." />
        
        {/* Structured Data (Organization) */}
        <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} 
        />
        {/* Structured Data (Product - applies to homepage/product page) */}
         <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }} 
        />
        
        {/* ... other head elements ... */}
      </head>
      <body>
        {/* ... Navbar, Children, Footer ... */}
        {children}
      </body>
    </html>
  );
}
