import {date, index, pgTable, uuid} from 'drizzle-orm/pg-core';

import {circles} from './circle';
import {tags} from './tag';

export const tagsToCircles = pgTable('tags_to_circles', {
    tag_id: uuid('tag_id').notNull().references(() => tags.id),
    circle_id: uuid('circle_id').notNull().references(() => circles.id),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {
        tagIndex: index('tags_to_circles_tag_index').on(table.tag_id),
        circleIndex: index('tags_to_circles_circle_index').on(table.circle_id),
    };
});

export type TagsToCirclesInsert = typeof tagsToCircles.$inferInsert;
export type TagsToCirclesSelect = typeof tagsToCircles.$inferSelect;