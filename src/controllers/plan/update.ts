import Plan from "../../models/plan";
import { IUpdateOptions } from "../../types/controllers/plan";




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
        } else {
            throw new Error("Plan not found");
        }
    }
}