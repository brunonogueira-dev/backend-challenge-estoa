import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof Error) {
        if (
            err.name === "SequelizeValidationError" ||
            err.name === "SequelizeUniqueConstraintError"
        ) {
            return res.status(400).json({ error: err.message });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    return res.status(500).json({ message: "Internal server error" });
};
