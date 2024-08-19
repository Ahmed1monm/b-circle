import {addUserToCircleDTO, createCircleDTO} from "../dtos/circle";
import {circles, users, usersToCircles} from "../db/models";
import {db} from "../clients";
import {eq} from "drizzle-orm";

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