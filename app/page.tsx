'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calculator, Receipt, Bell, FileText, RefreshCw, TrendingDown, Zap, Shield, X, Check } from 'lucide-react';

const BRACKETS = [
  { min: 0, max: 11925, rate: 0.10 }, { min: 11925, max: 48475, rate: 0.12 },
  { min: 48475, max: 103350, rate: 0.22 }, { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250525, rate: 0.32 }, { min: 250525, max: 626350, rate: 0.35 },
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

export default function Home() {
  const [demoIncome, setDemoIncome] = useState('75000');
  const [demoExpenses, setDemoExpenses] = useState('15000');
  const income = parseFloat(demoIncome) || 0;
  const expenses = parseFloat(demoExpenses) || 0;
  const taxes = calcTaxes(income, expenses);
  const noDeductionTaxes = calcTaxes(income, 0);
  const deductionSavings = noDeductionTaxes.totalTax - taxes.totalTax;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-background" />
            </div>
            <span className="font-bold text-lg">TaxPal</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#calculator" className="text-sm text-muted-foreground hover:text-foreground transition">Calculator</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Log In</Link>
            <Link href="/signup" className="text-sm px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-background font-medium hover:from-emerald-600 hover:to-cyan-600 transition">
              Start Free →
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO — Split layout ═══════════════ */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden">
        {/* Aurora */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[800px] h-[800px] rounded-full blur-[120px] -top-[200px] -left-[200px] opacity-30 bg-emerald-500/30" />
          <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] top-[10%] right-[-100px] opacity-20 bg-cyan-500/25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-medium text-amber-400 mb-6">
              <Zap className="w-3 h-3" /> Q1 2026 taxes due April 15
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              The tax tool<br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                built for freelancers
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              TurboTax is for W-2 employees. TaxPal is for you — the 1099 contractor who needs to know what to pay <em>every quarter</em>, not just in April.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-6">
              <a href="#calculator">
                <button className="px-8 py-3.5 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-background hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition text-base">
                  Try the Calculator <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <Link href="/signup">
                <button className="px-8 py-3.5 rounded-xl font-medium border border-border hover:bg-card transition text-base">
                  Start Free Trial
                </button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> No credit card</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> 14-day trial</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Cancel anytime</span>
            </motion.div>
          </div>

          {/* Right: Product mockup */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-emerald-500/5 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" /></div>
                <div className="flex-1"><div className="bg-background rounded px-3 py-0.5 text-[10px] text-muted-foreground text-center mx-8">taxpal.app/dashboard</div></div>
              </div>
              <div className="p-5 bg-background space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Q1 2026 Summary</div>
                  <div className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">⏰ Due Apr 15</div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { l: 'Net Income', v: '$60,000', c: 'text-foreground' },
                    { l: 'Total Tax', v: '$14,289', c: 'text-red-400' },
                    { l: 'Quarterly', v: '$3,572', c: 'text-amber-400' },
                    { l: 'Take-Home', v: '$45,711', c: 'text-emerald-400' },
                  ].map((c, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg px-3 py-2.5">
                      <div className="text-[10px] text-muted-foreground">{c.l}</div>
                      <div className={`text-base font-bold ${c.c}`}>{c.v}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">SE Tax (15.3%)</span><span>$8,554</span></div>
                  <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">Federal Income</span><span>$5,735</span></div>
                  <div className="h-px bg-border my-1" />
                  <div className="flex justify-between text-[11px] font-medium"><span>Deduction Savings</span><span className="text-emerald-400">−$3,612/yr</span></div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
                  <div className="text-[10px] text-emerald-400 mb-0.5">💰 Your deductions save you</div>
                  <div className="text-lg font-bold text-emerald-400">$3,612/year</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Stats ribbon ═══════════════ */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: '15.3%', l: 'SE tax most miss', c: 'text-emerald-400' },
            { v: '42%', l: 'of freelancers underpay', c: 'text-red-400' },
            { v: '$2,400', l: 'avg missed deductions/yr', c: 'text-amber-400' },
            { v: '30 sec', l: 'to know what you owe', c: 'text-cyan-400' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl font-bold ${s.c}`}>{s.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CALCULATOR — Full width, visual ═══════════════ */}
      <section id="calculator" className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12 items-start">
          {/* Left: description + inputs (2 cols) */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-3">See what you owe in <span className="text-cyan-400">30 seconds</span></h2>
            <p className="text-muted-foreground mb-8">Enter your income and expenses. No signup. No 100-question interview. Just answers.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Annual 1099 Income</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input type="number" value={demoIncome} onChange={e => setDemoIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3.5 bg-card border border-border rounded-xl text-xl font-bold focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Business Expenses</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input type="number" value={demoExpenses} onChange={e => setDemoExpenses(e.target.value)}
                    className="w-full pl-8 pr-4 py-3.5 bg-card border border-border rounded-xl text-xl font-bold focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-xs text-emerald-400 mb-1">💰 Deduction savings</div>
              <div className="text-2xl font-bold text-emerald-400">{expenses > 0 ? fmt(deductionSavings) : '$0'}/yr</div>
              <div className="text-xs text-muted-foreground mt-1">That&apos;s {expenses > 0 ? fmt(deductionSavings / 4) : '$0'} less per quarter</div>
            </div>
          </div>

          {/* Right: results (3 cols) */}
          <div className="md:col-span-3">
            {income > 0 ? (
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="text-sm text-muted-foreground mb-6">Your 2026 Federal Tax Estimate</div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { l: 'Total Tax Owed', v: fmt(taxes.totalTax), c: 'text-red-400', bg: 'bg-red-500/5 border-red-500/20' },
                    { l: 'Quarterly Payment', v: fmt(taxes.quarterly), c: 'text-amber-400', bg: 'bg-amber-500/5 border-amber-500/20' },
                    { l: 'Effective Rate', v: `${taxes.effectiveRate.toFixed(1)}%`, c: 'text-cyan-400', bg: 'bg-cyan-500/5 border-cyan-500/20' },
                    { l: 'Take-Home Pay', v: fmt(taxes.takeHome), c: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20' },
                  ].map((c, i) => (
                    <div key={i} className={`${c.bg} border rounded-xl p-5`}>
                      <div className="text-xs text-muted-foreground mb-1">{c.l}</div>
                      <div className={`text-3xl font-bold ${c.c}`}>{c.v}</div>
                    </div>
                  ))}
                </div>

                {/* Visual breakdown bar */}
                <div className="mb-6">
                  <div className="text-xs text-muted-foreground mb-2">Where your money goes</div>
                  <div className="h-8 rounded-lg overflow-hidden flex">
                    <div className="bg-emerald-500 flex items-center justify-center text-[10px] font-medium text-white" style={{ width: `${(taxes.takeHome / income) * 100}%` }}>Take-home</div>
                    <div className="bg-amber-500 flex items-center justify-center text-[10px] font-medium text-white" style={{ width: `${(taxes.seTax / income) * 100}%` }}>SE Tax</div>
                    <div className="bg-red-500 flex items-center justify-center text-[10px] font-medium text-white" style={{ width: `${(taxes.incomeTax / income) * 100}%` }}>Income Tax</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Self-Employment Tax (15.3%)</span><span className="font-medium">{fmt(taxes.seTax)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Federal Income Tax</span><span className="font-medium">{fmt(taxes.incomeTax)}</span></div>
                  <div className="flex justify-between pt-2 border-t border-border"><span className="font-semibold">Total Federal Tax</span><span className="font-bold text-red-400">{fmt(taxes.totalTax)}</span></div>
                </div>

                <div className="mt-6 text-center">
                  <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-background font-medium hover:from-emerald-600 hover:to-cyan-600 transition">
                    Start Tracking for Real <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-xs text-muted-foreground mt-2">Free 14-day trial</p>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-16 text-center">
                <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Enter your income to see your tax estimate</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY NOT TURBOTAX — Alternating split ═══════════════ */}
      <section className="px-6 py-24 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">TurboTax wasn&apos;t built for you</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">It&apos;s built for W-2 employees filing once a year. You need something that works all year.</p>
          </div>

          {/* Alternating rows */}
          <div className="space-y-20">
            {[
              {
                title: 'Real-time quarterly estimates',
                desc: 'TurboTax only calculates at filing time. TaxPal updates your tax estimate every time you log income or expenses — so you always know what to pay each quarter.',
                icon: Calculator, color: 'from-emerald-500 to-cyan-500',
                visual: (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="text-xs text-muted-foreground mb-3">Quarterly Payments</div>
                    {['Q1 · Apr 15', 'Q2 · Jun 16', 'Q3 · Sep 15', 'Q4 · Jan 15'].map((q, i) => (
                      <div key={i} className={`flex items-center justify-between py-3 ${i > 0 ? 'border-t border-border' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-500/10 text-amber-400 ring-2 ring-amber-500/30' : 'bg-muted text-muted-foreground'}`}>
                            Q{i + 1}
                          </div>
                          <span className="text-sm">{q}</span>
                        </div>
                        <span className="text-sm font-bold">{fmt(taxes.quarterly)}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: 'Track deductions year-round',
                desc: 'Stop scrambling for receipts in April. Log expenses as they happen — categorized by IRS Schedule C. Meals at 50%, home office, mileage, software, and 9 more categories.',
                icon: Receipt, color: 'from-amber-500 to-orange-500',
                visual: (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="text-xs text-muted-foreground mb-3">Expense Categories (IRS Schedule C)</div>
                    {[
                      { cat: 'Home Office', amt: '$4,200', pct: 100, w: 85 },
                      { cat: 'Software & Tools', amt: '$2,880', pct: 100, w: 60 },
                      { cat: 'Meals & Entertainment', amt: '$1,920', pct: 50, w: 40 },
                      { cat: 'Vehicle/Mileage', amt: '$3,100', pct: 100, w: 65 },
                      { cat: 'Professional Development', amt: '$890', pct: 100, w: 20 },
                    ].map((c, i) => (
                      <div key={i} className={`${i > 0 ? 'mt-3' : ''}`}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{c.cat} <span className="text-muted-foreground">({c.pct}%)</span></span>
                          <span className="font-medium">{c.amt}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full"><div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${c.w}%` }} /></div>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: 'Export-ready for your CPA',
                desc: 'One click to download a complete tax report: income by source, expenses by IRS category, quarterly breakdown, and total tax computation. Your CPA will love you.',
                icon: FileText, color: 'from-blue-500 to-indigo-500',
                visual: (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="text-xs text-muted-foreground mb-3">Tax Report Preview</div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="text-muted-foreground">═══ 2026 TAX SUMMARY ═══</div>
                      <div className="flex justify-between"><span>Gross Income</span><span>$75,000</span></div>
                      <div className="flex justify-between"><span>Total Expenses</span><span className="text-red-400">-$15,000</span></div>
                      <div className="flex justify-between font-bold"><span>Net Income</span><span>$60,000</span></div>
                      <div className="h-px bg-border my-1" />
                      <div className="flex justify-between"><span>SE Tax</span><span>$8,478</span></div>
                      <div className="flex justify-between"><span>Income Tax</span><span>$4,247</span></div>
                      <div className="flex justify-between font-bold text-red-400"><span>Total Tax</span><span>$12,725</span></div>
                      <div className="flex justify-between font-bold text-emerald-400"><span>Take-Home</span><span>$47,275</span></div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="flex-1 py-2 text-center text-[10px] font-medium bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">⬇ Download CSV</div>
                      <div className="flex-1 py-2 text-center text-[10px] font-medium bg-muted border border-border rounded-lg text-muted-foreground">📧 Email to CPA</div>
                    </div>
                  </div>
                ),
              },
            ].map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}>
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{section.desc}</p>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>{section.visual}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPARISON TABLE ═══════════════ */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why freelancers switch from TurboTax</h2>
              <p className="text-muted-foreground mb-6">TurboTax Self-Employed costs $219+ and only works at filing time. TaxPal is $9/mo and works all year.</p>
              <div className="space-y-3">
                {[
                  'Real-time quarterly estimates',
                  'Year-round expense tracking',
                  'IRS Schedule C categorization',
                  'No 100-question interview',
                  'CPA-ready exports anytime',
                  '$108/yr vs $219+/yr',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 text-xs font-medium py-3 px-5 bg-muted">
                <span className="text-muted-foreground">Feature</span>
                <span className="text-center text-emerald-400">TaxPal</span>
                <span className="text-center text-muted-foreground">TurboTax</span>
              </div>
              {[
                ['Quarterly estimates', true, false],
                ['Year-round tracking', true, false],
                ['SE tax + QBI calc', true, true],
                ['Deduction categorization', true, false],
                ['No interview required', true, false],
                ['Export anytime', true, false],
              ].map(([feat, us, them], i) => (
                <div key={i} className="grid grid-cols-3 items-center py-3 px-5 border-t border-border text-xs">
                  <span>{feat as string}</span>
                  <div className="text-center">{us ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</div>
                  <div className="text-center">{them ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400/40 mx-auto" />}</div>
                </div>
              ))}
              <div className="grid grid-cols-3 items-center py-3 px-5 border-t border-border bg-muted/50 text-xs font-bold">
                <span>Annual cost</span>
                <span className="text-center text-emerald-400">$108</span>
                <span className="text-center text-red-400">$219+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES — Bento grid ═══════════════ */}
      <section id="features" className="px-6 py-24 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Everything you need. Nothing you don&apos;t.</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Purpose-built for freelancers. No bloated accounting software.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Calculator, title: 'Tax Calculator', desc: '2026 brackets, SE tax, QBI, standard deduction — instant.', color: 'from-emerald-500 to-cyan-500', span: '' },
              { icon: Receipt, title: 'Income & Expense Tracker', desc: 'Log every payment and deduction. Categorized by IRS Schedule C.', color: 'from-cyan-500 to-blue-500', span: 'md:col-span-2' },
              { icon: Bell, title: 'Quarterly Alerts', desc: 'Never miss April 15, June 16, September 15, or January 15.', color: 'from-purple-500 to-pink-500', span: 'md:col-span-2' },
              { icon: TrendingDown, title: 'Deduction Maximizer', desc: '12 IRS categories with auto-calculated percentages.', color: 'from-amber-500 to-orange-500', span: '' },
              { icon: FileText, title: 'CSV Reports', desc: 'One-click export: income, expenses, tax computation.', color: 'from-emerald-500 to-teal-500', span: '' },
              { icon: RefreshCw, title: 'W-2 → 1099 Planner', desc: 'Model your freelance take-home before you quit.', color: 'from-blue-500 to-purple-500', span: 'md:col-span-2' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`border border-border rounded-xl p-6 bg-card hover:border-emerald-500/30 transition ${f.span}`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center mb-3`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Less than one hour of a CPA&apos;s time</h2>
          <p className="text-center text-muted-foreground mb-12">14-day free trial. Cancel anytime.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$9', desc: 'New freelancers', features: ['Tax calculator', 'Quarterly alerts', '50 entries/mo', 'CSV reports'], popular: false },
              { name: 'Pro', price: '$29', desc: 'Active freelancers', features: ['Everything in Starter', 'Unlimited entries', 'W-2→1099 planner', 'Smart alerts', 'Full export', 'Priority support'], popular: true },
              { name: 'Business', price: '$79', desc: 'Agencies', features: ['Everything in Pro', 'Multiple entities', 'CPA portal', 'API access', 'Filing prep'], popular: false },
            ].map((tier) => (
              <div key={tier.name} className={`bg-card rounded-2xl p-7 relative border ${tier.popular ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105' : 'border-border'}`}>
                {tier.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-background px-3 py-1 rounded-full font-medium">Most Popular</span>}
                <h3 className="font-bold text-lg">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.desc}</p>
                <p className="mb-6"><span className="text-4xl font-bold">{tier.price}</span><span className="text-muted-foreground">/mo</span></p>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className="text-sm text-muted-foreground flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link href="/signup" className={`block w-full text-center py-3 rounded-xl font-medium transition ${tier.popular ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-background hover:from-emerald-600 hover:to-cyan-600' : 'bg-muted hover:bg-border'}`}>
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 bg-emerald-500/30" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Q1 estimated taxes are due April 15</h2>
          <p className="text-muted-foreground mb-8 text-lg">Don&apos;t wait until you owe penalties.</p>
          <Link href="/signup" className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-background px-10 py-4 rounded-xl text-lg font-bold hover:from-emerald-600 hover:to-cyan-600 transition shadow-xl shadow-emerald-500/20">
            Start Your Free Trial →
          </Link>
          <p className="text-sm text-muted-foreground mt-4">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2026 TaxPal. A <a href="https://projectgreenbelt.com" className="text-emerald-400 hover:underline">Greenbelt Ventures</a> product.</p>
          <div className="flex gap-4"><Link href="/privacy" className="hover:text-foreground">Privacy</Link><Link href="/terms" className="hover:text-foreground">Terms</Link></div>
        </div>
      </footer>
    </main>
  );
}
