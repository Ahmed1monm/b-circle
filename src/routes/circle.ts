import {Router} from "express";

import {addUserToCircle, createCircle, getCircleUsers} from "../controllers";
import {addUserToCircleValidator, createCircleValidator, getCircleUsersValidator} from "../validators";

export const circleRouter = Router();

circleRouter.route("/")
    .post(createCircleValidator, createCircle);
circleRouter.route("/:id")
    .patch(addUserToCircleValidator, addUserToCircle)
    .get(getCircleUsersValidator, getCircleUsers);
