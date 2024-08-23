import { Request, Response } from 'express';
import {logger} from "../clients";
import {uuidGenerator} from "../utils";
import {createTagService} from "../services";

export async function createTagController(req: Request, res: Response) {
    try {
        const {name} = req.body;
        const id = uuidGenerator();
        const tag = await createTagService(name, id);
        if (tag.length === 0) {
            logger.error(`Failed to create tag, ${JSON.stringify(tag)}`);
            return res.status(400).send('Failed to create tag');
        }
        return res.status(201).send({tag: tag[0]});
    } catch (error) {
        logger.error(`Failed to create tag: ${JSON.stringify( error.message)}`);
        return res.status(400).send(`Error happened while creating tag ${error.message}`);
    }
}
