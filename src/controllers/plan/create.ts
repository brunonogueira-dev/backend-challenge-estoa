import { createPlan } from "../../db/planDbHandler";
import { IPlanAttributes, IPlanModel } from "../../types/models/plan";

export default class PlanCreator {
    private name: string;
    private price: number;
    private expiration: number;
  
    constructor(name: string, price: number, expiration: number) {
        this.name = name;
        this.expiration = expiration;
        this.price = price;
    }

    async create(): Promise<IPlanModel | null> {
        try {
            const atributes: IPlanAttributes = {
                name: this.name,
                expiration: this.expiration,
                price: this.price,
            };
            const plan = await createPlan(atributes);
            return plan;
        } catch (e) {
            console.log("Failed while trying to create the plan");
            return null;
        }
    }
}