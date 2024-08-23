import {createBlogDTO} from "../dtos";
import {db, logger} from "../clients";
import {blogs, blogsToCircles, blogsToTags, circles, tags} from "../db/models";
import {eq} from "drizzle-orm";

export async function createBlogService(blogData: createBlogDTO) {
    try {
        const {title, content, id, circles_ids, tags_ids} = blogData;
        return await db.transaction(async (trx) => {
            const blog = await trx.insert(blogs).values({title, content, id}).returning();
            if (tags_ids) {
                const blogsToTagsData = tags_ids.map(tag => ({blog_id: blog[0].id, tag_id: tag}));
                await trx.insert(blogsToTags).values(blogsToTagsData);
            }
            if (circles_ids) {
                const blogsToCirclesData = circles_ids.map(circle => ({blog_id: blog[0].id, circle_id: circle}));
                await trx.insert(blogsToCircles).values(blogsToCirclesData);
            }
            return trx.select(
                {
                    blogId: blogs.id,
                    title: blogs.title,
                    content: blogs.content,
                    tags: tags.name,
                    circles: circles.name,
                }
            )
                .from(blogs)
                .leftJoin(blogsToTags, eq(blogs.id, blogsToTags.blog_id))
                .leftJoin(tags, eq(blogsToTags.tag_id, tags.id))
                .leftJoin(blogsToCircles, eq(blogs.id, blogsToCircles.blog_id))
                .leftJoin(circles, eq(blogsToCircles.circle_id, circles.id))
                .where(eq(blogs.id, blog[0].id))
                .groupBy(blogs.id, tags.name, circles.name);
        });
    } catch (error) {
        logger.error("Failed to create blog: ", error.message);
        return [];
    }
}
