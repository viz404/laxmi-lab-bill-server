import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    error: Error,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(error);
    }

    console.error(error.stack);

    res.status(500).json({ error: "Something went wrong." });
};
