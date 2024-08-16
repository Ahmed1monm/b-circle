import {body} from "express-validator";

import {validationMiddleware} from "../middlewares";

export const createUserValidator = [
    body("name").isString().isLength({min: 3}),
    body("email").isEmail(),

    validationMiddleware
];