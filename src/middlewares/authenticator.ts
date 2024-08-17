import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

import {verifyToken} from "../services/token";

declare global {
    namespace Express {
        interface Request {
            user?: jwt.JwtPayload | string | null;
        }
    }
}

export async function authenticator(req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).send("Unauthorized");
    }
    const accessToken = authorization.split(" ")[1];
    req.user = verifyToken(accessToken);
    next();
}

export function publicAuthenticator(req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers;
    if (!authorization) {
        req.user = null;
        return next();
    }
    const accessToken = authorization.split(" ")[1];
    req.user = verifyToken(accessToken);
    next();
}