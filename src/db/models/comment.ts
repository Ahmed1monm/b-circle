import {date, index, pgTable, uuid, varchar} from 'drizzle-orm/pg-core';

import {blogs} from './blog';
import {users} from './user';

export const comments = pgTable('comments', {
    id: uuid('id').primaryKey(),
    article_id: uuid('blog_id').notNull().references(() => blogs.id),
    user_id: uuid('user_id').notNull().references(() => users.id),
    content: varchar('content', {length: 1000}).notNull(),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {
        articleIndex: index('blogs_index').on(table.article_id),
        userIndex: index('user_index').on(table.user_id),
    };
});

export type CommentInsert = typeof comments.$inferInsert;
export type CommentSelect = typeof comments.$inferSelect;