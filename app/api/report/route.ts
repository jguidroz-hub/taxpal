import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { incomeEntries, expenseEntries } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

// Generate a CSV tax report (PDF would require a dependency - CSV is more universally useful)
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [income, expenses] = await Promise.all([
    db.select().from(incomeEntries).where(eq(incomeEntries.userId, session.user.id)),
    db.select().from(expenseEntries).where(eq(expenseEntries.userId, session.user.id)),
  ]);

  const totalIncome = income.reduce((s, e) => s + e.amount, 0) / 100;
  const totalExpenses = expenses.reduce((s, e) => s + (e.amount * ((e.deductionPercent ?? 100) / 100)), 0) / 100;
  const netIncome = totalIncome - totalExpenses;
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

  // Build CSV
  const lines: string[] = [];
  const fmt = (n: number) => `$${n.toFixed(2)}`;
  
  lines.push('TaxPal - 2026 Tax Report');
  lines.push(`Generated: ${new Date().toLocaleDateString()}`);
  lines.push(`User: ${session.user.email}`);
  lines.push('');
  lines.push('=== TAX SUMMARY ===');
  lines.push(`Gross Income,${fmt(totalIncome)}`);
  lines.push(`Business Expenses (deductible),${fmt(totalExpenses)}`);
  lines.push(`Net Self-Employment Income,${fmt(netIncome)}`);
  lines.push(`Self-Employment Tax (15.3%),${fmt(Math.max(0, seTax))}`);
  lines.push(`½ SE Deduction,${fmt(Math.max(0, seDeductionHalf))}`);
  lines.push(`QBI Deduction (20%),${fmt(Math.max(0, qbi))}`);
  lines.push(`Standard Deduction,$15700.00`);
  lines.push(`Taxable Income,${fmt(Math.max(0, taxableIncome))}`);
  lines.push(`Federal Income Tax,${fmt(Math.max(0, incomeTax))}`);
  lines.push(`Total Estimated Tax,${fmt(Math.max(0, totalTax))}`);
  lines.push(`Quarterly Payment (each),${fmt(Math.max(0, quarterlyPayment))}`);
  lines.push(`Effective Rate,${netIncome > 0 ? ((totalTax / netIncome) * 100).toFixed(1) : '0.0'}%`);
  lines.push(`Estimated Take-Home,${fmt(Math.max(0, netIncome - totalTax))}`);
  lines.push('');

  // Income detail
  lines.push('=== INCOME ENTRIES ===');
  lines.push('Date,Source,Category,Invoice #,Amount,Notes');
  for (const e of income) {
    lines.push(`${new Date(e.date).toLocaleDateString()},${e.source},${e.category},${e.invoiceNumber || ''},${fmt(e.amount / 100)},${e.notes || ''}`);
  }
  lines.push('');

  // Expense detail
  lines.push('=== EXPENSE ENTRIES ===');
  lines.push('Date,Category,Vendor,Amount,Deduction %,Deductible Amount,Notes');
  for (const e of expenses) {
    const deductible = (e.amount * ((e.deductionPercent ?? 100) / 100)) / 100;
    lines.push(`${new Date(e.date).toLocaleDateString()},${e.category},${e.vendor || ''},${fmt(e.amount / 100)},${e.deductionPercent ?? 100}%,${fmt(deductible)},${e.notes || ''}`);
  }

  // Expense by category summary
  lines.push('');
  lines.push('=== EXPENSES BY CATEGORY ===');
  lines.push('Category,Total Deductible');
  const byCat: Record<string, number> = {};
  for (const e of expenses) {
    byCat[e.category] = (byCat[e.category] || 0) + (e.amount * ((e.deductionPercent ?? 100) / 100)) / 100;
  }
  for (const [cat, amt] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
    lines.push(`${cat},${fmt(amt)}`);
  }

  const csv = lines.join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="taxpal-2026-report-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
