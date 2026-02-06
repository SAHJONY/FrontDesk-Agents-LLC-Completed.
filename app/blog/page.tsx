import React from 'react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'post-1',
    title: 'The Future of AI in Customer Service',
    date: 'February 1, 2026',
    excerpt: 'Explore how AI is revolutionizing customer interactions and streamlining support operations.',
  },
  {
    slug: 'post-2',
    title: 'Optimizing Your Front Desk with Automation',
    date: 'January 25, 2026',
    excerpt: 'Learn strategies to automate routine tasks and enhance efficiency at your front desk.',
  },
  {
    slug: 'post-3',
    title: 'Choosing the Right Virtual Receptionist',
    date: 'January 18, 2026',
    excerpt: 'A comprehensive guide to selecting a virtual receptionist service that fits your business needs.',
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-500">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{post.date}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
