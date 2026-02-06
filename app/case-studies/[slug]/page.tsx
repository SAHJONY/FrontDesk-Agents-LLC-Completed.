import React from 'react';
import { notFound } from 'next/navigation';

interface CaseStudy {
  slug: string;
  title: string;
  roi: string;
  content: string;
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'case-study-1',
    title: 'Boosting Customer Retention by 20% with AI Agents',
    roi: '20% increase in customer retention',
    content: `
      <p>In this case study, we delve into how our advanced AI agents were deployed to a major e-commerce platform facing challenges with customer churn. By implementing personalized communication strategies and proactive engagement, we observed a significant <strong>20% increase in customer retention</strong> within six months.</p>
      <p>Our AI system analyzed customer behavior patterns, identified at-risk customers, and initiated targeted interventions, leading to improved customer loyalty and reduced churn rates. This success highlights the power of AI in understanding and influencing customer relationships.</p>
      <h3>Key Results:</h3>
      <ul>
        <li>20% increase in customer retention</li>
        <li>15% reduction in customer service inquiries</li>
        <li>10% improvement in customer satisfaction scores</li>
      </ul>
    `,
  },
  {
    slug: 'case-study-2',
    title: 'Streamlining Operations: 30% Reduction in Support Costs',
    roi: '30% reduction in support operational costs',
    content: `
      <p>This case study focuses on a national service provider that sought to optimize its operational efficiency and reduce support costs. By integrating our automated front desk solutions, the client achieved a remarkable <strong>30% reduction in support operational costs</strong>.</p>
      <p>The automation streamlined routine tasks such as appointment scheduling, inquiry routing, and basic customer support, allowing human agents to concentrate on more complex issues. This strategic implementation not only cut costs but also enhanced service delivery speed and consistency.</p>
      <h3>Key Results:</h3>
      <ul>
        <li>30% reduction in operational costs</li>
        <li>50% faster response times for routine inquiries</li>
        <li>Improved resource allocation and staff productivity</li>
      </ul>
    `,
  },
  {
    slug: 'case-study-3',
    title: 'Enhancing Lead Qualification: 15% Higher Conversion Rates',
    roi: '15% increase in lead conversion rates',
    content: `
      <p>We partnered with a B2B sales organization to refine their lead qualification process, which resulted in a <strong>15% higher conversion rate</strong> for qualified leads. Our system leveraged AI to analyze lead data, identify high-potential prospects, and prioritize them for the sales team.</p>
      <p>This targeted approach ensured that sales representatives spent their time on leads with the highest probability of conversion, significantly improving sales efficiency and revenue generation. The case study demonstrates how intelligent lead management can drive substantial business growth.</p>
      <h3>Key Results:</h3>
      <ul>
        <li>15% increase in lead conversion rates</li>
        <li>25% reduction in time spent on unqualified leads</li>
        <li>Improved sales team focus and productivity</li>
      </ul>
    `,
  },
];

interface CaseStudyPageProps {
  params: { slug: string };
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ params }) => {
  const study = caseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{study.title}</h1>
      <p className="text-green-600 dark:text-green-400 font-semibold mb-6">ROI: {study.roi}</p>
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: study.content }} />
      <div className="mt-8">
        <Link href="/case-studies" className="text-blue-500 hover:underline">
          &larr; Back to Case Studies
        </Link>
      </div>
    </div>
  );
};

export default CaseStudyPage;
