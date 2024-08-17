import {addUserToCircleDTO, createCircleDTO} from "../dtos/circle";
import {circles, usersToCircles} from "../db/models";
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