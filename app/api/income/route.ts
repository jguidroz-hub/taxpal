import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { incomeEntries } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const entries = await db.select().from(incomeEntries)
    .where(eq(incomeEntries.userId, session.user.id))
    .orderBy(desc(incomeEntries.date))
    .limit(200);

  return NextResponse.json({ entries });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { amount, source, category, date, notes, invoiceNumber } = body;

  if (!amount || !source || !date) {
    return NextResponse.json({ error: 'amount, source, and date are required' }, { status: 400 });
  }

  const entry = await db.insert(incomeEntries).values({
    userId: session.user.id,
    amount: Math.round(parseFloat(amount) * 100),
    source,
    category: category || 'freelance',
    date: new Date(date),
    notes: notes || null,
    invoiceNumber: invoiceNumber || null,
  }).returning();

  return NextResponse.json({ entry: entry[0] }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  await db.delete(incomeEntries)
    .where(eq(incomeEntries.id, id));

  return NextResponse.json({ ok: true });
}
