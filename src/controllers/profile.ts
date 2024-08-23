import {Request, Response} from "express";

import {logger} from "../clients";
import {getProfileService, createProfileService, updateProfileService} from "../services";
import {uuidGenerator} from "../utils";

export async function getProfile(req: Request, res: Response) {
    try {
        const profileData = await getProfileService();
        return res.status(200).json({profileData});
    } catch (error) {
        logger.error(`Failed to get profile: ${JSON.stringify(error.message)}`);
        return res.status(400).json({message: `Error happened while getting profile ${error.message}`});
    }
}


export async function createProfile(req: Request, res: Response) {
    try {
        const {bio, image, name} = req.body;
        const id = uuidGenerator();
        const profile = await createProfileService({bio, image, id, name});
        return res.status(200).json({message: "Profile created successfully", profile});
    } catch (error) {
        logger.error(`Failed to create profile: ${JSON.stringify(error.message)}`);
        return res.status(400).json({message: `Error happened while creating profile ${error.message}`});
    }
}

export async function updateProfileById(req: Request, res: Response) {
    try {
        const {bio, image, name} = req.body;
        const {id} = req.params;
        const updatedProfile = await updateProfileService({bio, image, name});
        return res.status(200).json({message: "Profile updated successfully"});
    } catch (error) {
        logger.error(`Failed to update profile: ${JSON.stringify(error.message)}`);
        return res.status(400).json({message: `Error happened while updating profile ${error.message}`});
    }
}
