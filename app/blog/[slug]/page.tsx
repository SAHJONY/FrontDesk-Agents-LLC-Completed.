import React from 'react';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'post-1',
    title: 'The Future of AI in Customer Service',
    date: 'February 1, 2026',
    content: `
      <p>Artificial intelligence is rapidly transforming the landscape of customer service. From chatbots handling routine inquiries to advanced AI systems predicting customer needs, the future of customer interactions is undeniably intertwined with AI.</p>
      <p>AI-powered tools can analyze vast amounts of data to provide personalized support, reduce response times, and improve overall customer satisfaction. This not only benefits customers but also frees up human agents to focus on more complex and empathetic tasks.</p>
      <p>However, the integration of AI in customer service also presents challenges, such as maintaining a human touch and ensuring data privacy. Striking the right balance between automation and human interaction will be key to successful implementation.</p>
    `,
  },
  {
    slug: 'post-2',
    title: 'Optimizing Your Front Desk with Automation',
    date: 'January 25, 2026',
    content: `
      <p>Automating front desk operations can significantly enhance efficiency and reduce operational costs. Tasks such as appointment scheduling, visitor check-ins, and initial inquiry handling can be seamlessly managed by automated systems.</p>
      <p>Implementing automation allows your staff to dedicate more time to critical tasks that require human expertise and personal interaction. This leads to a more productive workforce and a smoother experience for clients.</p>
      <p>When considering automation, it's important to choose solutions that integrate well with your existing systems and can be customized to meet your specific business needs. A phased approach to implementation can also help ensure a smooth transition.</p>
    `,
  },
  {
    slug: 'post-3',
    title: 'Choosing the Right Virtual Receptionist',
    date: 'January 18, 2026',
    content: `
      <p>A virtual receptionist can be a game-changer for businesses looking to improve their communication and client management. But with numerous options available, choosing the right one requires careful consideration.</p>
      <p>Key factors to evaluate include the range of services offered (e.g., call answering, message taking, appointment setting), integration capabilities with your CRM, scalability, and pricing models. It's also crucial to assess the quality of their AI and human support.</p>
      <p>Investing in a virtual receptionist that aligns with your business values and operational demands can lead to increased client satisfaction and a more professional image.</p>
    `,
  },
];

interface BlogPostPageProps {
  params: { slug: string };
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ params }) => {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{post.date}</p>
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-8">
        <Link href="/blog" className="text-blue-500 hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPage;
