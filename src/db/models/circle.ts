import {date, pgTable, uuid, varchar} from 'drizzle-orm/pg-core';

export const circles = pgTable('circles', {
    id: uuid('id').primaryKey(),
    name: varchar('name', {length: 100}).notNull(),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {};
});

export type CircleInsert = typeof circles.$inferInsert;
export type CircleSelect = typeof circles.$inferSelect;