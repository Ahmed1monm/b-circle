import {date, index, pgTable, uuid} from 'drizzle-orm/pg-core';

import {blogs} from './blog';
import {tags} from './tag';

export const blogsToTags = pgTable('articles_to_tags', {
    blog_id: uuid('blog_id').notNull().references(() => blogs.id),
    tag_id: uuid('tag_id').notNull().references(() => tags.id),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {
        articleIndex: index('blog_index').on(table.blog_id),
        tagIndex: index('tag_index').on(table.tag_id),
    };
});

export type BlogsToTagsInsert = typeof blogsToTags.$inferInsert;
export type BlogsToTagsSelect = typeof blogsToTags.$inferSelect;
