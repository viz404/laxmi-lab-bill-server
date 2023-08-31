import { NextFunction, Request, Response } from "express";

export class ExpressMiddleware {
    errorMiddleware = (
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (res.headersSent) {
            return next(error);
        }

        console.error(error.stack);

        res.status(500).json({ error: "Something went wrong." });
    };
}
