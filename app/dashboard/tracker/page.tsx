'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const EXPENSE_CATEGORIES = [
  { value: 'home_office', label: 'Home Office', deduction: 100 },
  { value: 'vehicle', label: 'Vehicle/Mileage', deduction: 100 },
  { value: 'software', label: 'Software & Tools', deduction: 100 },
  { value: 'professional', label: 'Professional Services', deduction: 100 },
  { value: 'insurance', label: 'Insurance', deduction: 100 },
  { value: 'education', label: 'Education & Training', deduction: 100 },
  { value: 'travel', label: 'Travel', deduction: 100 },
  { value: 'meals', label: 'Meals & Entertainment', deduction: 50 },
  { value: 'phone', label: 'Phone & Internet', deduction: 100 },
  { value: 'equipment', label: 'Equipment & Supplies', deduction: 100 },
  { value: 'marketing', label: 'Marketing & Advertising', deduction: 100 },
  { value: 'rent', label: 'Rent & Utilities', deduction: 100 },
  { value: 'other', label: 'Other', deduction: 100 },
];

interface IncomeEntry {
  id: string;
  amount: number;
  source: string;
  category: string;
  date: string;
  notes: string | null;
  invoiceNumber: string | null;
}

interface ExpenseEntry {
  id: string;
  amount: number;
  category: string;
  vendor: string | null;
  date: string;
  notes: string | null;
  deductionPercent: number;
}

