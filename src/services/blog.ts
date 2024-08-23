import {createBlogDTO} from "../dtos";
import {logger} from "../clients";
import {db} from "../clients";
import {blogs} from "../db/models";

export async function createBlogService(blogData: createBlogDTO) {
    try {
        return await db.insert(blogs).values(blogData).returning();
    } catch (error) {
        logger.error("Failed to create blog: ", error.message);
        return [];
    }
}
