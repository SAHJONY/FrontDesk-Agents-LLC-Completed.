import React from 'react';
import Link from 'next/link';

interface CaseStudy {
  slug: string;
  title: string;
  roi: string;
  excerpt: string;
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'case-study-1',
    title: 'Boosting Customer Retention by 20% with AI Agents',
    roi: '20% increase in customer retention',
    excerpt: 'Discover how our AI agents helped a leading e-commerce brand significantly improve their customer retention rates and reduce churn.',
  },
  {
    slug: 'case-study-2',
    title: 'Streamlining Operations: 30% Reduction in Support Costs',
    roi: '30% reduction in support operational costs',
    excerpt: 'Learn how a national service provider optimized their front desk operations, leading to substantial cost savings and improved efficiency.',
  },
  {
    slug: 'case-study-3',
    title: 'Enhancing Lead Qualification: 15% Higher Conversion Rates',
    roi: '15% increase in lead conversion rates',
    excerpt: 'See how our advanced lead qualification system enabled a B2B sales team to achieve higher conversion rates and focus on high-value prospects.',
  },
];

const CaseStudiesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study) => (
          <div key={study.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/case-studies/${study.slug}`} className="hover:text-blue-500">
                  {study.title}
                </Link>
              </h2>
              <p className="text-green-600 dark:text-green-400 font-semibold mb-2">ROI: {study.roi}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{study.excerpt}</p>
              <Link href={`/case-studies/${study.slug}`} className="text-blue-500 hover:underline">
                Read Full Case Study
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesPage;
