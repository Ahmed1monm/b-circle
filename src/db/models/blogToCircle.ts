import {date, index, pgTable, uuid} from 'drizzle-orm/pg-core';

import {blogs} from './blog';
import {circles} from './circle';

export const blogsToCircles = pgTable('blogs_to_circles', {
    blog_id: uuid('blog_id').notNull().references(() => blogs.id),
    circle_id: uuid('circle_id').notNull().references(() => circles.id),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {
        articleIndex: index('blogs_to_circle_blog_index').on(table.blog_id),
        tagIndex: index('blogs_to_circle_circle_index').on(table.blog_id),
    };
});

export type BlogsToCirclesInsert = typeof blogsToCircles.$inferInsert;
export type BlogsToCirclesSelect = typeof blogsToCircles.$inferSelect;
