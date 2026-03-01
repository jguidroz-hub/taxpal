import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Ultimate Freelance Tax Deduction Checklist (2026) | TaxPal',
  description: 'Don\'t miss a single deduction. The complete 2026 checklist of tax deductions for freelancers, contractors, and self-employed professionals — organized by category with IRS limits.',
  openGraph: {
    title: 'The Ultimate Freelance Tax Deduction Checklist (2026)',
    description: 'Every deduction freelancers can take in 2026, organized by category.',
    type: 'article',
    publishedTime: '2026-02-28T00:00:00Z',
  },
};

export default function FreelanceTaxDeductionChecklist() {
  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/blog" className="hover:text-gray-900">← Blog</Link>
            <span>·</span>
            <time dateTime="2026-02-28">February 28, 2026</time>
            <span>·</span>
            <span>12 min read</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
            The Ultimate Freelance Tax Deduction Checklist for 2026
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The average freelancer overpays taxes by $3,000-7,000/year because they miss deductions. This checklist covers every legitimate deduction for self-employed professionals — bookmark it, print it, share it.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-400 italic">
            ⚠️ This is educational content, not tax advice. Consult a qualified CPA for your specific situation. IRS rules change annually.
          </p>

          <h2>🏠 Home Office Deductions</h2>
          <ul>
            <li><strong>Home office (simplified method)</strong> — $5/sq ft, up to 300 sq ft = max $1,500 deduction. No receipts needed.</li>
            <li><strong>Home office (regular method)</strong> — Actual expenses (rent/mortgage interest, utilities, insurance, repairs) × percentage of home used for business. More work but often higher deduction.</li>
            <li><strong>Internet service</strong> — Business percentage of your monthly bill (if you work from home 60% of the time, deduct 60%)</li>
            <li><strong>Phone bill</strong> — Business percentage of your cell phone plan</li>
            <li><strong>Office furniture</strong> — Desk, chair, monitor, keyboard. Section 179 lets you deduct the full cost in year one.</li>
            <li><strong>Office supplies</strong> — Paper, printer ink, pens, notebooks, sticky notes</li>
          </ul>

          <h2>💻 Technology & Equipment</h2>
          <ul>
            <li><strong>Computer/laptop</strong> — Full cost via Section 179 if used primarily for business</li>
            <li><strong>Software subscriptions</strong> — Adobe Creative Cloud, Microsoft 365, Figma, Notion, Slack, Zoom, project management tools</li>
            <li><strong>Cloud hosting</strong> — AWS, Vercel, Heroku, domain names, SSL certificates</li>
            <li><strong>AI tools</strong> — ChatGPT Plus, GitHub Copilot, Midjourney — if used for business</li>
            <li><strong>Backup drives & storage</strong> — External drives, NAS, cloud backup services</li>
            <li><strong>Camera/audio equipment</strong> — If you create content, record courses, or do video calls with clients</li>
          </ul>

          <h2>📚 Professional Development</h2>
          <ul>
            <li><strong>Online courses</strong> — Udemy, Coursera, LinkedIn Learning, bootcamps — if related to your current business</li>
            <li><strong>Books & publications</strong> — Business, industry, and technical books</li>
            <li><strong>Conferences & events</strong> — Registration fees, travel, and meals at conferences</li>
            <li><strong>Professional memberships</strong> — Industry associations, chambers of commerce, coworking memberships</li>
            <li><strong>Certifications</strong> — AWS, PMP, CPA exam prep — anything that maintains or improves current skills</li>
          </ul>

          <h2>🚗 Transportation & Travel</h2>
          <ul>
            <li><strong>Mileage (standard rate)</strong> — 70¢/mile for 2026 (IRS rate). Track every business trip with an app.</li>
            <li><strong>Mileage (actual expenses)</strong> — Gas, insurance, maintenance, depreciation × business percentage. More recordkeeping but sometimes higher.</li>
            <li><strong>Parking & tolls</strong> — For business trips (not commuting to a regular office)</li>
            <li><strong>Business travel</strong> — Flights, hotels, rental cars, rideshares for client meetings, conferences, or remote work trips</li>
            <li><strong>Meals during travel</strong> — 50% deductible when traveling for business overnight</li>
          </ul>

          <h2>💼 Business Operations</h2>
          <ul>
            <li><strong>Business insurance</strong> — Professional liability (E&O), general liability, cyber liability</li>
            <li><strong>Legal & accounting fees</strong> — CPA fees, tax prep, contract review, business formation costs</li>
            <li><strong>Business licenses & permits</strong> — State LLC fees, business licenses, professional licenses</li>
            <li><strong>Bank fees</strong> — Business checking account fees, PayPal/Stripe fees, wire transfer fees</li>
            <li><strong>Contractor payments</strong> — Subcontractors, virtual assistants, freelance designers — anyone you pay to help run your business</li>
            <li><strong>Coworking space</strong> — Monthly memberships or day passes</li>
          </ul>

          <h2>📣 Marketing & Client Acquisition</h2>
          <ul>
            <li><strong>Website costs</strong> — Hosting, domain, design, maintenance</li>
            <li><strong>Advertising</strong> — Google Ads, Facebook/Instagram ads, LinkedIn ads, sponsored content</li>
            <li><strong>Business cards & print materials</strong> — Cards, brochures, portfolio prints</li>
            <li><strong>Client gifts</strong> — Up to $25/person/year deductible</li>
            <li><strong>Networking events</strong> — Meals at business meetings (50% deductible)</li>
            <li><strong>Portfolio & demo tools</strong> — Dribbble Pro, Behance, personal domain for portfolio</li>
          </ul>

          <h2>🏥 Health & Retirement</h2>
          <ul>
            <li><strong>Self-employed health insurance</strong> — 100% deductible (medical, dental, vision premiums for you, spouse, and dependents). This is an above-the-line deduction — you get it even without itemizing.</li>
            <li><strong>HSA contributions</strong> — $4,300 individual / $8,550 family (2026 limits) if you have a high-deductible health plan</li>
            <li><strong>SEP-IRA contributions</strong> — Up to 25% of net self-employment income, max $70,000 (2026)</li>
            <li><strong>Solo 401(k)</strong> — Up to $23,500 employee contribution + 25% employer match, max $70,000 total. Best if your income is over $100K.</li>
            <li><strong>Self-employment tax (50%)</strong> — You deduct half of your SE tax as an adjustment to income. This happens automatically on Schedule SE.</li>
          </ul>

          <h2>🔑 The Deductions Most Freelancers Miss</h2>
          <ol>
            <li><strong>Retirement contributions</strong> — 40% of freelancers don&apos;t contribute to any retirement account. A SEP-IRA on $100K income saves ~$7,500 in taxes immediately.</li>
            <li><strong>Health insurance premiums</strong> — Many freelancers don&apos;t realize these are fully deductible, not just an itemized deduction.</li>
            <li><strong>State and local taxes</strong> — If you pay state income tax or local business taxes, they&apos;re deductible (up to $10K SALT cap on personal return).</li>
            <li><strong>Home office</strong> — 52% of self-employed people who work from home don&apos;t claim the home office deduction. Even the simplified method is free money.</li>
            <li><strong>Business use of personal vehicle</strong> — Even occasional client visits, post office runs, and supply store trips add up to thousands of miles per year.</li>
          </ol>

          <div className="bg-green-50 rounded-2xl p-8 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Never Miss a Deduction Again</h3>
            <p className="text-gray-600 mb-4">
              TaxPal tracks your deductions automatically, calculates quarterly estimated taxes, and alerts you when you&apos;re missing common write-offs. Built specifically for freelancers and 1099 contractors.
            </p>
            <Link href="/" className="inline-block bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
              Start Tracking Free →
            </Link>
          </div>

          <h2>📅 Key 2026 Tax Dates</h2>
          <ul>
            <li><strong>January 15</strong> — Q4 2025 estimated tax payment due</li>
            <li><strong>April 15</strong> — 2025 tax return due + Q1 2026 estimated payment</li>
            <li><strong>June 15</strong> — Q2 2026 estimated payment due</li>
            <li><strong>September 15</strong> — Q3 2026 estimated payment due</li>
            <li><strong>October 15</strong> — Extended 2025 tax return due</li>
          </ul>

          <h2>The Bottom Line</h2>
          <p>
            Every dollar of deductions saves you 25-40 cents in taxes (depending on your bracket + self-employment tax). A freelancer earning $100K who finds an extra $10,000 in deductions saves $3,000-4,000 in real money. That&apos;s worth an afternoon going through this checklist.
          </p>
          <p>
            <strong>Action step:</strong> Go through each category above. For every item that applies to you, check whether you&apos;re currently tracking it. If not, start now — and consider talking to a CPA who specializes in self-employment to make sure you&apos;re not leaving money on the table.
          </p>
        </div>
      </article>
    </main>
  );
}
