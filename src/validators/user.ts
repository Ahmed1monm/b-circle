import {body} from "express-validator";

import {validationMiddleware} from "../middlewares";
import {db} from "../clients";
import {users} from "../db/models";
import {eq} from "drizzle-orm";

export const createUserValidator = [
    body("name").isString().isLength({min: 3}),
    body("email").isEmail().custom(async (email) => {
        const user = await db.select().from(users).where(eq(users.email, email)).execute();
        if (user.length > 0) {
            throw new Error("Email already exists");
        }
    }),

    validationMiddleware
];