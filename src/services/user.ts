import {users} from "../db/models";
import {db} from "../clients";
import {createUserDTO} from "../dtos";

export async function createUserService(user: createUserDTO) {
    try {
        return await db.insert(users).values(user).returning();
    } catch (err) {
        throw new Error(`Failed to create user: ${err.message}`);
    }
}

export async function getAllUsersService() {
    try {
        return await db.select().from(users);
    } catch (err) {
        throw new Error(`Failed to get all users: ${err.message}`)
    }
}