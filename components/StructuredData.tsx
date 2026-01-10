import Head from 'next/head';

interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

interface ProductSchema {
  name: string;
  description: string;
  image: string;
  brand: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

interface StructuredDataProps {
  type: 'organization' | 'product' | 'website';
  data: OrganizationSchema | ProductSchema | any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'organization':
        return {
          ...baseSchema,
          '@type': 'Organization',
          ...data,
        };
      
      case 'product':
        return {
          ...baseSchema,
          '@type': 'SoftwareApplication',
          ...data,
        };
      
      case 'website':
        return {
          ...baseSchema,
          '@type': 'WebSite',
          ...data,
        };
      
      default:
        return { ...baseSchema, ...data };
    }
  };

  const schema = generateSchema();

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

// Pre-configured schemas for common use cases
export const organizationSchema: OrganizationSchema = {
  name: 'FrontDesk Agents LLC',
  url: 'https://front-desk-agents-llc-completed.vercel.app',
  logo: 'https://front-desk-agents-llc-completed.vercel.app/logo.png',
  description: 'AI-Powered Revenue Workforce platform providing 24/7 autonomous infrastructure for lead qualification, customer service, and revenue operations.',
  contactPoint: {
    telephone: '+1-555-123-4567',
    contactType: 'Customer Service',
    email: 'support@frontdeskagents.com',
  },
  sameAs: [
    'https://twitter.com/frontdeskagents',
    'https://linkedin.com/company/frontdeskagents',
    'https://facebook.com/frontdeskagents',
  ],
};

export const productSchema: ProductSchema = {
  name: 'FrontDesk Agents Platform',
  description: 'AI-powered front office automation platform with voice agents, smart messaging, and real-time analytics.',
  image: 'https://front-desk-agents-llc-completed.vercel.app/product-image.jpg',
  brand: 'FrontDesk Agents LLC',
  aggregateRating: {
    ratingValue: 4.9,
    reviewCount: 1000,
  },
};
