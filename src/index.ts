import express, { Application, Request, Response } from "express";
import { userRouter, planRouter } from "./api/routes";
import { errorHandler } from "./api/middlewares/errors.middleware";
import sequelizeConnection from "./db/config/config";
import mysql2 from "mysql2";
require("dotenv").config();

const isDev = process.env.NODE_ENV === "dev";

async function dbInit() {
    try {
        const connection = mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });
        connection.connect();

        const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
        await connection.promise().query(createDatabaseQuery);

        console.log("Database created successfully.");

        connection.end();

        sequelizeConnection
            .authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch((error) => {
                console.error("Unable to connect to the database: ", error);
            });

        await sequelizeConnection.sync({ alter: isDev });
        console.log("Connection synced succesfully.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

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

export const start = async () => {
    try {
        await dbInit();

        const app = get();
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`);
    }
};

start();
