import {Router} from "express";
import {getProfile, createProfile, updateProfileById} from "../controllers";


export const profileRouter = Router();

profileRouter.route("/").get(getProfile).post(createProfile);
profileRouter.route("/:id").put(updateProfileById);
