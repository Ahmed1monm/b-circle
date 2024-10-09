import {Router} from "express";

import {createBlogValidator} from "../validators/";
import {createBlog, getBlog, updateBlog} from "../controllers/";

export const blogRouter = Router();

blogRouter.route("/").post(createBlogValidator, createBlog);
blogRouter.route("/:id").patch(updateBlog).get(getBlog);
