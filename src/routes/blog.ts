import {Router} from "express";

import {createBlogValidator} from "../validators/";
import {createBlog, getBlog, updateBlog, getAllBlogs} from "../controllers/";

export const blogRouter = Router();

blogRouter.route("/").post(createBlogValidator, createBlog).get(getAllBlogs);
blogRouter.route("/:id").patch(updateBlog).get(getBlog);
