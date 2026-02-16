'use client';

import { useState } from 'react';
import Link from 'next/link';

// 2026 tax brackets (single filer)
const BRACKETS = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11925, max: 48475, rate: 0.12 },
  { min: 48475, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250525, rate: 0.32 },
  { min: 250525, max: 626350, rate: 0.35 },
  { min: 626350, max: Infinity, rate: 0.37 },
];

function calcTaxes(income: number, expenses: number) {
  const netIncome = Math.max(0, income - expenses);
  const seBase = netIncome * 0.9235;
  const seTax = seBase * 0.153;
  const seDeductionHalf = seTax / 2;
  const qbi = netIncome * 0.20;
  const agi = netIncome - seDeductionHalf;
  const taxableIncome = Math.max(0, agi - 15700 - qbi);
  let incomeTax = 0;
  for (const b of BRACKETS) {
    if (taxableIncome <= b.min) break;
    incomeTax += (Math.min(taxableIncome, b.max) - b.min) * b.rate;
  }
  const totalTax = incomeTax + seTax;
  return {
    netIncome, seTax, incomeTax, totalTax,
    quarterly: totalTax / 4,
    effectiveRate: netIncome > 0 ? (totalTax / netIncome) * 100 : 0,
    takeHome: netIncome - totalTax,
  };
}

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const features = [
  { icon: '🧮', title: 'Estimated Tax Calculator', desc: '2026 tax brackets, SE tax, QBI deduction, standard deduction — all calculated instantly. No more guessing.' },
  { icon: '📊', title: 'Income & Expense Tracker', desc: 'Log every payment and deduction as it happens. Server-synced, categorized by IRS Schedule C. Export-ready.' },
  { icon: '📅', title: 'Quarterly Deadline Alerts', desc: 'Never miss April 15, June 16, September 15, or January 15. Get reminders before each due date.' },
  { icon: '💰', title: 'Deduction Maximizer', desc: '12 IRS categories with auto-calculated deduction percentages (meals at 50%, home office, mileage, etc.).' },
  { icon: '📄', title: 'Tax-Ready CSV Reports', desc: 'One click to export your full year: income detail, expenses by category, and complete tax computation.' },
  { icon: '🔄', title: 'W-2 → 1099 Transition Planner', desc: 'Going freelance? Model your take-home, SE tax hit, and savings rate before you quit your job.' },
];

const tiers = [
  { name: 'Starter', price: '$9', period: '/month', desc: 'For new freelancers', features: ['Estimated tax calculator', 'Quarterly deadline reminders', 'Up to 50 entries/month', 'Basic CSV reports', 'Email support'], cta: 'Start Free Trial', href: '/signup?plan=starter', popular: false },
  { name: 'Pro', price: '$29', period: '/month', desc: 'For active freelancers', features: ['Everything in Starter', 'Unlimited income & expense entries', 'W-2 to 1099 transition planner', 'Smart tax alerts', 'Full CSV/PDF export', 'Priority support'], cta: 'Start Free Trial', href: '/signup?plan=pro', popular: true },
  { name: 'Business', price: '$79', period: '/month', desc: 'For agencies & multi-client', features: ['Everything in Pro', 'Multiple business entities', 'CPA collaboration portal', 'API access', 'Quarterly tax filing prep', 'Dedicated support'], cta: 'Start Free Trial', href: '/signup?plan=business', popular: false },
];

const testimonials = [
  { name: 'Sarah K.', role: 'Freelance Designer', text: 'I was underpaying my estimated taxes by $3,200/year without knowing it. TaxPal caught it in 30 seconds.', savings: '$3,200' },
  { name: 'Marcus T.', role: 'Independent Contractor', text: 'Switched from a $400/session CPA to TaxPal for quarterly estimates. Same accuracy, fraction of the cost.', savings: '$1,200/yr' },
  { name: 'Jenny L.', role: 'Content Creator', text: 'The deduction tracker alone paid for itself. I was missing home office and internet deductions every quarter.', savings: '$890' },
];

