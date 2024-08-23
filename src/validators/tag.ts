import {body} from "express-validator";
import {validationMiddleware} from "../middlewares";

export const createTagValidator = [
    body("name").isString().withMessage("Name is required"),
    validationMiddleware
];
