import { Router } from "express";
import { createUserValidationMiddleware } from "../middlewares/user.middleware";
import { errorHandler } from "../middlewares/errors.middleware";
import UserController from "../controllers/user.controller";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get("/users", userController.listAllUsers);
userRouter.get("/users/:id", userController.findUserById);
userRouter.get("/users/name/:name", userController.findUserByName);
userRouter.get("/users/date/:date", userController.findUserByDate);
userRouter.post(
    "/users",
    createUserValidationMiddleware,
    errorHandler,
    userController.createUser
);
userRouter.delete("/users/:id", userController.deleteUser);
userRouter.put("/users/:id", userController.updateUser);

export default userRouter;
