import {Request, Response} from "express";
import {uuidGenerator} from "../utils";
import {createCircleService, addUserToCircleService} from "../services";

export async function createCircle(req: Request, res: Response) {
    const {name} = req.body;
    try {
        const id = uuidGenerator();
        const circle = await createCircleService({id, name});
        return  res.status(201).json({circle});
    } catch (err) {
        return  res.status(400).json({err: `Error happened while creating circle ${err.message}`});
    }
}

export async function addUserToCircle (req: Request, res: Response) {
    const {userId} = req.body;
    const {id} = req.params;
    try {
        const circle = await addUserToCircleService({circle_id: id, user_id: userId});
        return res.status(201).json({circle: circle[0]});
    } catch (err) {
        return res.status(400).json({err: `Error happened while adding user to circle ${err.message}`});
    }
}