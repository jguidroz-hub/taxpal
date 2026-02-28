import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quarterly Estimated Taxes for Freelancers: Complete 2026 Guide — TaxPal',
  description: 'Learn when to pay quarterly taxes, how to calculate estimated payments, and avoid IRS underpayment penalties. Built for freelancers and 1099 contractors.',
  openGraph: {
    title: 'Quarterly Estimated Taxes for Freelancers (2026 Guide)',
    description: 'When to pay, how much, and how to avoid penalties.',
    type: 'article',
  },
};

export default function QuarterlyTaxGuidePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-4">
          <Link href="/blog" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">← All Posts</Link>
        </div>
        <header className="mb-12">
          <div className="flex gap-3 mb-3">
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">Guide</span>
            <span className="text-xs text-gray-400">February 28, 2026</span>
            <span className="text-xs text-gray-400">· 10 min read</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Quarterly Estimated Taxes for Freelancers: The Complete 2026 Guide
          </h1>
          <p className="text-xl text-gray-500">
            If you earn income without tax withholding — freelance work, 1099 contracts, side hustles — the IRS expects you to pay taxes quarterly. Here&apos;s exactly how it works.
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Who Needs to Pay Quarterly Taxes?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            You need to make estimated tax payments if you expect to owe <strong className="text-gray-900 dark:text-white">$1,000 or more</strong> in federal taxes for the year after subtracting withholding and credits. This applies to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li>Freelancers and independent contractors (1099-NEC income)</li>
            <li>Self-employed business owners (Schedule C)</li>
            <li>Gig workers (Uber, DoorDash, Fiverr, Upwork)</li>
            <li>People with significant investment income</li>
            <li>Rental property owners</li>
            <li>Anyone transitioning from W-2 to 1099 (this is where most mistakes happen)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2026 Quarterly Tax Deadlines</h2>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Quarter</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Income Period</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Due Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm">Q1</td>
                  <td className="px-4 py-3 text-sm">January 1 – March 31</td>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400">April 15, 2026</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm">Q2</td>
                  <td className="px-4 py-3 text-sm">April 1 – May 31</td>
                  <td className="px-4 py-3 text-sm font-semibold">June 15, 2026</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm">Q3</td>
                  <td className="px-4 py-3 text-sm">June 1 – August 31</td>
                  <td className="px-4 py-3 text-sm font-semibold">September 15, 2026</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm">Q4</td>
                  <td className="px-4 py-3 text-sm">September 1 – December 31</td>
                  <td className="px-4 py-3 text-sm font-semibold">January 15, 2027</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Note: Q2 only covers 2 months but Q3 covers 3 months. Yes, the IRS quarters are uneven. Don&apos;t ask why.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How Much Should You Pay?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            There are two IRS-approved methods to calculate your quarterly payments:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Method 1: Current Year Estimate (90% Rule)</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Estimate your total tax for 2026 and pay at least 90% of it in quarterly installments. This works well if your income is predictable.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 my-6">
            <p className="text-sm text-gray-500 mb-2">Example:</p>
            <p className="text-gray-700 dark:text-gray-300">
              Expected 2026 income: $120,000<br />
              Estimated tax (federal + SE): ~$33,000<br />
              Quarterly payment: $33,000 ÷ 4 = <strong className="text-gray-900 dark:text-white">$8,250/quarter</strong>
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Method 2: Prior Year Safe Harbor (100%/110% Rule)</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Pay 100% of last year&apos;s tax liability divided into 4 payments. If your AGI was over $150,000, you need to pay 110%. This is the &quot;safe harbor&quot; — you&apos;re guaranteed to avoid penalties even if you owe more.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6 my-6">
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">💡 Pro tip</p>
            <p className="text-gray-700 dark:text-gray-300">
              The safe harbor method is usually best for freelancers with variable income. Even if you make more this year, you won&apos;t get penalized — you&apos;ll just owe a larger balance at tax time.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Self-Employment Tax Surprise</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            This is the #1 shock for people going from W-2 to 1099. As an employee, your employer pays half of Social Security and Medicare taxes. As a freelancer, <strong className="text-gray-900 dark:text-white">you pay both halves — 15.3%</strong> on top of income tax.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li>Social Security: 12.4% on first $168,600 (2026)</li>
            <li>Medicare: 2.9% on all income</li>
            <li>Additional Medicare: 0.9% on income over $200K (single)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            A freelancer earning $100K pays roughly $14,100 in self-employment tax <em>before</em> income tax. Your total effective rate as a freelancer is often 30-40%, not the 22-24% bracket you might expect.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How to Actually Pay</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            You have several options to submit quarterly payments to the IRS:
          </p>
          <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li><strong className="text-gray-900 dark:text-white">IRS Direct Pay</strong> (irs.gov/payments) — free, instant bank transfer</li>
            <li><strong className="text-gray-900 dark:text-white">EFTPS</strong> (Electronic Federal Tax Payment System) — schedule payments in advance</li>
            <li><strong className="text-gray-900 dark:text-white">IRS2Go app</strong> — mobile payments</li>
            <li><strong className="text-gray-900 dark:text-white">Credit/debit card</strong> — via approved processors (1.87-1.98% fee)</li>
            <li><strong className="text-gray-900 dark:text-white">Check/money order</strong> — mail with Form 1040-ES voucher</li>
          </ol>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">What Happens If You Don&apos;t Pay?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The IRS charges an <strong className="text-gray-900 dark:text-white">underpayment penalty</strong> if you don&apos;t pay enough during the year. The penalty rate is the federal short-term rate plus 3 percentage points — currently around 8% annualized.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            You avoid the penalty if you paid at least 90% of this year&apos;s tax or 100%/110% of last year&apos;s tax (safe harbor). The penalty isn&apos;t huge — typically a few hundred dollars — but it compounds with the stress of a large tax bill.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Don&apos;t Forget State Taxes</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Most states with income tax also require quarterly estimated payments. The deadlines often align with federal dates but not always. Check your state&apos;s requirements — Texas, Florida, Nevada, Washington, Wyoming, Alaska, South Dakota, Tennessee, and New Hampshire have no state income tax.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Automate It</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The best way to handle quarterly taxes is to automate the tracking. Set aside 25-35% of every payment you receive into a separate savings account. When the deadline hits, the money is already there.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">TaxPal</Link> automates this process — it tracks your 1099 income, calculates your estimated payments based on your actual earnings, and sends you reminders before each deadline.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Never miss a quarterly payment</h3>
            <p className="text-gray-500 mb-6">TaxPal calculates your estimated taxes and reminds you before every deadline.</p>
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
