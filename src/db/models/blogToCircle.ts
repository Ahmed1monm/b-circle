import {date, index, pgTable, uuid} from 'drizzle-orm/pg-core';

import {blogs} from './blog';
import {circles} from './circle';

export const blogsToCircles = pgTable('articles_to_tags', {
    blog_id: uuid('blog_id').notNull().references(() => blogs.id),
    circle_id: uuid('tag_id').notNull().references(() => circles.id),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {
        articleIndex: index('blog_index').on(table.blog_id),
        tagIndex: index('circle_index').on(table.blog_id),
    };
});

export type BlogsToTagsInsert = typeof blogsToCircles.$inferInsert;
export type BlogsToTagsSelect = typeof blogsToCircles.$inferSelect;
