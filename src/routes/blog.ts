import {Router} from "express";

import {createBlogValidator} from "../validators/";
import {createBlog} from "../controllers/";

export const blogRouter = Router();

blogRouter.route("/").get().post(createBlogValidator, createBlog);
