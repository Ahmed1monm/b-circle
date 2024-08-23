import { Request, Response } from 'express';

import {logger} from "../clients";
import {uuidGenerator} from "../utils";
import {createBlogDTO} from "../dtos";
import {createBlogService} from "../services";

// TODO: set the circles & tags while creating the blog
export async function createBlog(req: Request, res: Response) {
    try {
        const {title, content} = req.body;
        const id = uuidGenerator();
        const blogData: createBlogDTO = {title, content, id};
        const blog = await createBlogService(blogData);
        if (blog.length === 0) {
            logger.error(`Failed to create blog, ${JSON.stringify(blog)}`);
            return res.status(400).send('Failed to create blog');
        }
        return res.status(201).send({blogId: blog[0]});
    } catch (error) {
        logger.error("Failed to create blog: ", error.message);
        return res.status(400).send(`Error happened while creating blog ${error.message}`);
    }
}
