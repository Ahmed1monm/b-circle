import {Request, Response} from "express";

import {logger} from "../clients";
import {uuidGenerator} from "../utils";
import {createUserService} from "../services/user";
import {generateToken} from "../services/token";


export async function createUser(req: Request, res: Response) {
    const {name, email} = req.body;
    const id = uuidGenerator();
    try {
        const user = await createUserService({name, email, id});
        if (user.length === 0) {
            logger.error(`Failed to create user, ${JSON.stringify(user)}`);
            return res.status(400).send('Failed to create user');
        }
        const token = await generateToken({
            email: user[0].email,
            id: user[0].id,
        });
        res.status(201).send({token});
    } catch (err) {
        logger.error("Failed to create user: ", err.message);
        res.status(400).send(`Error happened while creating user ${err.message}`);
    }
}