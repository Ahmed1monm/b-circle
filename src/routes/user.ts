import {Router} from "express";

import {createUser} from "../controllers";
import {createUserValidator} from "../validators";

export const userRouter = Router();

userRouter.route("/").post(createUserValidator, createUser);
