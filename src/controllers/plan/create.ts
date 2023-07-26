import Plan from "../../models/plan";
import { PlanAttributes, PlanModel } from "../../types/models/plan";

type TCreator = PlanModel | null; 

export default class PlanCreator {
    private name: string;
    private price: number;
    private expiration: number;
  
    constructor(name: string, price: number, expiration: number) {
      this.name = name;
      this.expiration = expiration;
      this.price = price;
    }

    async create(): Promise<TCreator> {
        try {
            const planAttributes: PlanAttributes = {
                name: this.name,
                expiration: this.expiration,
                price: this.price,
            };
            const plan = await Plan.create(planAttributes);
            return plan;
        } catch (e) {
          console.log("Failed while trying to create the plan");
          return null;
        }
    }
}