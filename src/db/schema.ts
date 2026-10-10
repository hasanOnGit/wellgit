import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const feedback = sqliteTable('Feedback', {
  slug: text().primaryKey(),
  helpful: integer().default(0).notNull(),
  notHelpful: integer().default(0).notNull(),
});

export const inquiries = sqliteTable('Inquiries', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  service: text('service'),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(),
});
