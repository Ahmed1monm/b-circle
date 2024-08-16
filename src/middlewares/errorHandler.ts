import { ErrorRequestHandler } from 'express';
import { handleError } from '../utils';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    handleError(err, res);
};