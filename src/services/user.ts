import {users} from "../db/models";
import {db} from "../clients";
import {createUserType} from "../dtos";

export async function createUserService(user: createUserType) {
    try {
        return await db.insert(users).values(user).returning();
    } catch (err) {
        throw new Error(`Failed to create user: ${err.message}`);
    }
}