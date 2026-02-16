'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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

const SE_TAX_RATE = 0.153; // 15.3% self-employment tax
const SE_DEDUCTION = 0.9235; // Only 92.35% of net earnings subject to SE tax
const STANDARD_DEDUCTION_2026 = 15700; // Single filer 2026 estimate
const QBI_DEDUCTION_RATE = 0.20; // 20% qualified business income deduction

function calcIncomeTax(taxable: number): number {
  let tax = 0;
  for (const b of BRACKETS) {
    if (taxable <= b.min) break;
    const inBracket = Math.min(taxable, b.max) - b.min;
    tax += inBracket * b.rate;
  }
  return tax;
}

function calcTaxes(income: number, expenses: number) {
  const netIncome = Math.max(0, income - expenses);
  const seBase = netIncome * SE_DEDUCTION;
  const seTax = seBase * SE_TAX_RATE;
  const seDeductionHalf = seTax / 2;
  const qbiDeduction = netIncome * QBI_DEDUCTION_RATE;
  const agi = netIncome - seDeductionHalf;
  const taxableIncome = Math.max(0, agi - STANDARD_DEDUCTION_2026 - qbiDeduction);
  const incomeTax = calcIncomeTax(taxableIncome);
  const totalTax = incomeTax + seTax;
  const quarterlyPayment = totalTax / 4;
  const effectiveRate = netIncome > 0 ? (totalTax / netIncome) * 100 : 0;

  return {
    netIncome,
    seTax: Math.round(seTax),
    incomeTax: Math.round(incomeTax),
    totalTax: Math.round(totalTax),
    quarterlyPayment: Math.round(quarterlyPayment),
    effectiveRate: effectiveRate.toFixed(1),
    seDeductionHalf: Math.round(seDeductionHalf),
    qbiDeduction: Math.round(qbiDeduction),
    taxableIncome: Math.round(taxableIncome),
    takeHome: Math.round(netIncome - totalTax),
  };
}

const DEADLINES = [
  { q: 'Q1', period: 'Jan 1 – Mar 31', due: 'April 15, 2026', dueDate: new Date('2026-04-15') },
  { q: 'Q2', period: 'Apr 1 – May 31', due: 'June 16, 2026', dueDate: new Date('2026-06-16') },
  { q: 'Q3', period: 'Jun 1 – Aug 31', due: 'September 15, 2026', dueDate: new Date('2026-09-15') },
  { q: 'Q4', period: 'Sep 1 – Dec 31', due: 'January 15, 2027', dueDate: new Date('2027-01-15') },
];

