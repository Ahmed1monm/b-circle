import {body, param} from "express-validator";
import {validationMiddleware} from "../middlewares";

export const createCircleValidator = [
    body("name").exists().withMessage("Name is required"),
    validationMiddleware
];

export const addUserToCircleValidator = [
    body("userId").exists().isUUID().withMessage("userId is required"),
    param("id").exists().isUUID().withMessage("circleId is required"),
    validationMiddleware
];

export const getCircleUsersValidator = [
    param("id").exists().isUUID().withMessage("circleId is required"),
    validationMiddleware
];

export const removeUserFromCircleValidator = [
    param("id").exists().isUUID().withMessage("circleId is required"),
    param("userId").exists().isUUID().withMessage("userId is required"),
    validationMiddleware
];