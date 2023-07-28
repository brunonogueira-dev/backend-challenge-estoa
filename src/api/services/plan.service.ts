import Plan from "../../db/models/Plan";
import { IPlan, IPlanInput } from "../interfaces";

export default class PlanService {
    public async listAllPlans(): Promise<IPlan[]> {
        return Plan.findAll();
    }

    public async findPlanById(id: string): Promise<IPlan | null> {
        return Plan.findByPk(id);
    }

    public async createPlan(input: IPlanInput): Promise<string> {
        const { id } = await Plan.create({ ...input });
        return id;
    }

    public async deletePlan(id: string) {
        const response = await Plan.destroy({ where: { id } });
        return response ? "Plan deleted successfully." : null;
    }

    public async updatePlan(
        id: string,
        input: IPlanInput
    ): Promise<string | null> {
        const updatedPlan = await Plan.update({ ...input }, { where: { id } });

        if (updatedPlan[0] === 1) {
            return `Updated plan with ID ${id}`;
        }

        return null;
    }
}
