import express, { Request, Response } from "express";
import { userRouter, planRouter } from "./api/routes";
import { errorHandler } from "./api/middlewares/errors.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

require("dotenv").config();

const port = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Welcome to the users and plans API!",
    });
});

app.use("/api", userRouter);
app.use("/api", planRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
        console.log(`Docs can be found at http://localhost:${port}/docs`);
    });
} catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
}
