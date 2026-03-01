import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — TaxPal',
  description: 'Tax guides, tips, and strategies for freelancers and 1099 contractors. Quarterly taxes, deductions, and tax planning made simple.',
};

const posts = [
  {
    slug: 'freelance-tax-deduction-checklist',
    title: 'The Ultimate Freelance Tax Deduction Checklist for 2026',
    description: 'Don\'t miss a single write-off. Every deduction for freelancers organized by category with IRS limits.',
    date: 'February 28, 2026',
    tag: 'Checklist',
    readTime: '12 min read',
  },
  {
    slug: 'quarterly-tax-guide-freelancers',
    title: 'Quarterly Estimated Taxes for Freelancers: The Complete 2026 Guide',
    description: 'When to pay, how much to pay, and how to avoid underpayment penalties. Everything a freelancer needs to know about quarterly taxes.',
    date: 'February 28, 2026',
    tag: 'Guide',
    readTime: '10 min read',
  },
  {
    slug: '1099-tax-deductions',
    title: '25 Tax Deductions Every 1099 Contractor Should Know',
    description: 'From home office to health insurance — the deductions that save freelancers thousands. With examples and IRS rules.',
    date: 'February 28, 2026',
    tag: 'Tax Tips',
    readTime: '12 min read',
  },
  {
    slug: 'w2-to-1099-tax-guide',
    title: 'W-2 to 1099: The Complete Tax Guide for New Freelancers',
    description: 'Everything that changes when you switch from employee to freelancer: self-employment tax, quarterly payments, deductions, and business structure.',
    date: 'February 28, 2026',
    tag: 'Guide',
    readTime: '12 min read',
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-4">
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">← Back to TaxPal</Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
        <p className="text-gray-500 text-lg mb-12">Tax guides and strategies for freelancers and 1099 contractors.</p>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">{post.tag}</span>
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-xs text-gray-400">· {post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h2>
              <p className="text-gray-500">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
