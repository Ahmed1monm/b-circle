import {Router} from "express";

import {userRouter} from "./user";
import {circleRouter} from "./circle";
import {tagRouter} from "./tag";
import {blogRouter} from "./blog";


const router = Router();

router.use("/users", userRouter);
router.use("/circle", circleRouter);
router.use("/tag", tagRouter);
router.use("/blog", blogRouter);

export default router;