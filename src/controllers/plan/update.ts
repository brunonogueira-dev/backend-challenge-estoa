import { getPlanByPK, updatePlan } from "../../db/planDbHandler";
import { IUpdateOptions } from "../../types/controllers/plan";


export class UpdateByPk {
    private pk: number;

    constructor(pk: number) {
        this.pk = pk;
    }

    async update(options: IUpdateOptions) {
        const plan = await getPlanByPK(this.pk);

        if (plan) {
            await updatePlan(plan, options);
            return plan;
        } else {
            const error: any = new Error("Plan not found");
            error.status = 404;
            throw error;
        }
    }
}