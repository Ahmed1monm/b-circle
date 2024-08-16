import {Router} from "express";

export const blogRouter = Router();

blogRouter.route("/").get().post();