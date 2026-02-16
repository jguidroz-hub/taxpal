import Link from 'next/link';

const features = [
  {
    icon: '🧮',
    title: 'Estimated Tax Calculator',
    desc: 'Enter your income and deductions. Get your estimated quarterly tax payment instantly. Updated for 2026 tax brackets.',
  },
  {
    icon: '📅',
    title: 'Quarterly Deadline Alerts',
    desc: 'Never miss a payment. Get reminders before April 15, June 16, September 15, and January 15 deadlines.',
  },
  {
    icon: '💰',
    title: 'Deduction Tracker',
    desc: 'Log business expenses as they happen. Categorized by IRS Schedule C categories. Export-ready for your CPA.',
  },
  {
    icon: '📊',
    title: 'W-2 to 1099 Transition Planner',
    desc: 'Going freelance? Model your take-home pay, self-employment tax, and required savings rate before you quit.',
  },
  {
    icon: '🔔',
    title: 'Smart Tax Alerts',
    desc: 'Get notified about tax law changes that affect freelancers. Know about new deductions before tax season.',
  },
  {
    icon: '📄',
    title: 'Tax-Ready Reports',
    desc: 'Export quarterly summaries, annual P&L, and deduction reports. Hand them to your CPA and save hours.',
  },
];

const tiers = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    desc: 'For new freelancers',
    features: ['Estimated tax calculator', 'Quarterly deadline reminders', 'Up to 50 deductions/month', 'Basic reports', 'Email support'],
    cta: 'Start Free Trial',
    href: '/signup?plan=starter',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    desc: 'For active freelancers',
    features: ['Everything in Starter', 'Unlimited deductions', 'W-2 to 1099 transition planner', 'Smart tax alerts', 'CSV/PDF export', 'Priority support'],
    cta: 'Start Free Trial',
    href: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Business',
    price: '$79',
    period: '/month',
    desc: 'For agencies & multi-client',
    features: ['Everything in Pro', 'Multiple business entities', 'CPA collaboration portal', 'API access', 'Quarterly tax filing prep', 'Dedicated support'],
    cta: 'Start Free Trial',
    href: '/signup?plan=business',
    popular: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧾</span>
            <span className="font-bold text-xl">TaxPal</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log In</Link>
            <Link href="/signup" className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">Start Free →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full mb-6">
            ⏰ Tax season 2026 — quarterly estimates due April 15
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Stop guessing your taxes.<br />
            <span className="text-blue-600">Start planning them.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TaxPal helps freelancers and 1099 contractors calculate estimated taxes, 
            track deductions, and never miss a quarterly payment. Built for the W-2 to 1099 transition.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800">
              Start Free — No Card Required
            </Link>
            <a href="#features" className="border border-gray-300 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50">
              See Features
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">Free for up to 3 quarterly calculations. Upgrade anytime.</p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">The freelancer tax problem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">😰</div>
              <h3 className="font-semibold mb-2">Surprise tax bills</h3>
              <p className="text-gray-600 text-sm">42% of freelancers underpay estimated taxes and get hit with penalties. Don&apos;t be one of them.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-semibold mb-2">Spreadsheet chaos</h3>
              <p className="text-gray-600 text-sm">Tracking deductions in spreadsheets is error-prone. Miss one and you overpay. Claim a wrong one and you get audited.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-semibold mb-2">Expensive CPAs</h3>
              <p className="text-gray-600 text-sm">A CPA costs $200-500/hr. TaxPal handles the 80% that doesn&apos;t need a human — so your CPA bill shrinks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything you need for freelancer taxes</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">From calculating your quarterly estimates to exporting reports for your CPA. One tool, zero spreadsheets.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="border rounded-xl p-6 hover:shadow-md transition">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple pricing. Cancel anytime.</h2>
          <p className="text-gray-600 text-center mb-12">Less than one hour of a CPA&apos;s time.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div key={tier.name} className={`bg-white rounded-xl p-8 relative ${tier.popular ? 'ring-2 ring-blue-600 scale-105 shadow-lg' : 'border'}`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-blue-600 text-white px-3 py-1 rounded-full">Most Popular</span>
                )}
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{tier.desc}</p>
                <p className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-gray-500">{tier.period}</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className={`block w-full text-center py-3 rounded-lg font-medium transition ${tier.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Tax season waits for no one</h2>
          <p className="text-gray-600 mb-8">Join thousands of freelancers who stopped guessing and started planning. 7-day free trial, no credit card required.</p>
          <Link href="/signup" className="bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 inline-block">
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <p>© 2026 TaxPal. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
