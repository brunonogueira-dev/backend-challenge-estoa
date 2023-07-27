import Plan from "../../models/plan";
import { IUpdateOptions } from "../../types/controllers/plan";
import { IPlanModel } from "../../types/models/plan";




export class UpdateByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async update(options: IUpdateOptions) {
        const plan = await Plan.findByPk(this.pk);

        if(plan) {
            await plan.update({
                name: options.name || plan.name,
                price: options.price || plan.price,
                expiration: options.expiration|| plan.expiration
            });
            return plan;
        } else {
            const error: any = new Error('Plan not found');
            error.status = 404;
            throw error;
        }
    }
}