const DEDUCTION_CATEGORIES = [
  'Home office', 'Vehicle/mileage', 'Software & tools', 'Professional services',
  'Insurance', 'Education', 'Travel', 'Meals (50%)', 'Phone & internet', 'Equipment', 'Marketing', 'Other'
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<'calculator' | 'deductions' | 'deadlines'>('calculator');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [deductions, setDeductions] = useState<Array<{category: string; amount: string; note: string}>>([]);
  const [newDed, setNewDed] = useState({ category: DEDUCTION_CATEGORIES[0], amount: '', note: '' });

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) { router.push('/login'); return null; }

  const totalDeductions = deductions.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
  const effectiveExpenses = (parseFloat(expenses) || 0) + totalDeductions;
  const taxes = calcTaxes(parseFloat(income) || 0, effectiveExpenses);
  const now = new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-lg flex items-center gap-2">🧾 TaxPal</Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{session.user?.email}</span>
          <Link href="/dashboard/tracker" className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">📊 Tracker</Link>
          <Link href="/dashboard/smart-alerts" className="text-sm text-gray-600 hover:text-gray-900">Alerts</Link>
          <Link href="/settings" className="text-sm text-gray-600 hover:text-gray-900">Settings</Link>
          <Link href="/dashboard/billing" className="text-sm text-gray-600 hover:text-gray-900">Billing</Link>
          <button onClick={() => signOut()} className="text-sm text-red-600 hover:text-red-700">Sign Out</button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Tax Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-lg border p-1 w-fit">
          {([['calculator', '🧮 Tax Calculator'], ['deductions', '💰 Deductions'], ['deadlines', '📅 Deadlines']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === key ? 'bg-black text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'calculator' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Your Numbers</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Freelance Income (1099)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                    <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="85,000"
                      className="w-full border rounded-lg pl-7 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Expenses (annual)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                    <input type="number" value={expenses} onChange={e => setExpenses(e.target.value)} placeholder="12,000"
                      className="w-full border rounded-lg pl-7 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  {totalDeductions > 0 && (
                    <p className="text-xs text-green-600 mt-1">+ ${totalDeductions.toLocaleString()} tracked deductions</p>
                  )}
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                  <strong>How it works:</strong> We calculate self-employment tax (15.3%), income tax using 2026 brackets, 
                  the 50% SE tax deduction, QBI deduction (20%), and standard deduction (${STANDARD_DEDUCTION_2026.toLocaleString()}).
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="bg-black text-white rounded-xl p-6">
                <p className="text-sm text-gray-300 mb-1">Estimated Quarterly Payment</p>
                <p className="text-4xl font-bold">${taxes.quarterlyPayment.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-2">Due every quarter to avoid penalties</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border rounded-xl p-4">
                  <p className="text-xs text-gray-500">Total Annual Tax</p>
                  <p className="text-xl font-bold">${taxes.totalTax.toLocaleString()}</p>
                </div>
                <div className="bg-white border rounded-xl p-4">
                  <p className="text-xs text-gray-500">Effective Tax Rate</p>
                  <p className="text-xl font-bold">{taxes.effectiveRate}%</p>
                </div>
                <div className="bg-white border rounded-xl p-4">
                  <p className="text-xs text-gray-500">Self-Employment Tax</p>
                  <p className="text-xl font-bold">${taxes.seTax.toLocaleString()}</p>
                </div>
                <div className="bg-white border rounded-xl p-4">
                  <p className="text-xs text-gray-500">Income Tax</p>
                  <p className="text-xl font-bold">${taxes.incomeTax.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-xs text-green-600">Estimated Take-Home Pay</p>
                <p className="text-2xl font-bold text-green-700">${taxes.takeHome.toLocaleString()}/year</p>
                <p className="text-xs text-green-600">${Math.round(taxes.takeHome / 12).toLocaleString()}/month</p>
              </div>
              <div className="bg-white border rounded-xl p-4 text-xs text-gray-500 space-y-1">
                <p>📋 <strong>Breakdown:</strong></p>
                <p>Net income: ${taxes.netIncome.toLocaleString()} → SE deduction: -${taxes.seDeductionHalf.toLocaleString()} → QBI deduction: -${taxes.qbiDeduction.toLocaleString()} → Standard deduction: -${STANDARD_DEDUCTION_2026.toLocaleString()}</p>
                <p>Taxable income: ${taxes.taxableIncome.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'deductions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Add Deduction</h2>
              <div className="grid md:grid-cols-4 gap-3">
                <select value={newDed.category} onChange={e => setNewDed({...newDed, category: e.target.value})} className="border rounded-lg px-3 py-2 text-sm">
                  {DEDUCTION_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400 text-sm">$</span>
                  <input type="number" value={newDed.amount} onChange={e => setNewDed({...newDed, amount: e.target.value})} placeholder="Amount" className="w-full border rounded-lg pl-7 pr-3 py-2 text-sm" />
                </div>
                <input type="text" value={newDed.note} onChange={e => setNewDed({...newDed, note: e.target.value})} placeholder="Note (optional)" className="border rounded-lg px-3 py-2 text-sm" />
                <button onClick={() => {
                  if (newDed.amount) {
                    setDeductions([...deductions, {...newDed}]);
                    setNewDed({category: DEDUCTION_CATEGORIES[0], amount: '', note: ''});
                  }
                }} className="bg-black text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-800">Add</button>
              </div>
            </div>

            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Your Deductions</h2>
                <p className="text-sm font-medium">Total: <span className="text-green-600">${totalDeductions.toLocaleString()}</span></p>
              </div>
              {deductions.length === 0 ? (
                <p className="text-gray-500 text-sm py-8 text-center">No deductions tracked yet. Add your first one above.</p>
              ) : (
                <div className="space-y-2">
                  {deductions.map((d, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{d.category}</span>
                        <span className="text-sm">{d.note || '—'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">${parseFloat(d.amount).toLocaleString()}</span>
                        <button onClick={() => setDeductions(deductions.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 text-sm">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>💡 Common freelancer deductions you might be missing:</strong>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Home office: $5/sq ft (simplified method) or actual expenses</li>
                <li>• Health insurance premiums (100% deductible for self-employed)</li>
                <li>• Retirement contributions (SEP-IRA up to 25% of net earnings)</li>
                <li>• Business mileage: 70¢/mile for 2026</li>
                <li>• Professional development, courses, certifications</li>
              </ul>
            </div>
          </div>
        )}

        {tab === 'deadlines' && (
          <div className="space-y-4">
            {DEADLINES.map((d) => {
              const isPast = now > d.dueDate;
              const isNext = !isPast && DEADLINES.filter(dd => now <= dd.dueDate)[0]?.q === d.q;
              const daysUntil = Math.ceil((d.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={d.q} className={`bg-white rounded-xl border p-6 ${isNext ? 'ring-2 ring-blue-500' : ''} ${isPast ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-bold ${isNext ? 'text-blue-600' : ''}`}>{d.q}</span>
                        {isNext && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Next Due</span>}
                        {isPast && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Passed</span>}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Income earned: {d.period}</p>
                      <p className="text-sm mt-1">Due: <strong>{d.due}</strong></p>
                    </div>
                    <div className="text-right">
                      {!isPast && (
                        <>
                          <p className="text-2xl font-bold">${taxes.quarterlyPayment.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{daysUntil} days away</p>
                        </>
                      )}
                      {isPast && <p className="text-sm text-gray-400">Completed</p>}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <strong>📌 How to pay:</strong> Use <a href="https://www.irs.gov/payments" target="_blank" rel="noopener noreferrer" className="underline">IRS Direct Pay</a> or mail Form 1040-ES. 
              Pay the amount shown above each quarter to avoid underpayment penalties.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
