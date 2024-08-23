import {Router} from "express";

import {createTagController, getTagsController} from "../controllers";
import {createTagValidator} from "../validators";

export const tagRouter = Router();

tagRouter.route("/").get(getTagsController).post(createTagValidator, createTagController);
