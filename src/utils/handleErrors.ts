import { Response } from 'express';

export const handleError = (err: unknown, res: Response) => {
    if (err instanceof Error){
        res.status(400).json({ error: err.message });
        return;
    } else if (typeof err === 'object') {
        res.status(400).json(err);
        return;
    } else if (typeof err !== 'undefined') {
        res.status(400).json({ error: err });
    }
};