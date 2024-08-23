import {date, pgTable, uuid, varchar} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";

import {usersToCircles} from "./usersToCircles";
import {blogsToCircles} from "./blogToCircle";

export const circles = pgTable('circles', {
    id: uuid('id').primaryKey(),
    name: varchar('name', {length: 100}).notNull(),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {};
});

export const circleRelations = relations(circles, ({many}) => ({
    circlesToUsers: many(usersToCircles),
    blogsToCircles: many(blogsToCircles)
}));

export type CircleInsert = typeof circles.$inferInsert;
export type CircleSelect = typeof circles.$inferSelect;
