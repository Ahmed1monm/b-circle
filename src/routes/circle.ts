import {Router} from "express";

import {addUserToCircle, createCircle, getCircleUsers, removeUserFromCircle} from "../controllers";
import {addUserToCircleValidator, createCircleValidator, getCircleUsersValidator, removeUserFromCircleValidator} from "../validators";

export const circleRouter = Router();

circleRouter.route("/")
    .post(createCircleValidator, createCircle);
circleRouter.route("/:id")
    .get(getCircleUsersValidator, getCircleUsers);

circleRouter.route("/:id/users").post(addUserToCircleValidator, addUserToCircle);
circleRouter.route("/:id/users/:userId").delete(removeUserFromCircleValidator, removeUserFromCircle);
