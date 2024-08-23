import {body} from "express-validator";
import {validationMiddleware} from "../middlewares";

export const createBlogValidator = [
    body("title").isString().withMessage("title is required and must be string"),
    body("content").isString().withMessage("content is required and must be string"),
    validationMiddleware
];
