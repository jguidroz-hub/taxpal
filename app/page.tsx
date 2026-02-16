'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calculator, Receipt, Bell, FileText, RefreshCw, TrendingDown, Zap, Shield, X, Check } from 'lucide-react';

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
  { icon: Calculator, title: 'Estimated Tax Calculator', desc: '2026 tax brackets, SE tax, QBI deduction, standard deduction — all calculated instantly.', color: 'from-emerald-500 to-cyan-500' },
  { icon: Receipt, title: 'Income & Expense Tracker', desc: 'Log every payment and deduction in real-time. Categorized by IRS Schedule C. Always audit-ready.', color: 'from-cyan-500 to-blue-500' },
  { icon: Bell, title: 'Quarterly Deadline Alerts', desc: 'Never miss April 15, June 16, September 15, or January 15. Reminders before each due date.', color: 'from-purple-500 to-pink-500' },
  { icon: TrendingDown, title: 'Deduction Maximizer', desc: '12 IRS categories with auto-calculated deduction percentages. Meals at 50%, home office, mileage, and more.', color: 'from-amber-500 to-orange-500' },
  { icon: FileText, title: 'Tax-Ready CSV Reports', desc: 'One click to export your full year: income detail, expenses by category, and complete tax computation.', color: 'from-emerald-500 to-teal-500' },
  { icon: RefreshCw, title: 'W-2 → 1099 Transition Planner', desc: 'Going freelance? Model your take-home, SE tax hit, and savings rate before you quit your job.', color: 'from-blue-500 to-purple-500' },
];

const tiers = [
  { name: 'Starter', price: '$9', period: '/mo', desc: 'For new freelancers', features: ['Estimated tax calculator', 'Quarterly deadline reminders', 'Up to 50 entries/month', 'Basic CSV reports', 'Email support'], cta: 'Start Free Trial', href: '/signup?plan=starter', popular: false },
  { name: 'Pro', price: '$29', period: '/mo', desc: 'For active freelancers', features: ['Everything in Starter', 'Unlimited income & expense entries', 'W-2 to 1099 transition planner', 'Smart tax alerts', 'Full CSV/PDF export', 'Priority support'], cta: 'Start Free Trial', href: '/signup?plan=pro', popular: true },
  { name: 'Business', price: '$79', period: '/mo', desc: 'For agencies & multi-client', features: ['Everything in Pro', 'Multiple business entities', 'CPA collaboration portal', 'API access', 'Quarterly tax filing prep', 'Dedicated support'], cta: 'Start Free Trial', href: '/signup?plan=business', popular: false },
];