export default function TrackerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'income' | 'expenses' | 'summary'>('income');
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([]);
  const [expenseEntries, setExpenseEntries] = useState<ExpenseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Income form
  const [incAmount, setIncAmount] = useState('');
  const [incSource, setIncSource] = useState('');
  const [incDate, setIncDate] = useState(new Date().toISOString().split('T')[0]);
  const [incNotes, setIncNotes] = useState('');
  const [incInvoice, setIncInvoice] = useState('');

  // Expense form
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('software');
  const [expVendor, setExpVendor] = useState('');
  const [expDate, setExpDate] = useState(new Date().toISOString().split('T')[0]);
  const [expNotes, setExpNotes] = useState('');

  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [incRes, expRes] = await Promise.all([
        fetch('/api/income'),
        fetch('/api/expenses'),
      ]);
      if (incRes.ok) {
        const { entries } = await incRes.json();
        setIncomeEntries(entries);
      }
      if (expRes.ok) {
        const { entries } = await expRes.json();
        setExpenseEntries(entries);
      }
    } catch (e) {
      console.error('Failed to fetch data', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) fetchData();
  }, [session, fetchData]);

  if (status === 'loading' || loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) { router.push('/login'); return null; }

  const totalIncome = incomeEntries.reduce((s, e) => s + e.amount, 0) / 100;
  const totalExpenses = expenseEntries.reduce((s, e) => s + (e.amount * (e.deductionPercent / 100)), 0) / 100;
  const netIncome = totalIncome - totalExpenses;

  // Tax calculation
  const seBase = netIncome * 0.9235;
  const seTax = seBase * 0.153;
  const seDeductionHalf = seTax / 2;
  const qbi = netIncome * 0.20;
  const agi = netIncome - seDeductionHalf;
  const taxableIncome = Math.max(0, agi - 15700 - qbi);

  const BRACKETS = [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ];

  let incomeTax = 0;
  for (const b of BRACKETS) {
    if (taxableIncome <= b.min) break;
    incomeTax += (Math.min(taxableIncome, b.max) - b.min) * b.rate;
  }
  const totalTax = incomeTax + seTax;
  const quarterlyPayment = totalTax / 4;

  async function addIncome() {
    if (!incAmount || !incSource) return;
    setSaving(true);
    try {
      const res = await fetch('/api/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: incAmount, source: incSource, date: incDate,
          notes: incNotes || undefined, invoiceNumber: incInvoice || undefined,
        }),
      });
      if (res.ok) {
        setIncAmount(''); setIncSource(''); setIncNotes(''); setIncInvoice('');
        fetchData();
      }
    } finally { setSaving(false); }
  }

  async function addExpense() {
    if (!expAmount || !expCategory) return;
    setSaving(true);
    const cat = EXPENSE_CATEGORIES.find(c => c.value === expCategory);
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: expAmount, category: expCategory, date: expDate,
          vendor: expVendor || undefined, notes: expNotes || undefined,
          deductionPercent: cat?.deduction ?? 100,
        }),
      });
      if (res.ok) {
        setExpAmount(''); setExpVendor(''); setExpNotes('');
        fetchData();
      }
    } finally { setSaving(false); }
  }

  async function deleteEntry(type: 'income' | 'expenses', id: string) {
    await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
    fetchData();
  }

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // Group expenses by category for summary
  const expByCategory: Record<string, number> = {};
  expenseEntries.forEach(e => {
    const key = EXPENSE_CATEGORIES.find(c => c.value === e.category)?.label || e.category;
    expByCategory[key] = (expByCategory[key] || 0) + (e.amount * (e.deductionPercent / 100)) / 100;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-lg flex items-center gap-2">🧾 TaxPal</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Calculator</Link>
          <Link href="/dashboard/tracker" className="text-emerald-700 font-medium">Tracker</Link>
          <Link href="/dashboard/smart-alerts" className="text-gray-600 hover:text-gray-900">Alerts</Link>
          <Link href="/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border">
            <div className="text-xs text-gray-500 mb-1">Total Income</div>
            <div className="text-xl font-bold text-green-700">{fmt(totalIncome)}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <div className="text-xs text-gray-500 mb-1">Deductible Expenses</div>
            <div className="text-xl font-bold text-red-600">{fmt(totalExpenses)}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <div className="text-xs text-gray-500 mb-1">Estimated Tax</div>
            <div className="text-xl font-bold text-amber-700">{fmt(Math.max(0, totalTax))}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <div className="text-xs text-gray-500 mb-1">Quarterly Payment</div>
            <div className="text-xl font-bold text-indigo-700">{fmt(Math.max(0, quarterlyPayment))}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
          {(['income', 'expenses', 'summary'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${activeTab === t ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'income' && (
          <div>
            {/* Add Income Form */}
            <div className="bg-white rounded-xl border p-6 mb-6">
              <h2 className="font-semibold mb-4">Add Income</h2>
              <div className="grid md:grid-cols-4 gap-3">
                <input type="number" placeholder="Amount ($)" value={incAmount} onChange={e => setIncAmount(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" step="0.01" />
                <input type="text" placeholder="Client / Source" value={incSource} onChange={e => setIncSource(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
                <input type="date" value={incDate} onChange={e => setIncDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
                <input type="text" placeholder="Invoice # (optional)" value={incInvoice} onChange={e => setIncInvoice(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="mt-3 flex gap-3">
                <input type="text" placeholder="Notes (optional)" value={incNotes} onChange={e => setIncNotes(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm flex-1" />
                <button onClick={addIncome} disabled={saving || !incAmount || !incSource}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Add Income'}
                </button>
              </div>
            </div>

            {/* Income List */}
            <div className="bg-white rounded-xl border">
              <div className="px-6 py-3 border-b flex items-center justify-between">
                <h3 className="font-semibold">Income Entries ({incomeEntries.length})</h3>
                <span className="text-sm text-green-700 font-medium">Total: {fmt(totalIncome)}</span>
              </div>
              {incomeEntries.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-400">No income entries yet. Add your first one above!</div>
              ) : (
                <div className="divide-y">
                  {incomeEntries.map(e => (
                    <div key={e.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                      <div>
                        <div className="font-medium text-sm">{e.source}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(e.date).toLocaleDateString()} {e.invoiceNumber && `• #${e.invoiceNumber}`} {e.notes && `• ${e.notes}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-green-700">{fmt(e.amount / 100)}</span>
                        <button onClick={() => deleteEntry('income', e.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div>
            <div className="bg-white rounded-xl border p-6 mb-6">
              <h2 className="font-semibold mb-4">Add Expense</h2>
              <div className="grid md:grid-cols-4 gap-3">
                <input type="number" placeholder="Amount ($)" value={expAmount} onChange={e => setExpAmount(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" step="0.01" />
                <select value={expCategory} onChange={e => setExpCategory(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm">
                  {EXPENSE_CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label} {c.deduction < 100 ? `(${c.deduction}%)` : ''}</option>
                  ))}
                </select>
                <input type="text" placeholder="Vendor / Payee" value={expVendor} onChange={e => setExpVendor(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
                <input type="date" value={expDate} onChange={e => setExpDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="mt-3 flex gap-3">
                <input type="text" placeholder="Notes (optional)" value={expNotes} onChange={e => setExpNotes(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm flex-1" />
                <button onClick={addExpense} disabled={saving || !expAmount}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Add Expense'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border">
              <div className="px-6 py-3 border-b flex items-center justify-between">
                <h3 className="font-semibold">Expense Entries ({expenseEntries.length})</h3>
                <span className="text-sm text-red-600 font-medium">Total: {fmt(totalExpenses)}</span>
              </div>
              {expenseEntries.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-400">No expenses yet. Track your business expenses to maximize deductions!</div>
              ) : (
                <div className="divide-y">
                  {expenseEntries.map(e => {
                    const cat = EXPENSE_CATEGORIES.find(c => c.value === e.category);
                    return (
                      <div key={e.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-sm">{cat?.label || e.category} {e.vendor && `— ${e.vendor}`}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(e.date).toLocaleDateString()} {e.deductionPercent < 100 && `• ${e.deductionPercent}% deductible`} {e.notes && `• ${e.notes}`}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-red-600">{fmt(e.amount / 100)}</span>
                          <button onClick={() => deleteEntry('expenses', e.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Export */}
            <div className="flex justify-end">
              <a href="/api/report" download className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                📥 Download Tax Report (CSV)
              </a>
            </div>

            {/* Tax Summary */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold mb-4">2026 Tax Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Gross Income</span><span className="font-medium text-green-700">{fmt(totalIncome)}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Business Expenses</span><span className="font-medium text-red-600">-{fmt(totalExpenses)}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="font-semibold">Net Self-Employment Income</span><span className="font-bold">{fmt(netIncome)}</span></div>
                <div className="flex justify-between py-2 border-b text-sm"><span className="text-gray-500">SE Tax (15.3% on 92.35%)</span><span>{fmt(Math.max(0, seTax))}</span></div>
                <div className="flex justify-between py-2 border-b text-sm"><span className="text-gray-500">½ SE Deduction</span><span>-{fmt(Math.max(0, seDeductionHalf))}</span></div>
                <div className="flex justify-between py-2 border-b text-sm"><span className="text-gray-500">QBI Deduction (20%)</span><span>-{fmt(Math.max(0, qbi))}</span></div>
                <div className="flex justify-between py-2 border-b text-sm"><span className="text-gray-500">Standard Deduction</span><span>-$15,700</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Taxable Income</span><span className="font-medium">{fmt(Math.max(0, taxableIncome))}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Federal Income Tax</span><span className="font-medium">{fmt(Math.max(0, incomeTax))}</span></div>
                <div className="flex justify-between py-2 border-b bg-amber-50 px-3 rounded-lg"><span className="font-bold text-amber-800">Total Estimated Tax</span><span className="font-bold text-amber-800">{fmt(Math.max(0, totalTax))}</span></div>
                <div className="flex justify-between py-2 bg-indigo-50 px-3 rounded-lg"><span className="font-bold text-indigo-800">Quarterly Payment (each)</span><span className="font-bold text-indigo-800">{fmt(Math.max(0, quarterlyPayment))}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-600">Effective Tax Rate</span><span className="font-medium">{netIncome > 0 ? ((totalTax / netIncome) * 100).toFixed(1) : '0.0'}%</span></div>
                <div className="flex justify-between py-2 bg-green-50 px-3 rounded-lg"><span className="font-bold text-green-800">Estimated Take-Home</span><span className="font-bold text-green-800">{fmt(Math.max(0, netIncome - totalTax))}</span></div>
              </div>
            </div>

            {/* Expense Breakdown */}
            {Object.keys(expByCategory).length > 0 && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-semibold mb-4">Expense Breakdown by Category</h2>
                <div className="space-y-2">
                  {Object.entries(expByCategory).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => (
                    <div key={cat} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cat}</span>
                          <span className="font-medium">{fmt(amt)}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-red-400 rounded-full" style={{ width: `${Math.min(100, (amt / totalExpenses) * 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
