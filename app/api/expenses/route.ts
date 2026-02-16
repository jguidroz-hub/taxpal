import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { expenseEntries } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const entries = await db.select().from(expenseEntries)
    .where(eq(expenseEntries.userId, session.user.id))
    .orderBy(desc(expenseEntries.date))
    .limit(200);

  return NextResponse.json({ entries });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { amount, category, vendor, date, notes, deductionPercent } = body;

  if (!amount || !category || !date) {
    return NextResponse.json({ error: 'amount, category, and date are required' }, { status: 400 });
  }

  const entry = await db.insert(expenseEntries).values({
    userId: session.user.id,
    amount: Math.round(parseFloat(amount) * 100),
    category,
    vendor: vendor || null,
    date: new Date(date),
    notes: notes || null,
    deductionPercent: deductionPercent ?? 100,
  }).returning();

  return NextResponse.json({ entry: entry[0] }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  await db.delete(expenseEntries)
    .where(eq(expenseEntries.id, id));

  return NextResponse.json({ ok: true });
}