const comparisonRows = [
  { feature: 'Built for 1099 contractors', taxpal: true, turbotax: false, note: 'TurboTax is built for W-2 filers first' },
  { feature: 'Real-time quarterly estimates', taxpal: true, turbotax: false, note: 'TurboTax only calculates at filing time' },
  { feature: 'Track income & expenses year-round', taxpal: true, turbotax: false, note: 'TurboTax is once-a-year' },
  { feature: 'SE tax + QBI calculated automatically', taxpal: true, turbotax: true, note: '' },
  { feature: 'No 100-question interview', taxpal: true, turbotax: false, note: 'Get answers in 30 seconds, not 30 minutes' },
  { feature: 'Deduction tracking by IRS category', taxpal: true, turbotax: false, note: 'Year-round, not just at tax time' },
  { feature: 'Costs less than $200/year', taxpal: true, turbotax: false, note: 'TurboTax SE edition: $219+' },
  { feature: 'CPA-ready export anytime', taxpal: true, turbotax: false, note: 'Export your data whenever you need it' },
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
    <main className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-background" />
            </div>
            <span className="font-bold text-lg">TaxPal</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <a href="#calculator" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Calculator</a>
            <a href="#features" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#compare" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Compare</a>
            <a href="#pricing" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition">Log In</Link>
            <Link href="/signup" className="text-sm px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-background font-medium hover:from-emerald-600 hover:to-cyan-600 transition">
              Start Free →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Aurora background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl top-[5%] left-[5%] opacity-30" style={{ background: 'rgba(52, 211, 153, 0.25)' }} />
          <div className="absolute w-[700px] h-[700px] rounded-full blur-3xl top-[15%] right-0 opacity-30" style={{ background: 'rgba(34, 211, 238, 0.22)' }} />
          <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl bottom-[10%] left-[20%] opacity-25" style={{ background: 'rgba(168, 85, 247, 0.18)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-sm font-medium backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            Q1 2026 estimated taxes due April 15
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              The tax tool{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                built for freelancers
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              TurboTax is built for W-2 employees. TaxPal is built for you — the 1099 contractor, the freelancer, the side hustler.
              Know exactly what you owe. Every quarter. No 100-question interview. No $200 filing fee.
            </p>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { icon: Shield, text: '2026 tax brackets built in', color: 'text-emerald-400' },
              { icon: Calculator, text: 'SE tax + QBI + deductions', color: 'text-cyan-400' },
              { icon: Bell, text: 'Quarterly deadline alerts', color: 'text-purple-400' },
            ].map((f, i) => (
              <motion.div key={i} className="flex items-center gap-2 text-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                <f.icon className={`w-4 h-4 ${f.color}`} />
                <span className="text-muted-foreground">{f.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a href="#calculator">
              <button className="text-lg px-10 py-4 rounded-xl font-medium bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 text-background hover:from-emerald-600 hover:via-cyan-600 hover:to-emerald-600 shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition">
                Try the Calculator — Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </a>
            <Link href="/signup">
              <button className="text-lg px-8 py-4 rounded-xl font-medium border border-border hover:bg-muted transition">
                Start Free Trial
              </button>
            </Link>
          </motion.div>

          <p className="text-sm text-muted-foreground">No credit card required · 14-day free trial · Cancel anytime</p>
        </div>

        {/* Product Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="relative z-10 max-w-5xl mx-auto mt-16 px-6"
        >
          <div className="rounded-xl border border-border bg-card shadow-2xl shadow-emerald-500/10 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground text-center">taxpal-kappa.vercel.app/dashboard/tracker</div>
              </div>
            </div>
            {/* Fake dashboard content */}
            <div className="p-6 bg-background">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-lg font-bold">Income & Expense Tracker</div>
                  <div className="text-xs text-muted-foreground">Q1 2026 · Tax Year in Progress</div>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-400">+ Add Income</div>
                  <div className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">+ Add Expense</div>
                </div>
              </div>
              {/* Summary cards */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Total Income', value: '$47,250', color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-500/5' },
                  { label: 'Total Expenses', value: '$12,890', color: 'text-red-400', bg: 'from-red-500/10 to-red-500/5' },
                  { label: 'Estimated Tax', value: '$8,432', color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/5' },
                  { label: 'Q1 Payment Due', value: '$2,108', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-500/5' },
                ].map((c, i) => (
                  <div key={i} className={`bg-gradient-to-br ${c.bg} border border-border rounded-lg p-3`}>
                    <div className="text-[10px] text-muted-foreground">{c.label}</div>
                    <div className={`text-lg font-bold ${c.color}`}>{c.value}</div>
                  </div>
                ))}
              </div>
              {/* Fake table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 text-[10px] text-muted-foreground font-medium py-2 px-4 bg-muted">
                  <span>Date</span><span>Description</span><span>Category</span><span className="text-right">Amount</span><span className="text-right">Type</span>
                </div>
                {[
                  { date: 'Feb 14', desc: 'Acme Corp - Website Redesign', cat: 'Freelance Income', amt: '$4,500', type: 'income', color: 'text-emerald-400' },
                  { date: 'Feb 12', desc: 'Adobe Creative Cloud', cat: 'Software & Subscriptions', amt: '-$54.99', type: 'expense', color: 'text-red-400' },
                  { date: 'Feb 10', desc: 'Sarah K. - Logo Design', cat: 'Freelance Income', amt: '$1,200', type: 'income', color: 'text-emerald-400' },
                  { date: 'Feb 8', desc: 'WeWork Day Pass', cat: 'Office & Workspace', amt: '-$29.00', type: 'expense', color: 'text-red-400' },
                  { date: 'Feb 5', desc: 'Client Lunch - Marcus T.', cat: 'Meals (50% deductible)', amt: '-$47.80', type: 'expense', color: 'text-red-400' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-5 text-xs py-2.5 px-4 border-t border-border hover:bg-muted/50">
                    <span className="text-muted-foreground">{row.date}</span>
                    <span>{row.desc}</span>
                    <span className="text-muted-foreground">{row.cat}</span>
                    <span className={`text-right font-medium ${row.color}`}>{row.amt}</span>
                    <span className="text-right">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${row.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{row.type}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Glow effect under mockup */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-emerald-500/10 blur-3xl rounded-full" />
        </motion.div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 border-y border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-10 md:gap-20 text-center">
          {[
            { value: '15.3%', label: 'SE tax most freelancers miss', color: 'text-emerald-400' },
            { value: '42%', label: 'of freelancers underpay quarterly', color: 'text-red-400' },
            { value: '$2,400', label: 'avg. missed deductions/yr', color: 'text-amber-400' },
            { value: '30 sec', label: 'to know what you owe', color: 'text-cyan-400' },
          ].map((s, i) => (
            <div key={i}>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE CALCULATOR */}
      <section id="calculator" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">See what you owe in <span className="text-cyan-400">30 seconds</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Enter your estimated 2026 income and expenses. No signup. No interview. Just answers.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-emerald-500/5">
            {/* Input */}
            <div className="p-8 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-purple-500/5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Annual 1099 Income</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
                    <input
                      type="number"
                      value={demoIncome}
                      onChange={e => { setDemoIncome(e.target.value); setShowResults(true); }}
                      onFocus={() => setShowResults(true)}
                      className="w-full pl-8 pr-4 py-4 bg-muted border border-border rounded-xl text-2xl font-bold text-foreground focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                      placeholder="75000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Business Expenses</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
                    <input
                      type="number"
                      value={demoExpenses}
                      onChange={e => { setDemoExpenses(e.target.value); setShowResults(true); }}
                      onFocus={() => setShowResults(true)}
                      className="w-full pl-8 pr-4 py-4 bg-muted border border-border rounded-xl text-2xl font-bold text-foreground focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                      placeholder="15000"
                    />
                  </div>
                </div>
              </div>
              {!showResults && (
                <button onClick={() => setShowResults(true)} className="mt-6 w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-background rounded-xl text-lg font-bold hover:from-emerald-600 hover:to-cyan-600 transition">
                  Calculate My Taxes →
                </button>
              )}
            </div>

            {/* Results */}
            {showResults && income > 0 && (
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Tax Owed', value: fmt(taxes.totalTax), bg: 'from-red-500/10 to-red-500/5', border: 'border-red-500/20', color: 'text-red-400' },
                    { label: 'Quarterly Payment', value: fmt(taxes.quarterly), bg: 'from-amber-500/10 to-amber-500/5', border: 'border-amber-500/20', color: 'text-amber-400' },
                    { label: 'Effective Rate', value: `${taxes.effectiveRate.toFixed(1)}%`, bg: 'from-cyan-500/10 to-cyan-500/5', border: 'border-cyan-500/20', color: 'text-cyan-400' },
                    { label: 'Take-Home Pay', value: fmt(taxes.takeHome), bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20', color: 'text-emerald-400' },
                  ].map((card, i) => (
                    <div key={i} className={`bg-gradient-to-br ${card.bg} border ${card.border} rounded-xl p-4 text-center`}>
                      <div className="text-xs text-muted-foreground font-medium mb-1">{card.label}</div>
                      <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tax Breakdown */}
                <div className="bg-muted rounded-xl p-6 mb-6">
                  <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">Tax Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Self-Employment Tax (15.3%)</span><span className="font-medium">{fmt(taxes.seTax)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Federal Income Tax</span><span className="font-medium">{fmt(taxes.incomeTax)}</span></div>
                    <div className="flex justify-between border-t border-border pt-3 mt-3"><span className="font-semibold">Total Federal Tax</span><span className="font-bold text-red-400">{fmt(taxes.totalTax)}</span></div>
                  </div>
                </div>

                {/* Deduction Savings */}
                {expenses > 0 && (
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-emerald-100 text-sm font-medium">💰 Your deductions are saving you</div>
                        <div className="text-3xl font-bold text-white mt-1">{fmt(deductionSavings)}/year</div>
                        <div className="text-emerald-100 text-sm mt-1">That&apos;s {fmt(deductionSavings / 4)} less per quarterly payment</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="text-center bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-purple-500/5 border border-border rounded-xl p-8">
                  <p className="text-foreground mb-2 font-medium">This is just the beginning.</p>
                  <p className="text-muted-foreground text-sm mb-4">Sign up to track income & expenses, get deadline alerts, and export reports for your CPA.</p>
                  <Link href="/signup" className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-background px-8 py-3 rounded-lg font-bold hover:from-emerald-600 hover:to-cyan-600 transition">
                    Start Tracking Free →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Not TurboTax — Comparison Section */}
      <section id="compare" className="py-20 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">TurboTax wasn&apos;t built for you</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              TurboTax, H&R Block, and QuickBooks are designed for W-2 employees filing once a year. 
              If you&apos;re a freelancer or 1099 contractor, you need a tool that works <em>all year</em> — not just in April.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-3 text-center text-sm font-medium py-4 px-6 bg-muted">
              <div className="text-left text-muted-foreground">Feature</div>
              <div className="text-emerald-400">TaxPal</div>
              <div className="text-muted-foreground">TurboTax SE</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 items-center py-4 px-6 border-t border-border text-sm hover:bg-muted/50 transition">
                <div>
                  <div className="font-medium">{row.feature}</div>
                  {row.note && <div className="text-xs text-muted-foreground mt-0.5">{row.note}</div>}
                </div>
                <div className="text-center">
                  {row.taxpal ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}
                </div>
                <div className="text-center">
                  {row.turbotax ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-red-400/50 mx-auto" />}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 items-center py-4 px-6 border-t border-border bg-muted/50">
              <div className="font-bold">Annual cost</div>
              <div className="text-center font-bold text-emerald-400">$108/yr</div>
              <div className="text-center font-bold text-red-400">$219+/yr</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything you need. Nothing you don&apos;t.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Purpose-built for freelancers. No bloated accounting software. No spreadsheet formulas to debug.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded-xl p-6 bg-card hover-elevate group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5 text-background" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The freelancer tax trap</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '😰', title: 'Surprise tax bills', desc: '42% of freelancers underpay estimated taxes. The IRS charges 8% penalty on underpayments.', gradient: 'from-red-500/10 to-red-500/5' },
              { emoji: '📝', title: 'Missed deductions', desc: 'The average freelancer misses $2,400/year in deductions. That\u2019s real money you\u2019re handing to the IRS.', gradient: 'from-amber-500/10 to-amber-500/5' },
              { emoji: '💸', title: 'Expensive CPAs', desc: 'CPAs charge $200-500/hr for quarterly estimates. TaxPal does the same calculation for $9/month.', gradient: 'from-purple-500/10 to-purple-500/5' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${card.gradient} border border-border rounded-xl p-6 text-center hover-elevate`}
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get started in <span className="text-cyan-400">3 minutes</span></h2>
          <div className="space-y-8">
            {[
              { step: '1', title: 'Enter your income', desc: 'Tell us your expected 1099 income and filing status. Takes 30 seconds.' },
              { step: '2', title: 'Track expenses as they happen', desc: 'Log deductions in one tap. We categorize them by IRS Schedule C automatically.' },
              { step: '3', title: 'Pay the right amount each quarter', desc: 'Get your exact quarterly payment amount + deadline reminders. Export reports for your CPA.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 text-background rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Less than one hour of a CPA&apos;s time</h2>
            <p className="text-muted-foreground">14-day free trial on all plans. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div key={tier.name} className={`bg-card rounded-xl p-8 relative border ${tier.popular ? 'border-emerald-500 scale-105 shadow-2xl shadow-emerald-500/10' : 'border-border'}`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-background px-3 py-1 rounded-full font-medium">Most Popular</span>
                )}
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.desc}</p>
                <p className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className={`block w-full text-center py-3 rounded-lg font-medium transition ${tier.popular ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-background hover:from-emerald-600 hover:to-cyan-600' : 'bg-muted hover:bg-border'}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" style={{ background: 'rgba(52, 211, 153, 0.3)' }} />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Q1 estimated taxes are due April 15</h2>
          <p className="text-muted-foreground mb-8 text-lg">Don&apos;t wait until you owe penalties. Start tracking today — it takes 3 minutes.</p>
          <Link href="/signup" className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-background px-10 py-4 rounded-xl text-lg font-bold hover:from-emerald-600 hover:to-cyan-600 transition shadow-xl shadow-emerald-500/20">
            Start Your Free Trial →
          </Link>
          <p className="text-sm text-muted-foreground mt-4">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2026 TaxPal. A <a href="https://projectgreenbelt.com" className="text-emerald-400 hover:underline">Greenbelt Ventures</a> product.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
