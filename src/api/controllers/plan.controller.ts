import { Request, Response, NextFunction } from "express";
import PlanService from "../services/plan.service";
import { IPlan, IPlanInput } from "../interfaces";
import { validationResult } from "express-validator";

export default class PlanController {
    private planService: PlanService;

    constructor() {
        this.planService = new PlanService();
    }

    public listAllPlans = async (
        _: Request,
        res: Response,
        next: NextFunction
    ) => {
        const plans: IPlan[] = await this.planService.listAllPlans();
        res.json(plans);
    };

    public findPlanById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        const plan: IPlan | null = await this.planService.findPlanById(id);
        if (!plan) {
            res.status(404).json({ message: "Plan not found" });
        } else {
            res.json(plan);
        }
    };

    public createPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const input: IPlanInput = req.body;
        const id: string = await this.planService.createPlan(input);
        res.json({ id });
    };

    public updatePlan = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        const input: IPlanInput = req.body;
        const message: string | null = await this.planService.updatePlan(
            id,
            input
        );
        if (!message) {
            res.status(404).json({ message: "Plan not found" });
        } else {
            res.json({ message });
        }
    };

    public deletePlan = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        const result = await this.planService.deletePlan(id);
        if (!result) {
            res.status(404).json({ message: "Plan not found" });
        } else {
            res.json({ message: result });
        }
    };
}
