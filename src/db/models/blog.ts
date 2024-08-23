import {date, index, pgTable, uuid, varchar, text} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";

import {blogsToCircles} from "./blogToCircle";

export const blogs = pgTable('articles', {
    id: uuid('id').primaryKey(),
    title: varchar('title', {length: 100}).notNull(),
    content: text('content').notNull(),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {};
});

const blogRelations = relations(blogs, ({many}) => ({
    blogsToCircles: many(blogsToCircles)
}));

export type ArticleInsert = typeof blogs.$inferInsert;
export type ArticleSelect = typeof blogs.$inferSelect;
