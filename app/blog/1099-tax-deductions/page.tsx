import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '25 Tax Deductions Every 1099 Contractor Should Know — TaxPal',
  description: 'The most commonly missed tax deductions for freelancers and independent contractors. Home office, health insurance, retirement, vehicle, and more.',
  openGraph: {
    title: '25 Tax Deductions Every 1099 Contractor Should Know',
    description: 'Stop overpaying the IRS. These deductions save freelancers thousands.',
    type: 'article',
  },
};

export default function TaxDeductionsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-4">
          <Link href="/blog" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">← All Posts</Link>
        </div>
        <header className="mb-12">
          <div className="flex gap-3 mb-3">
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300">Tax Tips</span>
            <span className="text-xs text-gray-400">February 28, 2026</span>
            <span className="text-xs text-gray-400">· 12 min read</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            25 Tax Deductions Every 1099 Contractor Should Know
          </h1>
          <p className="text-xl text-gray-500">
            The average freelancer overpays by $3,000-5,000 per year simply because they miss deductions they&apos;re entitled to. Don&apos;t be that freelancer.
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            As a 1099 contractor, every legitimate business expense reduces your taxable income — and since you&apos;re paying both income tax AND self-employment tax (15.3%), each deduction saves you roughly 30-40 cents per dollar. A $1,000 deduction saves you $300-400.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">🏠 Home &amp; Office</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">1. Home Office Deduction</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you use a dedicated space in your home regularly and exclusively for business, you can deduct it. Two methods: <strong className="text-gray-900 dark:text-white">simplified</strong> ($5/sq ft, max $1,500) or <strong className="text-gray-900 dark:text-white">actual expenses</strong> (percentage of rent, utilities, insurance, etc.). The actual method usually saves more but requires records.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">2. Internet &amp; Phone</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Deduct the business-use percentage of your internet and phone bills. If you use your phone 60% for work, deduct 60% of the bill.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">3. Office Supplies &amp; Equipment</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Pens, paper, printer ink, desk, chair, monitors, keyboards — all deductible. Equipment over $2,500 can be expensed under Section 179 or depreciated.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">4. Computer &amp; Software</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Your laptop, tablet, software subscriptions (Adobe, Microsoft 365, Figma, etc.) — deduct the business-use percentage.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">🚗 Transportation</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">5. Vehicle Expenses</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Standard mileage rate for 2026: <strong className="text-gray-900 dark:text-white">67 cents/mile</strong>. Track every business mile — client meetings, coworking commute, supply runs. Apps like MileIQ make this easy.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">6. Parking &amp; Tolls</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Deductible when related to business travel — parking at a client site, airport parking for a business trip, toll roads.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">7. Travel Expenses</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Flights, hotels, rental cars, and meals (50% for meals) when traveling for business. The trip must be primarily for business — you can extend for personal days but only deduct the business portion.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">💰 Insurance &amp; Retirement</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">8. Health Insurance Premiums</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you pay for your own health insurance (medical, dental, vision), you can deduct 100% of premiums. This is an &quot;above the line&quot; deduction — you get it even with the standard deduction.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">9. Retirement Contributions</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            <strong className="text-gray-900 dark:text-white">SEP-IRA:</strong> Contribute up to 25% of net self-employment income (max $69,000 in 2026). <strong className="text-gray-900 dark:text-white">Solo 401(k):</strong> Up to $23,500 employee + 25% employer contribution. These are the most powerful tax-reduction tools available to freelancers.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">10. Business Insurance</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            General liability, professional liability (E&amp;O), cyber insurance — all deductible business expenses.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">📚 Professional Development</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">11. Education &amp; Training</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Courses, certifications, books, and conferences related to your current business. Must maintain or improve skills for your existing field (not qualify you for a new career).
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">12. Professional Subscriptions</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Industry publications, professional memberships, trade associations.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">13. Coworking Space</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Monthly membership, day passes, meeting room rentals — all deductible. Can&apos;t take home office deduction for the same space.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">💼 Business Operations</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">14. Accounting &amp; Legal Fees</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            CPA fees, tax prep software, legal consultations, contract review — all deductible.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">15. Bank Fees &amp; Payment Processing</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Business bank account fees, PayPal/Stripe processing fees, credit card annual fees (business-use portion).
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">16. Marketing &amp; Advertising</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Website hosting, domain names, Google/Facebook ads, business cards, portfolio site — all deductible.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">17. Subcontractor Payments</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you hire other freelancers or contractors to help with projects, those payments are deductible. Remember to issue 1099s to anyone you pay $600+.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">18. SaaS &amp; Cloud Services</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            AWS, Vercel, GitHub, Slack, Notion, Zoom — any software you use for business.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">🎯 Commonly Missed</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">19. Self-Employment Tax Deduction</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            You can deduct the <strong className="text-gray-900 dark:text-white">employer-equivalent portion</strong> (half) of your self-employment tax from your income. This is automatic on your return but many people don&apos;t account for it in quarterly estimates.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">20. Qualified Business Income (QBI) Deduction</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Section 199A lets eligible self-employed individuals deduct up to <strong className="text-gray-900 dark:text-white">20% of qualified business income</strong>. Income limits apply for service businesses ($191,950 single / $383,900 married in 2026).
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">21. Business Meals</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Meals with clients, prospects, or while traveling for business — <strong className="text-gray-900 dark:text-white">50% deductible</strong>. Keep receipts and note who you met with and the business purpose.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">22. Student Loan Interest</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Up to $2,500/year in student loan interest — not technically a business deduction but commonly missed by freelancers.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">23. State &amp; Local Taxes (SALT)</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            State income tax payments and property taxes — up to $10,000 combined if you itemize.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">24. Shipping &amp; Postage</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you ship products, materials, or documents for business, all costs are deductible.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">25. Business Gifts</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Up to $25 per person per year for client/vendor gifts. Holiday gifts, thank-you gifts, referral gifts.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Track Everything</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The most common reason freelancers miss deductions: they didn&apos;t track expenses in real-time. By tax time, receipts are lost and memory is fuzzy. The fix: track expenses as they happen, categorize monthly, and review quarterly.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Stop missing deductions</h3>
            <p className="text-gray-500 mb-6">TaxPal tracks your income, estimates your taxes, and reminds you what&apos;s deductible. Built for freelancers.</p>
            <Link
              href="/signup"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Start Free →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
