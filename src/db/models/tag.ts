import {date, index, pgTable, uuid, varchar} from 'drizzle-orm/pg-core';

export const tags = pgTable('tags', {
    id: uuid('id').primaryKey(),
    name: varchar('name', {length: 100}).notNull(),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {
        nameIndex: index('tag_name_idx').on(table.name),
    };
});

export type TagInsert = typeof tags.$inferInsert;
export type TagSelect = typeof tags.$inferSelect;