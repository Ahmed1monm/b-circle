import {date, index, pgTable, uuid, varchar} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";

import {usersToCircles} from "./usersToCircles";

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    name: varchar('name', {length: 100}).notNull(),
    email: varchar('email', {length: 100}).notNull().unique(),
    created_at: date('created_at').default('now()'),
    updated_at: date('updated_at').default('now()'),
}, (table) => {
    return {emailIndex: index('email_index').on(table.email)};
});

export const userRelations = relations(users, ({many}) => ({
    usersToCircles: many(usersToCircles)
}));

export type UserInsert = typeof users.$inferInsert;
export type UserSelect = typeof users.$inferSelect;