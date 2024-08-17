import {Router} from "express";

import {createCircle, addUserToCircle} from "../controllers";
import {createCircleValidator, addUserToCircleValidator} from "../validators";

export const circleRouter = Router();

circleRouter.route("/").get().post(createCircleValidator, createCircle);
circleRouter.route("/:id").patch(addUserToCircleValidator, addUserToCircle);