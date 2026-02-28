import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'W-2 to 1099: The Complete Tax Guide for New Freelancers — TaxPal',
  description: 'Switching from employee to freelancer? Here\'s everything that changes with your taxes: self-employment tax, quarterly payments, deductions, and retirement.',
  openGraph: {
    title: 'W-2 to 1099: Tax Guide for New Freelancers',
    description: 'Everything that changes when you go from employee to freelancer.',
    type: 'article',
  },
};

export default function W2To1099Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-4">
          <Link href="/blog" className="text-indigo-600 dark:text-indigo-400 text-sm">← All Posts</Link>
        </div>
        <header className="mb-12">
          <div className="flex gap-3 mb-3">
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">Guide</span>
            <span className="text-xs text-gray-400">February 28, 2026</span>
            <span className="text-xs text-gray-400">· 12 min read</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            W-2 to 1099: The Complete Tax Guide for New Freelancers
          </h1>
          <p className="text-xl text-gray-500">
            You just left your 9-to-5. Congratulations — and condolences to your tax simplicity. Here&apos;s everything that changes.
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Big Shift: Nobody Withholds Taxes for You</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            As a W-2 employee, taxes were invisible. Your employer withheld federal income tax, state income tax, Social Security, and Medicare from every paycheck. You filed once a year and usually got a refund.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            As a 1099 contractor, <strong className="text-gray-900 dark:text-white">nobody withholds anything</strong>. You receive 100% of what clients pay you, and it&apos;s your responsibility to set aside money for taxes and pay them quarterly. Miss this and you&apos;ll face a painful tax bill plus penalties in April.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">What Changes: Side-by-Side</h2>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">W-2 Employee</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">1099 Contractor</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                <tr className="border-t"><td className="px-4 py-3">Tax withholding</td><td className="px-4 py-3">Automatic</td><td className="px-4 py-3 text-red-600 dark:text-red-400">You handle it</td></tr>
                <tr className="border-t"><td className="px-4 py-3">Social Security/Medicare</td><td className="px-4 py-3">7.65% (employer pays other half)</td><td className="px-4 py-3 text-red-600 dark:text-red-400">15.3% (you pay both halves)</td></tr>
                <tr className="border-t"><td className="px-4 py-3">Tax filing frequency</td><td className="px-4 py-3">Annual</td><td className="px-4 py-3 text-amber-600 dark:text-amber-400">Quarterly + annual</td></tr>
                <tr className="border-t"><td className="px-4 py-3">Deductions</td><td className="px-4 py-3">Standard deduction only</td><td className="px-4 py-3 text-green-600 dark:text-green-400">Business expenses deductible</td></tr>
                <tr className="border-t"><td className="px-4 py-3">Health insurance</td><td className="px-4 py-3">Employer-subsidized</td><td className="px-4 py-3 text-amber-600 dark:text-amber-400">You buy it (but it&apos;s deductible)</td></tr>
                <tr className="border-t"><td className="px-4 py-3">Retirement</td><td className="px-4 py-3">401(k) with employer match</td><td className="px-4 py-3 text-green-600 dark:text-green-400">SEP-IRA/Solo 401(k) (higher limits!)</td></tr>
                <tr className="border-t"><td className="px-4 py-3">QBI deduction</td><td className="px-4 py-3">No</td><td className="px-4 py-3 text-green-600 dark:text-green-400">Up to 20% of income</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Step 1: Set Up a Tax Savings System</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The day you receive your first 1099 payment, open a separate savings account for taxes. Every time you get paid, transfer <strong className="text-gray-900 dark:text-white">25-35%</strong> to this account immediately.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6 my-6">
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">💡 Quick rule of thumb</p>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>Income under $50K → set aside 25%</li>
              <li>Income $50K-$100K → set aside 30%</li>
              <li>Income over $100K → set aside 35%</li>
            </ul>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Yes, this feels like a lot. But remember: as an employee, your employer was already taking ~30% before you ever saw the money. Now you just see it first.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Step 2: Understand Self-Employment Tax</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            This is the biggest surprise for new freelancers. Self-employment tax is 15.3% on your net self-employment income:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
            <li>Social Security: 12.4% on first $168,600 (2026)</li>
            <li>Medicare: 2.9% on all income</li>
            <li>Additional Medicare: 0.9% on income over $200K</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            As an employee, you only paid 7.65% — your employer covered the other half. Now you pay both halves. On $100K of freelance income, that&apos;s <strong className="text-gray-900 dark:text-white">$14,130 in self-employment tax alone</strong>, before income tax.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Step 3: Start Tracking Deductions Immediately</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The good news: as a 1099 contractor, you can deduct business expenses from your taxable income. This is the single biggest tax advantage over W-2 employment. Key deductions:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li><strong className="text-gray-900 dark:text-white">Home office:</strong> $1,500 simplified or actual costs</li>
            <li><strong className="text-gray-900 dark:text-white">Health insurance premiums:</strong> 100% deductible</li>
            <li><strong className="text-gray-900 dark:text-white">Retirement contributions:</strong> SEP-IRA up to 25% of income</li>
            <li><strong className="text-gray-900 dark:text-white">Equipment:</strong> Computer, software, phone (business %)</li>
            <li><strong className="text-gray-900 dark:text-white">Vehicle:</strong> 67¢/mile for business travel</li>
            <li><strong className="text-gray-900 dark:text-white">Internet/phone:</strong> Business-use percentage</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Check out our <Link href="/blog/1099-tax-deductions" className="text-indigo-600 dark:text-indigo-400">complete list of 25 deductions for 1099 contractors</Link>.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Step 4: Pay Quarterly Estimated Taxes</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The IRS expects quarterly payments if you&apos;ll owe $1,000+ for the year. Deadlines:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li>Q1: April 15 | Q2: June 15 | Q3: September 15 | Q4: January 15</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            For your first year, use the <strong className="text-gray-900 dark:text-white">safe harbor method</strong>: pay 100% of last year&apos;s total tax liability in 4 equal payments. You won&apos;t get penalized even if you owe more at year-end. See our <Link href="/blog/quarterly-tax-guide-freelancers" className="text-indigo-600 dark:text-indigo-400">complete quarterly tax guide</Link>.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Step 5: Consider Your Business Structure</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Most freelancers start as sole proprietors (default — no paperwork needed). As your income grows, consider:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-3 mb-6">
            <li><strong className="text-gray-900 dark:text-white">LLC:</strong> Liability protection, no tax change (single-member LLC is tax-transparent)</li>
            <li><strong className="text-gray-900 dark:text-white">S-Corp election:</strong> Once income exceeds ~$60-80K, S-Corp can save $5K-15K/year in self-employment tax by splitting income into salary + distributions. Talk to a CPA before electing.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The First-Year Survival Checklist</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>☐ Open a separate business checking + tax savings account</li>
              <li>☐ Set up automatic 30% transfer to tax savings on every payment</li>
              <li>☐ Get an EIN from the IRS (free, takes 5 minutes online)</li>
              <li>☐ Start tracking expenses from Day 1 (app or spreadsheet)</li>
              <li>☐ Set calendar reminders for quarterly tax deadlines</li>
              <li>☐ Research health insurance options (Healthcare.gov, broker, or association plan)</li>
              <li>☐ Open a SEP-IRA or Solo 401(k) before year-end</li>
              <li>☐ Find a CPA who specializes in freelancers/self-employed</li>
              <li>☐ Save all receipts ($75+ required by IRS, but save everything)</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Make your first year painless</h3>
            <p className="text-gray-500 mb-6">TaxPal tracks your income, calculates estimated taxes, and tells you exactly what to set aside. Built for the W-2 to 1099 transition.</p>
            <Link href="/signup" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Start Free →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
