import express, { Application, Request, Response } from "express";
import { userRouter, planRouter } from "./api/routes";
import { errorHandler } from "./api/middlewares/errors.middleware";
require("dotenv").config();

require("dotenv").config();

const port = process.env.PORT || 3000;

export const get = () => {
    const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Welcome to the users and plans API!",
        });
    });

    app.use("/api", userRouter);
    app.use("/api", planRouter);
    app.use(errorHandler);

    return app;
};

export const start = () => {
    try {
        const app = get();
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`);
    }
};

start();
