import {date, pgTable, uuid, varchar, text} from 'drizzle-orm/pg-core';

export const profile = pgTable('profile', {
    id: uuid('id').primaryKey(),
    image: varchar('image').notNull(),
    bio: text('bio').notNull(),
    name: varchar('name').notNull(),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {};
});


export type ProfileInsert = typeof profile.$inferInsert;
export type ProfileSelect = typeof profile.$inferSelect;
