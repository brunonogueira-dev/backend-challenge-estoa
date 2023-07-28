import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import db from "./configs/db";
import Plan from "./models/plan";
import Signature from "./models/signature";
import User from "./models/user";
import userRouter from "./routes/userRoutes";
import signatureRouter from "./routes/signatureRoutes";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import planRouter from "./routes/planRoutes";
import { createFreePlan } from "./db/planDbHandler";

export const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/plans", planRouter);
app.use("/signatures", signatureRouter);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const syncDb = async() => {
    await db.authenticate().then(async() => {
        await db.sync();
        await User.sync();
        await Plan.sync();
        await Signature.sync();
        await createFreePlan();

        console.log("Database successfully connected");
    }).catch((error) => {
        throw new Error(error);
    });
};

async function startServer() {
    try {
        await syncDb();

        app.listen(3333, () => {
            console.log("Server running on port 3333");
        });
    } catch (err) {
        console.log("Error", err);
    }
}

startServer();