import {date, index, pgTable, uuid} from 'drizzle-orm/pg-core';

import {circles} from './circle';
import {users} from './user';

export const usersToCircles = pgTable('users_to_circles', {
    user_id: uuid('user_id').notNull().references(() => users.id),
    circle_id: uuid('circle_id').notNull().references(() => circles.id),
    created_at: date('created_at').notNull().default('now()'),
    updated_at: date('updated_at').notNull().default('now()'),
}, (table) => {
    return {
        userIndex: index('user_to_circle_user_idx').on(table.user_id),
        circleIndex: index('user_to_circle_circle_idx').on(table.circle_id),
    };
});

export type UsersToCirclesInsert = typeof usersToCircles.$inferInsert;
export type UsersToCirclesSelect = typeof usersToCircles.$inferSelect;