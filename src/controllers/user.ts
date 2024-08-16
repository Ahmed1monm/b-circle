import {Request, Response} from "express";

import {db, logger} from "../clients";
import {users} from "../db/models";
import {uuidGenerator} from "../utils";


export async function createUser(req: Request, res: Response) {
    const {name, email} = req.body;

    try {
        const id = uuidGenerator();
        const queryResult = await db.insert(users).values({id, name, email}).returning();
        res.status(201).send(queryResult);
    } catch (err) {
        logger.error("Failed to create user: ", err.message);
        res.status(400).send(`Error happened while creating user ${err.message}`);
    }
}