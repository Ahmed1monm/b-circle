import {Router} from "express";

export const circleRouter = Router();

circleRouter.route("/").get().post();