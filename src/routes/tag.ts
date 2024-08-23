import {Router} from "express";

import {createTagController} from "../controllers";
import {createTagValidator} from "../validators";

export const tagRouter = Router();

tagRouter.route("/").get().post(createTagValidator, createTagController);
