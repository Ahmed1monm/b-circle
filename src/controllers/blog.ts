import { Request, Response } from 'express';

import {logger} from "../clients";
import {uuidGenerator} from "../utils";
import {createBlogDTO, updateBlogDTO} from "../dtos";
import {createBlogService, getBlogService, updateBlogService} from "../services";

// TODO: set the circles & tags while creating the blog
export async function createBlog(req: Request, res: Response) {
    try {
        const {title, content, circles_ids, tags_ids} = req.body;
        const id = uuidGenerator();
        const blogData: createBlogDTO = {title, content, id, circles_ids, tags_ids};
        const blog = await createBlogService(blogData);
        return res.status(201).send({blogId: blog[0]});
    } catch (error) {
        logger.error(`Failed to create blog: ${JSON.stringify( error.message)}`);
        return res.status(400).send(`Error happened while creating blog ${error.message}`);
    }
}

export async function updateBlog(req: Request, res: Response) {
    try {
        const {title, content, circles_ids, tags_ids} = req.body;
        const id = req.params.id;
        const blogData: updateBlogDTO = {title, content, circles_ids, tags_ids, id};
        const blog = await updateBlogService(blogData);
        if (blog.length === 0) {
            logger.error(`Failed to update blog, ${JSON.stringify(blog)}`);
            return res.status(400).send('Failed to update blog');
        }
        return res.status(200).send({blogId: blog[0]});
    } catch (error) {
        logger.error(`Failed to update blog: ${JSON.stringify( error.message)}`);
        return res.status(400).send(`Error happened while updating blog ${error.message}`);
    }
}


export async function getBlog(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const blog = await getBlogService(id);

        return res.status(200).send({blog: blog[0]});
    } catch (error) {
        logger.error(`Failed to get blog: ${JSON.stringify( error.message)}`);
        return res.status(400).send(`Error happened while getting blog ${error.message}`);
    }
}