export default function Home() {
  const [demoIncome, setDemoIncome] = useState('75000');
  const [demoExpenses, setDemoExpenses] = useState('15000');
  const [showResults, setShowResults] = useState(false);

  const income = parseFloat(demoIncome) || 0;
  const expenses = parseFloat(demoExpenses) || 0;
  const taxes = calcTaxes(income, expenses);
  const noDeductionTaxes = calcTaxes(income, 0);
  const deductionSavings = noDeductionTaxes.totalTax - taxes.totalTax;

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧾</span>
            <span className="font-bold text-xl">TaxPal</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#calculator" className="text-sm text-gray-600 hover:text-gray-900 hidden md:block">Calculator</a>
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 hidden md:block">Features</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 hidden md:block">Pricing</a>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log In</Link>
            <Link href="/signup" className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">Start Free →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            ⏰ Q1 2026 estimated taxes due April 15 — are you ready?
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Know exactly what you owe.<br />
            <span className="text-emerald-600">Every quarter. No surprises.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TaxPal calculates your estimated taxes, tracks every deduction, and tells you exactly what to pay each quarter. Built for freelancers and 1099 contractors.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#calculator" className="bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-emerald-700">
              Try the Calculator ↓
            </a>
            <Link href="/signup" className="border-2 border-emerald-600 text-emerald-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-emerald-50">
              Start Free Trial
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-6 border-y bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-600">15.3%</div>
            <div className="text-xs text-gray-500">Self-employment tax rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">42%</div>
            <div className="text-xs text-gray-500">of freelancers underpay</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-600">$2,400</div>
            <div className="text-xs text-gray-500">avg. missed deductions/yr</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-xs text-gray-500">quarterly deadlines/yr</div>
          </div>
        </div>
      </section>

      {/* LIVE CALCULATOR — The Value Demo */}
      <section id="calculator" className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Try it now — see what you owe in seconds</h2>
            <p className="text-gray-600">Enter your estimated 2026 income and business expenses. No signup required.</p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-100 shadow-xl overflow-hidden">
            {/* Input Section */}
            <div className="p-8 bg-gradient-to-r from-emerald-50 to-blue-50">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual 1099 Income</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
                    <input
                      type="number"
                      value={demoIncome}
                      onChange={e => { setDemoIncome(e.target.value); setShowResults(true); }}
                      onFocus={() => setShowResults(true)}
                      className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl text-2xl font-bold focus:border-emerald-500 focus:outline-none"
                      placeholder="75000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Total expected income before expenses</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Expenses</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
                    <input
                      type="number"
                      value={demoExpenses}
                      onChange={e => { setDemoExpenses(e.target.value); setShowResults(true); }}
                      onFocus={() => setShowResults(true)}
                      className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl text-2xl font-bold focus:border-emerald-500 focus:outline-none"
                      placeholder="15000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Home office, software, travel, meals, etc.</p>
                </div>
              </div>
              {!showResults && (
                <button onClick={() => setShowResults(true)} className="mt-6 w-full py-4 bg-emerald-600 text-white rounded-xl text-lg font-bold hover:bg-emerald-700 transition">
                  Calculate My Taxes →
                </button>
              )}
            </div>

            {/* Results Section */}
            {showResults && income > 0 && (
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <div className="text-xs text-red-600 font-medium mb-1">Total Tax Owed</div>
                    <div className="text-2xl font-bold text-red-700">{fmt(taxes.totalTax)}</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <div className="text-xs text-amber-600 font-medium mb-1">Quarterly Payment</div>
                    <div className="text-2xl font-bold text-amber-700">{fmt(taxes.quarterly)}</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-xs text-blue-600 font-medium mb-1">Effective Rate</div>
                    <div className="text-2xl font-bold text-blue-700">{taxes.effectiveRate.toFixed(1)}%</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <div className="text-xs text-emerald-600 font-medium mb-1">Take-Home Pay</div>
                    <div className="text-2xl font-bold text-emerald-700">{fmt(taxes.takeHome)}</div>
                  </div>
                </div>

                {/* Tax Breakdown */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold mb-4 text-sm text-gray-700">TAX BREAKDOWN</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-600">Self-Employment Tax (15.3%)</span><span className="font-medium">{fmt(taxes.seTax)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Federal Income Tax</span><span className="font-medium">{fmt(taxes.incomeTax)}</span></div>
                    <div className="flex justify-between border-t pt-2 mt-2"><span className="font-semibold">Total Federal Tax</span><span className="font-bold">{fmt(taxes.totalTax)}</span></div>
                  </div>
                </div>

                {/* Deduction Savings Callout */}
                {expenses > 0 && (
                  <div className="bg-emerald-600 text-white rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-emerald-100 text-sm font-medium">💰 Your deductions are saving you</div>
                        <div className="text-3xl font-bold mt-1">{fmt(deductionSavings)}/year</div>
                        <div className="text-emerald-200 text-sm mt-1">That&apos;s {fmt(deductionSavings / 4)} less per quarterly payment</div>
                      </div>
                      <div className="text-5xl opacity-20">💰</div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="text-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8">
                  <p className="text-gray-700 mb-2 font-medium">This is just the beginning.</p>
                  <p className="text-gray-500 text-sm mb-4">Sign up to track income & expenses, get deadline alerts, export reports for your CPA, and never overpay again.</p>
                  <Link href="/signup" className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition">
                    Start Tracking Free →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">The freelancer tax trap</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">😰</div>
              <h3 className="font-semibold mb-2">Surprise tax bills</h3>
              <p className="text-gray-600 text-sm">42% of freelancers underpay estimated taxes. The IRS charges 8% penalty on underpayments. That adds up fast.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-semibold mb-2">Missed deductions</h3>
              <p className="text-gray-600 text-sm">The average freelancer misses $2,400/year in deductions. That&apos;s real money you&apos;re handing to the IRS.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-semibold mb-2">Expensive CPAs</h3>
              <p className="text-gray-600 text-sm">CPAs charge $200-500/hr for quarterly estimates. TaxPal does the same calculation for $9/month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything you need. Nothing you don&apos;t.</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Purpose-built for freelancers. No bloated accounting software. No spreadsheet formulas to debug.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border rounded-xl p-6 hover:shadow-md hover:border-emerald-200 transition group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-emerald-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Freelancers love TaxPal</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400">★</span>)}
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                    Saved {t.savings}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get started in 3 minutes</h2>
          <div className="space-y-8">
            {[
              { step: '1', title: 'Enter your income', desc: 'Tell us your expected 1099 income and filing status. Takes 30 seconds.' },
              { step: '2', title: 'Track expenses as they happen', desc: 'Log deductions in one tap. We categorize them by IRS Schedule C automatically.' },
              { step: '3', title: 'Pay the right amount each quarter', desc: 'Get your exact quarterly payment amount + deadline reminders. Export reports for your CPA.' },
            ].map(s => (
              <div key={s.step} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Less than one hour of a CPA&apos;s time</h2>
          <p className="text-gray-600 text-center mb-12">14-day free trial on all plans. Cancel anytime.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div key={tier.name} className={`bg-white rounded-xl p-8 relative ${tier.popular ? 'ring-2 ring-emerald-600 scale-105 shadow-xl' : 'border shadow-sm'}`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-emerald-600 text-white px-3 py-1 rounded-full font-medium">Most Popular</span>
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
                      <span className="text-emerald-500 mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className={`block w-full text-center py-3 rounded-lg font-medium transition ${tier.popular ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Q1 estimated taxes are due April 15</h2>
          <p className="text-emerald-100 mb-8 text-lg">Don&apos;t wait until you owe penalties. Start tracking today — it takes 3 minutes.</p>
          <Link href="/signup" className="bg-white text-emerald-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-emerald-50 inline-block transition">
            Start Your Free Trial →
          </Link>
          <p className="text-emerald-200 text-sm mt-4">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <p>© 2026 TaxPal. A Greenbelt Ventures product.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
