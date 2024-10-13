import {and, desc, eq} from "drizzle-orm";

import {addUserToCircleDTO, createCircleDTO} from "../dtos";
import {circles, users, usersToCircles} from "../db/models";
import {db} from "../clients";

export async function createCircleService(circle: createCircleDTO) {
    try {
        return await db.insert(circles).values(circle).returning();
    } catch (err) {
     throw new Error(`Error happened while creating circle ${err.message}`);
    }
}

export async function addUserToCircleService(userToCircle: addUserToCircleDTO) {
    try {
        return await db.insert(usersToCircles).values(userToCircle).returning();
    } catch (err) {
        throw new Error(`Error happened while adding user to circle ${err.message}`);
    }
}

export async function getCircleUsersService(circleId: string) {
    try {
        const result = await db
            .select(
                {
                    userId: users.id,
                    userName: users.name,
                    userEmail: users.email,
                    circleName: circles.name,
                    circleId: circles.id,
                }
            )
            .from(circles)
            .innerJoin(usersToCircles, eq(usersToCircles.circle_id, circles.id))
            .innerJoin(users, eq(usersToCircles.user_id, users.id))
            .where(eq(circles.id, circleId))

            .execute();


        return {
            circleId,
            circleName: result[0].circleName,
            users: result.map(user => ({
                id: user.userId,
                name: user.userName,
                email: user.userEmail,
            })),
        };
    } catch (err) {
        throw new Error(`Error happened while getting circle users ${err.message}`);
    }
}

export async function removeUserFromCircleService({circle_id, user_id}) {
    try {
        return await db.delete(usersToCircles).where(and(
            eq(usersToCircles.circle_id, circle_id),
            eq(usersToCircles.user_id, user_id),
        )).returning();
    } catch (err) {
        throw new Error(`Error happened while removing user from circle ${err.message}`);
    }
}

export async function getAllCirclesService() {
    try {
        return (await db.select().from(circles).orderBy(desc(circles.created_at)))
    } catch (e) {
        throw new Error('Error in retrieving all circles');
    }
}