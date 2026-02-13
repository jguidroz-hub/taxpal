import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default(true),
  weeklyDigest: boolean('weekly_digest').default(true),
  createdAt: timestamp('created_at').notNull().default(now()),
  updatedAt: timestamp('updated_at').notNull().default(now()),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(now()),
});

// Track freelance income sources and earnings
export const incomeStream = pgTable('income_stream', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  sourceName: text('source_name').notNull(),
  totalEarnings: text('total_earnings').notNull(),
  taxRate: text('tax_rate').notNull(),
  frequency: text('frequency').notNull(),
  createdAt: timestamp('created_at').default(now()),
  updatedAt: timestamp('updated_at').default(now()),
});

// Record and categorize potential tax deductions
export const taxDeduction = pgTable('tax_deduction', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  category: text('category').notNull(),
  description: text('description').notNull(),
  amount: text('amount').notNull(),
  receiptUrl: text('receipt_url'),
  taxYear: integer('tax_year').notNull(),
  createdAt: timestamp('created_at').default(now()),
  updatedAt: timestamp('updated_at').default(now()),
});
