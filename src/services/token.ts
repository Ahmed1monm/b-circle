import jwt from 'jsonwebtoken';
import {userTokenPayloadType} from "../dtos";
import config from "../config";

export async function generateToken(payload: userTokenPayloadType) {
    return jwt.sign(payload, config.JWT_SECRET, {expiresIn: '1h'});
}

export async function verifyToken(token: string) {
    return jwt.verify(token, config.JWT_SECRET);
}