import {createBlogDTO, updateBlogDTO} from "../dtos";
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
        throw new Error(`Failed to create blog ${error.message}`);
    }
}

export async function updateBlogService(blogData: updateBlogDTO) {
    try {
        const {title, content, tags_ids, circles_ids} = blogData;
        return await db.transaction(async (trx) => {
            const blog = await trx.update(blogs).set({title, content}).where(eq(blogs.id, blogData.id)).returning();
            if (tags_ids) {
                await trx.delete(blogsToTags).where(eq(blogsToTags.blog_id, blog[0].id));
                const blogsToTagsData = tags_ids.map(tag => ({blog_id: blog[0].id, tag_id: tag}));
                await trx.insert(blogsToTags).values(blogsToTagsData);
            }
            if (circles_ids) {
                await trx.delete(blogsToCircles).where(eq(blogsToCircles.blog_id, blogData.id));
                const blogsToCirclesData = circles_ids.map(circle => ({blog_id: blogData.id, circle_id: circle}));
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
                .where(eq(blogs.id, blogData.id))
                .groupBy(blogs.id, tags.name, circles.name);
        });
    } catch (error) {
        logger.error("Failed to update blog: ", error.message);
        throw new Error(`Failed to update blog ${error.message}`);
    }
}

export async function getBlogService(id: string) {
    try {
        return await db.select(
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
            .where(eq(blogs.id, id))
            .groupBy(blogs.id, tags.name, circles.name);
    } catch (error) {
        logger.error("Failed to get blog: ", error.message);
        throw new Error(`Failed to get blog ${error.message}`);
    }
}


export async function getAllBlogsService() {
    try {
        return await db.select(
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
            .groupBy(blogs.id, tags.name, circles.name);
    } catch (error) {
        logger.error("Failed to get all blogs: ", error.message);
        throw new Error(`Failed to get all blogs ${error.message}`);
    }
}