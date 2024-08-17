import jwt from 'jsonwebtoken';
import {userTokenPayloadDTO} from "../dtos";
import config from "../config";

export async function generateToken(payload: userTokenPayloadDTO) {
    return jwt.sign(payload, config.JWT_SECRET, {expiresIn: '1h'});
}

export function verifyToken(token: string) {
    return jwt.verify(token, config.JWT_SECRET);
}