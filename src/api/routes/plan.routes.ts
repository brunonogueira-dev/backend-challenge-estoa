import { Router } from "express";
import { createPlanValidationMiddleware } from "../middlewares/plan.middleware";
import { errorHandler } from "../middlewares/errors.middleware";
import PlanController from "../controllers/plan.controller";

const planRouter: Router = Router();
const planController = new PlanController();

planRouter.get("/plans", planController.listAllPlans);
planRouter.get("/plans/:id", planController.findPlanById);
planRouter.post(
    "/plans",
    createPlanValidationMiddleware,
    errorHandler,
    planController.createPlan
);
planRouter.delete("/plans/:id", planController.deletePlan);
planRouter.put("/plans/:id", planController.updatePlan);

export default planRouter;
